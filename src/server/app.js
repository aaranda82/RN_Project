const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/signup', (req, res) => {
  console.log(req.body);
  res.send('Sign up sent');
});

app.post('/login', (req, res) => {
  console.log(req.body);
  res.send('Log in sent');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
