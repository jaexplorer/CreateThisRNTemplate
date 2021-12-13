/* eslint-disable react/no-array-index-key */
import React, { FC } from 'react';
import { View } from 'react-native';
import { useTheme } from '../../Theme';
import Text from '../text/Text';
import stylesCreator from './RotatedTextStyles';

interface RotatedTextProps {
  text: string;
}

const RotatedText: FC<RotatedTextProps> = ({ text }) => {
  const textArray = text.split('');
  const [styles] = useTheme(stylesCreator);

  return (
    <View style={styles.textArray}>
      {textArray.map((t, i) => (
        <View key={i} style={styles.letterWrapper}>
          <Text bold style={styles.text}>
            {t}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default RotatedText;
