import { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { verifyJWT } from "../services/jwt";
require("dotenv").config();

interface VerifyTokenRequestProps extends Request {
  user?: string | JwtPayload;
}

const verifyToken = (
  req: VerifyTokenRequestProps,
  res: Response,
  next: NextFunction
) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ error: "Missing token" });
  }

  try {
    const decoded = verifyJWT(token);
    req.user = decoded;
  } catch (error) {
    return res.status(401).send({ error: "Invalid Token" });
  }
  return next();
};

export default verifyToken;
