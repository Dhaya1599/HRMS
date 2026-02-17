import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '@screens/LoginScreen';
import { ForgotPasswordScreen } from '@screens/ForgotPasswordScreen';
import { ResetPasswordScreen } from '@screens/ResetPasswordScreen';

export type AuthStackParamList = {
  Login: undefined;
  ForgotPassword: undefined;
  ResetPassword: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
  </Stack.Navigator>
);
