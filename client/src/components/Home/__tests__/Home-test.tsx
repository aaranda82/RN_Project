import React from 'react';
import Home from '../Home';

import renderer from 'react-test-renderer';

const navProps: any = {};
const routeProps: any = {};

it('renders Home screen correctly', () => {
  const tree = renderer
    .create(<Home navigation={navProps} route={routeProps} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
