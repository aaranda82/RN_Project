import { hash } from "bcrypt";
import { Router } from "express";
import JwtService from "../../services/jwt";
import { UserServices } from "../../services/queries";
require("dotenv").config();

const userQueries = new UserServices();
const jwt = new JwtService();
const router = Router();

router.use("/", async (req, res) => {
  try {
    const { email, userName, password } = req.body;
    if (!email || !userName || !password) {
      return res
        .status(400)
        .send({ email, userName, password, status: "Missing input" });
    }

    const existingUser = await userQueries.getUserByUserNameAndEmail({
      email,
      userName,
    });

    if (existingUser[0]?.user_name === userName.toLowerCase()) {
      return res.send({ error: "User name taken" });
    } else if (existingUser[0]?.email === email.toLowerCase()) {
      return res.send({ error: "Eror creating account" });
    } else {
      hash(password, 10, async (error, hashedPassword) => {
        if (error) {
          console.log({ error });
        }
        const user = await userQueries.insertUser({
          userName,
          email,
          password: hashedPassword,
        });

        if (user.length) {
          const token = jwt.signJWT({
            user_id: user[0].id,
            email: user[0].email,
            userName: user[0].user_name,
            expiresIn: "2h",
          });
          return res
            .status(201)
            .send({ token, status: "Account created successfully" });
        } else {
          return res.status(400).send({ error: "Something went wrong" });
        }
      });
    }
  } catch (error) {
    console.log({ error });
  }
});

export default router;
