import { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import JwtService from '../services/jwt';
require('dotenv').config();

const jwt = new JwtService();
interface VerifyTokenRequestProps extends Request {
  user?: string | JwtPayload;
}

const verifyToken = (
  req: VerifyTokenRequestProps,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers['x-access-token'] as string;

  if (!token) {
    return res.send({ error: 'Missing token' });
  }

  try {
    const decoded = jwt.verifyJWT(token);
    req.user = decoded;
  } catch (error) {
    return res.send({ error: 'Invalid Token' });
  }
  return next();
};

export default verifyToken;
