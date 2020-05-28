import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import CreateScreen from './screens/CreateScreen';

import routes from './constants/routes';

const Stack = createStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false
        }}
      >
        <Stack.Screen name={routes.Login} component={LoginScreen} />
        <Stack.Screen name={routes.Home} component={HomeScreen} />
        <Stack.Screen name={routes.Create} component={CreateScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
