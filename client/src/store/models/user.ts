import { Action, action, debug } from 'easy-peasy';

export interface UserModel {
  userId: string;
  userName: string;
  setUser: Action<UserModel, { userId: string; userName: string }>;
  clearUser: Action<UserModel>;
}

export const userModel: UserModel = {
  userId: '',
  userName: '',
  setUser: action((state, payload) => {
    console.log(debug(state));
    state.userId = payload.userId;
    state.userName = payload.userName;
  }),
  clearUser: action((state) => {
    state.userId = '';
    state.userName = '';
  }),
};
