import {knex} from '../server/config/knex';

const lower = (text: string) => text.toLowerCase();

export const getUsersByUserNameAndEmail = async ({
  email,
  userName,
}: {
  email: string;
  userName: string;
}) => {
  return await knex
    .select('email', 'user_name')
    .from('users')
    .where('email', lower(email))
    .orWhere('user_name', lower(userName));
};

export const insertUser = async ({
  userName,
  email,
  password,
}: {
  userName: string;
  email: string;
  password: string;
}) => {
  return await knex('users').insert(
    {
      user_name: lower(userName),
      email: lower(email),
      password: password,
    },
    ['id', 'email', 'user_name'],
  );
};

export const fetchUserByUserName = async (userName: string) => {
  return await knex.select().from('users').where('user_name', lower(userName));
};
