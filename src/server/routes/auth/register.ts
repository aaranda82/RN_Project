import {hash} from 'bcrypt';
import {Router} from 'express';
import {sign} from 'jsonwebtoken';
import pool from '../../config/database';
require('dotenv').config();

const router = Router();

router.use('/', async (req, res) => {
  try {
    const {email, userName, password} = req.body;
    if (!email || !userName || !password) {
      return res
        .status(400)
        .send({email, userName, password, status: 'Missing input'});
    }
    const existingUser = await pool.query(
      'SELECT email, user_name FROM users WHERE email=$1 OR user_name=$2',
      [email.toLowerCase(), userName.toLowerCase()],
    );

    if (existingUser.rows[0].user_name === userName.toLowerCase()) {
      return res.send('User name taken');
    } else if (existingUser.rows[0].email === email.toLowerCase()) {
      return res.send('Cannot create account at this time');
    } else {
      hash(password, 10, async function (err, hashedPassword) {
        if (err) {
          console.log(err);
        }
        // Store hashedPassword in your password DB.
        const user = await pool.query(
          'INSERT INTO users (id, user_name, email, password) VALUES(DEFAULT, $1, $2, $3) RETURNING id, email',
          [userName.toLowerCase(), email.toLowerCase(), hashedPassword],
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

export default router;
