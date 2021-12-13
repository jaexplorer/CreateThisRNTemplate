import { StyleSheet } from 'react-native';
import { StylesCreator } from '../../Theme';

const stylesCreator: StylesCreator = (theme, scale, moderateScale) =>
  StyleSheet.create({
    textArray: {
      width: scale(6),
    },
    letterWrapper: {
      width: scale(6),
      height: scale(4.5), // Padding between each letter
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    text: {
      transform: [
        {
          rotate: '90deg',
        },
      ],
      textTransform: 'uppercase',
      fontSize: moderateScale(9),
    },
  });

export default stylesCreator;
