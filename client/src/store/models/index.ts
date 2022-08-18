import { userModel, UserModel } from './user';

export interface StoreModel {
  user: UserModel;
}

export const storeModel: StoreModel = {
  user: userModel,
};
