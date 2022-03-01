import jwt, {sign} from 'jsonwebtoken';
require('dotenv').config();

type SignJWTProps = {
  user_id: string;
  email: string;
  userName: string;
  expiresIn: '2h' | '60d';
};

export const signJWT = ({
  user_id,
  email,
  userName,
  expiresIn,
}: SignJWTProps) => {
  return sign(
    {
      user_id,
      email,
      userName,
    },
    process.env.TOKEN_KEY || '',
    {
      expiresIn,
    },
  );
};

export const verifyJWT = (token: string) =>
  jwt.verify(token, process.env.TOKEN_KEY || '');
