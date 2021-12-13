import React from 'react';
import { render } from '@testing-library/react-native';
import RotatedText from '../RotatedText';

test('Does component render test', () => {
  const { container } = render(<RotatedText text="Test" />);
  expect(container).toMatchSnapshot();
});
