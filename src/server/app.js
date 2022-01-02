const express = require('express');
const pg = require('pg');
const bcrypt = require('bcrypt');

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
    res.send(response.rows);
  } catch (error) {
    console.log(error);
  }
});

app.post('/signup', async (req, res) => {
  try {
    const {email, userName, password} = req.body;
    const response = await pool.query('SELECT * FROM users WHERE email=$1', [
      email.toLowerCase(),
    ]);

    if (response.rows.length) {
      res.send('Duplicate account');
    } else {
      await bcrypt.hash(password, 10, async function (err, hash) {
        if (err) {
          console.log(err);
        }
        // Store hash in your password DB.
        const insertResponse = await pool.query(
          'INSERT INTO users (id, user_name, email, password) VALUES(DEFAULT, $1, $2, $3) RETURNING id',
          [userName, email.toLowerCase(), hash],
        );
        if (insertResponse.rows.length) {
          res.send('Account created successfully');
        } else {
          res.send('Something went wrong');
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post('/login', async (req, res) => {
  const fetchStoredPW = await pool.query(
    'SELECT password FROM users WHERE user_name = $1;',
    [req.body.userName],
  );

  if (!fetchStoredPW.rows.length) {
    res.status(400).send('User name not in DB');
  } else {
    await bcrypt.compare(
      req.body.password,
      fetchStoredPW.rows[0].password,
      function (err, result) {
        // result == true
        if (err) {
          res.status(500).send('Something happened checking the password');
        }
        res.send({authenticated: result});
      },
    );
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
