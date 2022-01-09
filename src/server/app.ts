import express, {json} from 'express';
import {hash, compare} from 'bcrypt';
import {sign} from 'jsonwebtoken';
import verifyToken from './middleware/auth';
import pool from './config/database';
require('dotenv').config();

const app = express();
const port = 5000;

app.use(json());

app.get('/', verifyToken, async (req, res) => {
  try {
    res.send('You are logged in!!😀🎉');
  } catch (error) {
    console.log(error);
  }
});

// REGISTER
app.post('/register', async (req, res) => {
  try {
    const {email, userName, password} = req.body;
    if (!email || !userName || !password) {
      return res
        .status(400)
        .send({email, userName, password, status: 'Missing input'});
    }
    const existingUser = await pool.query(
      'SELECT * FROM users WHERE email=$1',
      [email.toLowerCase()],
    );

    if (existingUser.rows.length) {
      return res.status(400).send('Duplicate account');
    } else {
      hash(password, 10, async function (err, hashedPassword) {
        if (err) {
          console.log(err);
        }
        // Store hashedPassword in your password DB.
        const user = await pool.query(
          'INSERT INTO users (id, user_name, email, password) VALUES(DEFAULT, $1, $2, $3) RETURNING id, email',
          [userName, email.toLowerCase(), hashedPassword],
        );
        if (user.rows.length) {
          const token = sign(
            {user_id: user.rows[0].id, email: user.rows[0].email},
            process.env.TOKEN_KEY || '',
            {
              expiresIn: '2h',
            },
          );
          return res
            .status(201)
            .send({token, status: 'Account created successfully'});
        } else {
          return res.status(400).send('Something went wrong');
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
});

// LOGIN
app.post('/login', async (req, res) => {
  try {
    const {userName, password} = req.body;
    if (!userName || !password) {
      return res.status(400).send('Missing Input');
    }

    const fetchStoredPW = await pool.query(
      'SELECT * FROM users WHERE user_name = $1;',
      [userName],
    );

    if (!fetchStoredPW.rows.length) {
      return res.status(400).send('User name not in DB');
    } else {
      await compare(
        password,
        fetchStoredPW.rows[0].password,
        function (err, result) {
          if (err) {
            return res
              .status(500)
              .send('Something happened checking the password');
          }
          const token = sign(
            {
              user_id: fetchStoredPW.rows[0].id,
              email: fetchStoredPW.rows[0].email,
              userName: fetchStoredPW.rows[0].userName,
            },
            process.env.TOKEN_KEY || '',
            {
              expiresIn: '2h',
            },
          );
          res.status(200).send({token, authenticated: result});
        },
      );
    }
  } catch (err) {
    console.log(err);
    res.send('Something Unexpected Happend');
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
