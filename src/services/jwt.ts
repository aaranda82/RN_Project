import {sign} from 'jsonwebtoken';
require('dotenv').config();

type SignJWTProps = {
  user_id: string;
  email: string;
  userName: string;
};

export const signJWT = ({user_id, email, userName}: SignJWTProps) => {
  return sign(
    {
      user_id,
      email,
      userName,
    },
    process.env.TOKEN_KEY || '',
    {
      expiresIn: '2h',
    },
  );
};
