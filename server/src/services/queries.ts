import { Users } from '../models/User';

const lower = (text: string) => text.toLowerCase();

class UserService {
  async getUserByUserNameAndEmail({
    email,
    userName,
  }: {
    email: string;
    userName: string;
  }) {
    const user = await Users.query()
      .select('email', 'user_name')
      .where('email', lower(email))
      .orWhere('user_name', lower(userName));
    return user;
  }

  async getUserById(userId: string) {
    const user = await Users.query()
      .select('user_name', 'email', 'id')
      .where('id', userId);
    return user;
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
    const user = await Users.query().insert({
      user_name: lower(userName),
      email: lower(email),
      password: password,
    });
    return user;
  }

  async fetchUserByUserName(userName: string) {
    const user = await Users.query().where('user_name', lower(userName));
    return user;
  }
}

export default UserService;
