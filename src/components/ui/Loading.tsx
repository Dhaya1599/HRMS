import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { COLORS, THEME } from '@constants/colors';

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

const styles = StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center', paddingVertical: THEME.spacing.xxl },
  fullScreen: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background },
  message: { ...THEME.typography.bodySmall, color: COLORS.textSecondary, marginTop: THEME.spacing.lg },
});
