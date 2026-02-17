import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainTabs} from './MainTabs';
import {AnnouncementsScreen} from '@screens/AnnouncementsScreen';

export type MainStackParamList = {
  MainTabs: undefined;
  Announcements: undefined;
  Notifications: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

export const MainStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="MainTabs" component={MainTabs} />
    <Stack.Screen name="Announcements" component={AnnouncementsScreen} />
  </Stack.Navigator>
);
