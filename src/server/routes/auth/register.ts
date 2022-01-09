import {hash} from 'bcrypt';
import {Router} from 'express';
import {sign} from 'jsonwebtoken';
import pool from '../../config/database';

const router = Router();

router.post('/register', async (req, res) => {
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

export default router;
