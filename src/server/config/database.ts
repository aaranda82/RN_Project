import pg from 'pg';

const pool = new pg.Pool({
  host: 'localhost',
  user: 'postgres',
  port: 5432,
  password: process.env.SECRET,
});

export default pool;
