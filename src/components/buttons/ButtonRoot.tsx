import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { useTheme } from '../../Theme';
import { Style } from '../../Types';
import stylesCreator from './ButtonStyles';

const ButtonRoot: FC<ButtonRootProps> = ({
  children,
  onPress = () => {},
  disabled = false,
  style = {},
}) => {
  const [styles] = useTheme(stylesCreator, { disabled });
  return (
    <TouchableOpacity
      style={[styles.buttonRootContainer, style]}
      activeOpacity={disabled ? 0.4 : 0.2}
      onPress={disabled ? () => {} : onPress}
    >
      {children}
    </TouchableOpacity>
  );
};

export interface ButtonRootProps {
  onPress?: () => void;
  disabled?: boolean;
  rnTouchable?: boolean;
  label?: string;
  bold?: boolean;
  style?: Style;
}

export default ButtonRoot;
