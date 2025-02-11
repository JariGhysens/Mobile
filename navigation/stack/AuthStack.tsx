import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthStackParams } from '../../types/Param';
import LoginScreen from '../../screens/LoginScreen';
import RegisterScreen from '../../screens/RegisterScreen';



export const AuthStack = () => {
  const Stack = createStackNavigator<AuthStackParams>();

  return (
    <Stack.Navigator screenOptions={{headerShown : false}}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
      />
    </Stack.Navigator>
  );
}
