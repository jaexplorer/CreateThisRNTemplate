import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList, MainStackParamList } from './NavigationConstants';
import Home from '../screens/home/Home';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const MainStack = createNativeStackNavigator<MainStackParamList>();
const MainNavigation: FC = () => (
  <MainStack.Navigator initialRouteName="Home">
    <MainStack.Screen name="Home" component={Home} />
  </MainStack.Navigator>
);
const RootNavigation: FC = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="Main" component={MainNavigation} />
    </RootStack.Navigator>
  );
};

export default RootNavigation;
