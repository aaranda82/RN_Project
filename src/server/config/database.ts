import pg from 'pg';
require('dotenv').config();

const pool = new pg.Pool({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  password: process.env.SECRET,
});

export default pool;
