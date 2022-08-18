import { hash } from 'bcrypt';
import { Router } from 'express';
import JwtService from '../../services/jwt';
import UserService from '../../services/queries';
require('dotenv').config();

const userService = new UserService();
const jwt = new JwtService();
const router = Router();

router.use('/', async (req, res) => {
  try {
    const { email, userName, password } = req.body;
    if (!email || !userName || !password) {
      return res.send({ email, userName, password, status: 'Missing input' });
    }

    const existingUser = await userService.getUserByUserNameAndEmail({
      email,
      userName,
    });

    if (existingUser[0]?.user_name === userName.toLowerCase()) {
      return res.send({ error: 'User name taken' });
    } else if (existingUser[0]?.email === email.toLowerCase()) {
      return res.send({ error: 'Error creating account' });
    } else {
      hash(password, 10, async (error, hashedPassword) => {
        if (error) {
          console.log({ error });
        }
        const user = await userService.insertUser({
          userName,
          email,
          password: hashedPassword,
        });

        if (user.id) {
          const userInfo = {
            user_id: user.id,
            email: user.email,
            userName: user.user_name,
          };
          const accessToken = jwt.signJWT({
            ...userInfo,
            expiresIn: '2h',
          });
          const refreshToken = jwt.signJWT({
            ...userInfo,
            expiresIn: '60d',
          });
          return res.status(201).send({
            accessToken,
            refreshToken,
            status: 'Account created successfully',
            userName: user.user_name,
            userId: user.id,
          });
        } else {
          return res.send({ error: 'Something went wrong' });
        }
      });
    }
  } catch (error) {
    console.log({ error });
  }
});

export default router;
