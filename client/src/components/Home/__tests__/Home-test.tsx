import React from 'react';
import Home from '../Home';

import renderer from 'react-test-renderer';

const props: any = {
  navigation: { navigate: () => jest.fn() },
  route: undefined,
};

it('renders Home screen correctly', () => {
  const tree = renderer.create(<Home {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
