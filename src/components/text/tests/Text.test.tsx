import React from 'react';
import { render } from '@testing-library/react-native';
import Text from '../Text';

test('Does component render test', () => {
  const { container } = render(<Text>Test</Text>);
  expect(container).toMatchSnapshot();
});
