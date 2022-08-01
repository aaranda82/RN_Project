require('dotenv').config();
import { Model } from 'objection';

export const knex = require('knex')({
  client: 'pg',
  connection: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
  },
});

Model.knex(knex);
