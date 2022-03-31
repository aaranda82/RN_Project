import {Action, action, createStore, createTypedHooks} from 'easy-peasy';

export interface StoreModel {
  userId: string;
  setUserId: Action<StoreModel, string>;
  clearUserId: Action<StoreModel>;
}

export const store = createStore<StoreModel>({
  userId: '',
  setUserId: action((state, payload) => {
    state.userId = payload;
  }),
  clearUserId: action(state => {
    state.userId = '';
  }),
});

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
