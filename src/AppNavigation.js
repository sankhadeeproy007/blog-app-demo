import React, { useState, useContext, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Auth } from 'aws-amplify';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import CreateScreen from './screens/CreateScreen';

import routes from './constants/routes';
import { AuthContext } from './AuthContext';

const Stack = createStackNavigator();

export default function AppNavigation() {
  const { isSignedIn, setIsSignedIn, setUser } = useContext(AuthContext);

  const CheckUserSession = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      console.log(user, 'user');
      setUser({ username: user.username, email: user.attributes.email });
      setIsSignedIn(true);
    } catch (error) {
      console.log(error, 'error');
    }
  };

  useEffect(() => {
    CheckUserSession();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        {!isSignedIn ? (
          <Stack.Screen name={routes.Login} component={LoginScreen} />
        ) : (
          <>
            <Stack.Screen name={routes.Home} component={HomeScreen} />
            <Stack.Screen name={routes.Create} component={CreateScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
