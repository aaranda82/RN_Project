import { JwtPayload } from "jsonwebtoken";
import JwtService from "../jwt";

const jwt = new JwtService();

test("creates JWT", () => {
  const token = jwt.signJWT({
    email: "test@email.com",
    userName: "userName",
    user_id: "123",
    expiresIn: "2h",
  });

  const verifiedToken = jwt.verifyJWT(token) as JwtPayload;

  expect(verifiedToken.email).toBe("test@email.com");
});
