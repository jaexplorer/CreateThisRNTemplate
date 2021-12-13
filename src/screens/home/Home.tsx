import React, { FC, useEffect, useState, useMemo } from 'react';
import { View, Text } from 'react-native';
import { HomeScreen } from '../../navigation/NavigationConstants';

interface HomeProps extends HomeScreen {}

const Home: FC<HomeProps> = ({ navigation, route }) => {
  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
};
export default Home;
