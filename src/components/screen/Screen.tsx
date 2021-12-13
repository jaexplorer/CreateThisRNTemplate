import React, { FC } from 'react';
import { View } from 'react-native';
import { useTheme } from '../../Theme';
import stylesCreator from './ScreenStyles';

interface ScreenProps {
  backgroundColor?: string;
}

const Screen: FC<ScreenProps> = ({ children, backgroundColor }) => {
  const [styles] = useTheme(stylesCreator, { backgroundColor });
  return (
    <View testID="root" style={[styles.screenContainer]}>
      <View style={styles.contentContainer}>{children}</View>
    </View>
  );
};

export default Screen;
