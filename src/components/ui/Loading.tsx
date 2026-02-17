import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { COLORS } from '@constants/colors';
import { styles } from '@styles/components/LoadingStyles';

interface LoadingProps {
  size?: 'small' | 'large';
  color?: string;
  message?: string;
  fullScreen?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({
  size = 'large',
  color = COLORS.primary,
  message,
  fullScreen = false,
}) => (
  <View style={fullScreen ? styles.fullScreen : styles.container}>
    <ActivityIndicator size={size} color={color} />
    {message && <Text style={styles.message}>{message}</Text>}
  </View>
);
