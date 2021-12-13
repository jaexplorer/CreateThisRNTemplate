import { StyleSheet } from 'react-native';
import { StylesCreator } from '../../Theme';

const stylesCreator: StylesCreator = (theme, scale, moderateScale, props) =>
  StyleSheet.create({
    screenContainer: {
      flex: 1,
      maxWidth: theme.SCREEN_WIDTH,
      maxHeight: theme.SCREEN_HEIGHT,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      padding: theme.SCREEN_MARGIN,
      backgroundColor: props.backgroundColor || theme.colours.backgroundColours.primary,
    },
    contentContainer: {
      width: theme.CONTENT_WIDTH,
      height: theme.CONTENT_HEIGHT,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
    },
  });

export default stylesCreator;
