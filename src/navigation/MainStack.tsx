import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainTabs } from './MainTabs';
import { TeamScreen } from '@screens/TeamScreen';
import { AnnouncementsScreen } from '@screens/AnnouncementsScreen';
import { NotificationsScreen } from '@screens/NotificationsScreen';
import { ManagerDashboardScreen } from '@screens/ManagerDashboardScreen';
import { GeofencingScreen } from '@screens/GeofencingScreen';

export type MainStackParamList = {
  MainTabs: undefined;
  Team: undefined;
  Announcements: undefined;
  Notifications: undefined;
  ManagerDashboard: undefined;
  Geofencing: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

export const MainStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MainTabs" component={MainTabs} />
    <Stack.Screen name="Team" component={TeamScreen} />
    <Stack.Screen name="Announcements" component={AnnouncementsScreen} />
    <Stack.Screen name="Notifications" component={NotificationsScreen} />
    <Stack.Screen name="ManagerDashboard" component={ManagerDashboardScreen} />
    <Stack.Screen name="Geofencing" component={GeofencingScreen} />
  </Stack.Navigator>
);
