import {hash} from 'bcrypt';
import {Router} from 'express';
import {sign} from 'jsonwebtoken';
import {knex} from '../../config/knex';
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

    const existingUser = await knex
      .select('email', 'user_name')
      .from('users')
      .where('email', email.toLowerCase())
      .orWhere('user_name', userName.toLowerCase());

    if (existingUser[0]?.user_name === userName.toLowerCase()) {
      return res.send('User name taken');
    } else if (existingUser[0]?.email === email.toLowerCase()) {
      return res.send('Eror creating account');
    } else {
      hash(password, 10, async function (err, hashedPassword) {
        if (err) {
          console.log(err);
        }
        // Store hashedPassword in your password DB.
        const user = await knex('users').insert(
          {
            user_name: userName.toLowerCase(),
            email: email.toLowerCase(),
            password: hashedPassword,
          },
          ['id', 'email'],
        );

        if (user.length) {
          const token = sign(
            {user_id: user[0].id, email: user[0].email},
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
