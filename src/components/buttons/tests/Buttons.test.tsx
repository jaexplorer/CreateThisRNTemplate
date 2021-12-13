import React from 'react';
import { View } from 'react-native';
import { render } from '@testing-library/react-native';
import Button from '../Button';
import ButtonRoot from '../ButtonRoot';

test('Does Button render test', () => {
  const { container } = render(<Button>Test</Button>);
  expect(container).toMatchSnapshot();
});

test('Does ButtonRoot render test', () => {
  const { container } = render(
    <ButtonRoot>
      <View />
    </ButtonRoot>,
  );
  expect(container).toMatchSnapshot();
});
