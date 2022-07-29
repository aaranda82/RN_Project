import React from 'react';
import LoginForm from '../LoginForm';

import renderer from 'react-test-renderer';
import { createStore, StoreProvider } from 'easy-peasy';
import { storeModel } from '../../../store';

const props: any = {
  navigation: { navigate: () => jest.fn() },
  route: undefined,
};

it('renders LoginForm correctly', () => {
  const store = createStore(storeModel);
  const tree = renderer
    .create(
      <StoreProvider store={store}>
        <LoginForm {...props} />
      </StoreProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
