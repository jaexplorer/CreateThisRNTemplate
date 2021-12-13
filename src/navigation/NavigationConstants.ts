import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, CompositeNavigationProp } from '@react-navigation/native';

/* Root Stack
------------------------------------------------------------------- */
export type RootStackParamList = {
  Main: undefined;
  Modal: undefined;
};

type MainNavigation = NativeStackNavigationProp<RootStackParamList, 'Main'>;

type ModalNavigation = NativeStackNavigationProp<RootStackParamList, 'Modal'>;
export interface ModalScreen {
  navigation: ModalNavigation;
  route: RouteProp<RootStackParamList, 'Modal'>;
}

/* Main Stack
------------------------------------------------------------------- */
export type MainStackParamList = {
  Home: HomeParams;
};

/* Home
------------------------------------------------------------------- */
type HomeParams = {
  test: string;
};
type HomeNavigation = CompositeNavigationProp<
  MainNavigation,
  NativeStackNavigationProp<MainStackParamList, 'Home'>
>;
export interface HomeScreen {
  navigation: HomeNavigation;
  route: RouteProp<MainStackParamList, 'Home'>;
}
