import {hash} from 'bcrypt';
import {Router} from 'express';
import {signJWT} from '../../../services/jwt';
import {
  getUsersByUserNameAndEmail,
  insertUser,
} from '../../../services/queries';
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

    const existingUser = await getUsersByUserNameAndEmail({email, userName});

    if (existingUser[0]?.user_name === userName.toLowerCase()) {
      return res.send('User name taken');
    } else if (existingUser[0]?.email === email.toLowerCase()) {
      return res.send('Eror creating account');
    } else {
      hash(password, 10, async function (err, hashedPassword) {
        if (err) {
          console.log(err);
        }
        const user = await insertUser({
          userName,
          email,
          password: hashedPassword,
        });

        if (user.length) {
          const token = signJWT({
            user_id: user[0].id,
            email: user[0].email,
            userName: user[0].user_name,
          });
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
