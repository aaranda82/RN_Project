import jwt, {JwtPayload} from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';

interface VerifyTokenRequestProps extends Request {
  user?: string | JwtPayload;
}

const verifyToken = (
  req: VerifyTokenRequestProps,
  res: Response,
  next: NextFunction,
) => {
  const token =
    req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send('Missing token ☹️');
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY || '');
    req.user = decoded;
  } catch (error) {
    return res.status(401).send('Invalid Token');
  }
  return next();
};

export default verifyToken;
