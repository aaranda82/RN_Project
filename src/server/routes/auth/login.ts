import {compare} from 'bcrypt';
import {Router} from 'express';
import {signJWT} from '../../../services/jwt';
import {fetchUserByUserName} from '../../../services/queries';
require('dotenv').config();

const router = Router();

router.use('/', async (req, res) => {
  try {
    const {userName, password} = req.body;
    if (!userName || !password) {
      return res.status(400).send('Missing Input');
    }

    const fetchedPW = await fetchUserByUserName(userName);

    if (!fetchedPW.length) {
      return res.status(400).send('User name not in DB');
    } else {
      compare(password, fetchedPW[0].password, function (err, result) {
        if (err) {
          return res.send('Something happened checking the password');
        }
        const token = signJWT({
          user_id: fetchedPW[0].id,
          email: fetchedPW[0].email,
          userName: fetchedPW[0].userName,
        });
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
