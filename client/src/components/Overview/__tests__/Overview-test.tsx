import React from 'react';
import OverView from '../Overview';

import renderer from 'react-test-renderer';
import { createStore, StoreProvider } from 'easy-peasy';
import { storeModel } from '../../../store/models';

const props: any = {
  navigation: { navigate: () => jest.fn() },
  route: undefined,
};

it('renders RegisterForm correctly', () => {
  const store = createStore(storeModel);
  const tree = renderer
    .create(
      <StoreProvider store={store}>
        <OverView {...props} />
      </StoreProvider>,
    )

    .toJSON();
  expect(tree).toMatchSnapshot();
});
