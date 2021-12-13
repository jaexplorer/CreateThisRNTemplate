import { StyleSheet } from 'react-native';
import { StylesCreator } from '../../Theme';

const stylesCreator: StylesCreator = (theme, scale, moderateScale, props) =>
  StyleSheet.create({
    buttonRootContainer: { opacity: props?.disabled ? 0.4 : 1 },
    buttonContainer: {
      minWidth: scale(60),
      padding: scale(5),
      borderRadius: 100,
      backgroundColor: props.primary ? theme.colours.buttonColours.primary : 'transparent',
      borderColor: theme.colours.buttonColours.border,
      borderWidth: props.primary ? 0 : 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      fontSize: moderateScale(10),
      fontFamily: theme.font.bold,
      color: props.primary
        ? theme.colours.textColours.primary
        : theme.colours.textColours.secondary,
      paddingLeft: scale(10),
      paddingRight: scale(10),
    },
  });

export default stylesCreator;
