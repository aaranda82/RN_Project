import { compare } from 'bcrypt';
import { Router } from 'express';
import JwtService from '../../services/jwt';
import UserService from '../../services/queries';
require('dotenv').config();

const userService = new UserService();
const jwt = new JwtService();
const router = Router();

router.use('/', async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res.send({ error: 'Missing Input' });
    }
    const fetchedPW = await userService.fetchUserByUserName(userName);
    if (!fetchedPW.length) {
      return res.send({ error: 'User name not in DB' });
    } else {
      compare(password, fetchedPW[0].password, function (err, result) {
        if (err) {
          return res.send({
            error: 'Something happened checking the password',
          });
        }
        const userInfo = {
          user_id: fetchedPW[0].id,
          email: fetchedPW[0].email,
          userName: fetchedPW[0].user_name,
        };
        const accessToken = jwt.signJWT({
          ...userInfo,
          expiresIn: '2h',
        });
        const refreshToken = jwt.signJWT({
          ...userInfo,
          expiresIn: '60d',
        });
        return res.send({
          accessToken,
          refreshToken,
          authenticated: result,
          userId: fetchedPW[0].id,
          userName: fetchedPW[0].user_name,
        });
      });
    }
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
});

export default router;
