import React, { FC } from 'react';
import { useTheme } from '../../Theme';
import { Style } from '../../Types';
import Text from '../text/Text';
import ButtonRoot, { ButtonRootProps } from './ButtonRoot';
import stylesCreator from './ButtonStyles';

const Button: FC<ButtonProps> = ({
  onPress = () => {},
  disabled = false,
  primary = true,
  children,
  style = {},
  textStyle = {},
}) => {
  const [styles] = useTheme(stylesCreator, { primary });

  return (
    <ButtonRoot style={[styles.buttonContainer, style]} onPress={onPress} disabled={disabled}>
      <Text style={[styles.buttonText, textStyle]}>{children}</Text>
    </ButtonRoot>
  );
};

export interface ButtonProps extends ButtonRootProps {
  textStyle?: Style;
  children: string;
  primary?: boolean;
}

export default Button;
