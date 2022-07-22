import React from 'react';
import LoginForm from '../LoginForm';

import renderer from 'react-test-renderer';
import { createStore, StoreProvider } from 'easy-peasy';
import { storeModel } from '../../../store';

const navProps: any = {};
const routeProps: any = {};

it('renders LoginForm correctly', () => {
  const store = createStore(storeModel);
  const tree = renderer
    .create(
      <StoreProvider store={store}>
        <LoginForm navigation={navProps} route={routeProps} />
      </StoreProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
