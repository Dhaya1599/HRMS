/**
 * HRMS Mobile - React Native (no Expo)
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';
import { RootNavigator } from './src/navigation/RootNavigator';
import { COLORS } from './src/constants/colors';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
