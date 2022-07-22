import React from 'react';
import OverView from '../Overview';

import renderer from 'react-test-renderer';
import { createStore, StoreProvider } from 'easy-peasy';
import { storeModel } from '../../../store';

const navProps: any = {};
const routeProps: any = {};

it('renders RegisterForm correctly', () => {
  const store = createStore(storeModel);
  const tree = renderer
    .create(
      <StoreProvider store={store}>
        <OverView navigation={navProps} route={routeProps} />
      </StoreProvider>,
    )

    .toJSON();
  expect(tree).toMatchSnapshot();
});
