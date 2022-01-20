import {compare} from 'bcrypt';
import {Router} from 'express';
import {sign} from 'jsonwebtoken';
import pool from '../../config/database';
require('dotenv').config();

const router = Router();

router.use('/', async (req, res) => {
  try {
    const {userName, password} = req.body;
    if (!userName || !password) {
      return res.status(400).send('Missing Input');
    }

    const fetchStoredPW = await pool.query(
      'SELECT * FROM users WHERE user_name = $1;',
      [userName.toLowerCase()],
    );

    if (!fetchStoredPW.rows.length) {
      return res.status(400).send('User name not in DB');
    } else {
      compare(password, fetchStoredPW.rows[0].password, function (err, result) {
        if (err) {
          return res.send('Something happened checking the password');
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
        res.send({token, authenticated: result});
      });
    }
  } catch (err) {
    console.log(err);
    res.send('Something Unexpected Happend');
  }
});

export default router;
