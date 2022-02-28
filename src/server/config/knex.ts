require('dotenv').config();

export const knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: process.env.SECRET,
    database: 'postgres',
  },
});
