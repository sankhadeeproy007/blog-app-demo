import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import CreateScreen from './src/screens/CreateScreen';

import routes from './src/constants/routes';

const Stack = createStackNavigator();

export default function App() {
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
