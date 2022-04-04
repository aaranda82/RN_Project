import { Router } from 'express';
import JwtService from '../../services/jwt';
import { UserServices } from '../../services/queries';
require('dotenv').config();

const jwt = new JwtService();
const userService = new UserServices();
const router = Router();

router.use('/', async (req, res) => {
  try {
    const token = req.headers['x-access-token'] as string;
    const user = jwt.verifyJWT(token);
    const userInfo = await userService.getUserById(user.user_id);
    const newToken = jwt.signJWT({
      userName: userInfo[0].user_name,
      user_id: userInfo[0].id,
      email: userInfo[0].email,
      expiresIn: '2h',
    });
    return res.send({ token: newToken });
  } catch (error) {
    console.log(error);
    return res.send({ error });
  }
});

export default router;
