import React, { FC, ReactNode } from 'react';
import { Text as RNText, TextInputProps } from 'react-native';
import { useTheme } from '../../Theme';
import { Style } from '../../Types';
import stylesCreator from './TextStyles';

interface TextProps extends TextInputProps {
  bold?: boolean;
  children?: string | number | ReactNode[];
  style?: Style;
}

const Text: FC<TextProps> = ({ bold = false, children, style, ...props }) => {
  const [styles] = useTheme(stylesCreator, { bold });
  return (
    <RNText style={[styles.text, style]} maxFontSizeMultiplier={1} {...props}>
      {children}
    </RNText>
  );
};

export default Text;
