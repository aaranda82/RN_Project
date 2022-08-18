import express, { json } from 'express';
import verifyToken from './src/middleware/auth';
import auth from './src/routes/auth/index';
import { knex } from './src/config/knex';
import { Model } from 'objection';
require('dotenv').config();

Model.knex(knex);

const app = express();
const port = 3000;

app.use(json());

app.get('/', verifyToken, async (_, res) => {
  try {
    res.send({ text: 'Your token is valid!!😀🎉' });
  } catch (error) {
    console.log(error);
  }
});

app.use('/auth', auth);

app.listen(port, () => {
  console.log(`*** App listening at http://localhost:${port}`);
});

export default app;
