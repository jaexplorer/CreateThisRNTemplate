import { LinkingOptions } from '@react-navigation/native';
import { RootStackParamList } from './navigation/NavigationConstants';

export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['https://rntemplate.com', 'rntemplate://'],
  config: {
    screens: {
      Main: {
        screens: {
          Home: 'Home',
        },
      },
    },
  },
};
