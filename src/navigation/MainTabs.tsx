import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Calendar, Clock, User } from 'lucide-react-native';
import { COLORS } from '@constants/colors';
import { HomeScreen } from '@screens/HomeScreen';
import { AttendanceScreen } from '@screens/AttendanceScreen';
import { LeaveScreen } from '@screens/LeaveScreen';
import { ProfileScreen } from '@screens/ProfileScreen';

export type MainTabsParamList = {
  Home: undefined;
  Leave: undefined;
  Attendance: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabsParamList>();

export const MainTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: COLORS.background,
        borderTopColor: COLORS.border,
        borderTopWidth: 1,
        paddingBottom: 6,
        paddingTop: 6,
        height: 56,
      },
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: COLORS.textSecondary,
      tabBarLabelStyle: { fontSize: 11, fontWeight: '600', marginTop: 2 },
    }}
  >
    <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Home', tabBarIcon: ({ color, size }) => <Home color={color} size={size} /> }} />
    <Tab.Screen name="Leave" component={LeaveScreen} options={{ tabBarLabel: 'Leaves', tabBarIcon: ({ color, size }) => <Calendar color={color} size={size} /> }} />
    <Tab.Screen name="Attendance" component={AttendanceScreen} options={{ tabBarLabel: 'Attendance', tabBarIcon: ({ color, size }) => <Clock color={color} size={size} /> }} />
    <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Profile', tabBarIcon: ({ color, size }) => <User color={color} size={size} /> }} />
  </Tab.Navigator>
);
