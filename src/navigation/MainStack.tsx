import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainTabs } from './MainTabs';
import { AnnouncementsScreen } from '@screens/AnnouncementsScreen';
import { NotificationsScreen } from '@screens/NotificationsScreen';
import { GeofencingScreen } from '@screens/GeofencingScreen';

export type MainStackParamList = {
  MainTabs: undefined;
  Announcements: undefined;
  Notifications: undefined;
  Geofencing: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

export const MainStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MainTabs" component={MainTabs} />
    <Stack.Screen name="Announcements" component={AnnouncementsScreen} />
    <Stack.Screen name="Notifications" component={NotificationsScreen} />
    <Stack.Screen name="Geofencing" component={GeofencingScreen} />
  </Stack.Navigator>
);
