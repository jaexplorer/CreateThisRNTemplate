import React from 'react';
import { View } from 'react-native';
import { render } from '@testing-library/react-native';
import Screen from './Screen';

test('Does component render test', () => {
  render(
    <Screen>
      <View />
    </Screen>,
  );
});
