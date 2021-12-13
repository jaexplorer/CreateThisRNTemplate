import React from 'react';
import { render } from '@testing-library/react-native';
import Home from '../Home';

test('renders home', () => {
  const { container } = render(<Home />);
  expect(container).toMatchSnapshot();
});
