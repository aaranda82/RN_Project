import express, {json} from 'express';
import verifyToken from './middleware/auth';
import auth from './routes/auth/index';
require('dotenv').config();

const app = express();
const port = 5000;

app.use(json());

app.get('/', verifyToken, async (req, res) => {
  try {
    res.send('You are logged in!!😀🎉');
  } catch (error) {
    console.log(error);
  }
});

app.use('/auth', auth);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

export default app;
