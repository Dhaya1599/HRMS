import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, THEME } from '@constants/colors';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  elevation?: 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({ children, style, elevation = 'sm' }) => {
  const shadowStyle = THEME.shadows[elevation as keyof typeof THEME.shadows];
  return <View style={[styles.card, shadowStyle, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.md,
    marginVertical: THEME.spacing.xs,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
});
