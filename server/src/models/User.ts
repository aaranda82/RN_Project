import { Model } from 'objection';

export class Users extends Model {
  static tableName = 'users';

  static idColumn = 'id';

  readonly id!: string;
  user_name!: string;
  email!: string;
  password!: string;
  createdAt?: Date;
}
