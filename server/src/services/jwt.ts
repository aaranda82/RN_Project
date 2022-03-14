import jwt, { JwtPayload, sign } from "jsonwebtoken";
require("dotenv").config();

export type SignJWTProps = {
  user_id: string;
  email: string;
  userName: string;
  expiresIn: "2h" | "60d";
};

class JwtService {
  signJWT({ user_id, email, userName, expiresIn }: SignJWTProps) {
    return sign(
      {
        user_id,
        email,
        userName,
      },
      process.env.TOKEN_KEY || "",
      {
        expiresIn,
      }
    );
  }

  verifyJWT(token: string) {
    return jwt.verify(token, process.env.TOKEN_KEY || "") as JwtPayload;
  }
}

export default JwtService;
