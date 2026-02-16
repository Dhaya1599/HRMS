import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '@context/AuthContext';
import { AttendanceProvider } from '@context/AttendanceContext';
import { COLORS } from '@constants/colors';
import { AuthStack } from './AuthStack';
import { MainTabs } from './MainTabs';

export const RootNavigator = () => {
  const { state } = useAuth();

  if (state.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!state.isAuthenticated) {
    return <AuthStack />;
  }

  return (
    <AttendanceProvider>
      <MainTabs />
    </AttendanceProvider>
  );
};
