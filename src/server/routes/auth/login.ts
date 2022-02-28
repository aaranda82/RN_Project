import {compare} from 'bcrypt';
import {Router} from 'express';
import {sign} from 'jsonwebtoken';
import {knex} from '../../config/knex';
require('dotenv').config();

const router = Router();

router.use('/', async (req, res) => {
  try {
    const {userName, password} = req.body;
    if (!userName || !password) {
      return res.status(400).send('Missing Input');
    }

    const fetchedPW = await knex
      .select()
      .from('users')
      .where('user_name', userName.toLowerCase());

    if (!fetchedPW.length) {
      return res.status(400).send('User name not in DB');
    } else {
      compare(password, fetchedPW[0].password, function (err, result) {
        if (err) {
          return res.send('Something happened checking the password');
        }
        const token = sign(
          {
            user_id: fetchedPW[0].id,
            email: fetchedPW[0].email,
            userName: fetchedPW[0].userName,
          },
          process.env.TOKEN_KEY || '',
          {
            expiresIn: '2h',
          },
        );
        return res.send({
          token,
          authenticated: result,
          userId: fetchedPW[0].id,
        });
      });
    }
  } catch (err) {
    console.log(err);
    res.send('Something Unexpected Happend');
  }
});

export default router;
