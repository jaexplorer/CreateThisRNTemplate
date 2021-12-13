import React from 'react';
import { View } from 'react-native';
import { render } from '@testing-library/react-native';
import Button from './Button';
import ButtonRoot from './ButtonRoot';

test('Does Button render test', () => {
  render(<Button>Test</Button>);
});

test('Does ButtonRoot render test', () => {
  render(
    <ButtonRoot>
      <View />
    </ButtonRoot>,
  );
});
