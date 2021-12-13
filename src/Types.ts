import { ViewStyle, TextStyle, ImageStyle, StyleProp } from 'react-native';

/** React Native Component Style Prop */
export type IStyle = StyleProp<ImageStyle>;
export type VStyle = StyleProp<ViewStyle>;
export type TStyle = StyleProp<TextStyle>;
export type Style = StyleProp<ImageStyle | ViewStyle | TextStyle>;
