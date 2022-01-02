const express = require('express');
const pg = require('pg');

const pool = new pg.Pool({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  password: 'secret',
});
const app = express();
const port = 5000;

app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const response = await pool.query('select * from users');
    console.log(response);
    res.send(response.rows);
  } catch (error) {
    console.log(error);
  }
});

app.post('/signup', async (req, res) => {
  try {
    const {email, userName, password} = req.body;
    const headers = {
      status: 200,
      send: '',
    };

    const response = await pool.query('SELECT * FROM users WHERE email=$1', [
      email.toLowerCase(),
    ]);

    if (response.rows.length) {
      headers.send = 'Duplicate account';
    } else {
      const insertResponse = await pool.query(
        'INSERT INTO users (id, user_name, email, password) VALUES(DEFAULT, $1, $2, $3) RETURNING id',
        [userName, email.toLowerCase(), password],
      );
      headers.send = insertResponse.rows.length
        ? 'Account created successfully'
        : 'Something went wrong';
    }

    res.status(headers.status).send(headers.send);
  } catch (error) {
    console.log(error);
  }
});

app.post('/login', (req, res) => {
  console.log(req.body);
  res.send('Log in sent');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
