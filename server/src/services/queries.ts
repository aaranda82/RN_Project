import { knex } from "../config/knex";

const lower = (text: string) => text.toLowerCase();

export class UserServices {
  async getUserByUserNameAndEmail({
    email,
    userName,
  }: {
    email: string;
    userName: string;
  }) {
    return await knex
      .select("email", "user_name")
      .from("users")
      .where("email", lower(email))
      .orWhere("user_name", lower(userName));
  }

  async getUserById(userId: string) {
    return await knex
      .select("user_name", "email", "id")
      .from("users")
      .where("id", userId);
  }

  async insertUser({
    userName,
    email,
    password,
  }: {
    userName: string;
    email: string;
    password: string;
  }) {
    return await knex("users").insert(
      {
        user_name: lower(userName),
        email: lower(email),
        password: password,
      },
      ["id", "email", "user_name"]
    );
  }

  async fetchUserByUserName(userName: string) {
    return await knex
      .select()
      .from("users")
      .where("user_name", lower(userName));
  }
}
