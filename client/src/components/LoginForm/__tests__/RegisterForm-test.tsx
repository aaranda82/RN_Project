import React from 'react';
import RegisterForm from '../RegisterForm';

import renderer from 'react-test-renderer';
import { createStore, StoreProvider } from 'easy-peasy';
import { storeModel } from '../../../store';

const props: any = {
  navigation: { navigate: () => jest.fn() },
  route: undefined,
};

it('renders RegisterForm correctly', () => {
  const store = createStore(storeModel);
  const tree = renderer
    .create(
      <StoreProvider store={store}>
        <RegisterForm {...props} />
      </StoreProvider>,
    )

    .toJSON();
  expect(tree).toMatchSnapshot();
});
