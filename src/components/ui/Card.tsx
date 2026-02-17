import React from 'react';
import { View, ViewStyle } from 'react-native';
import { THEME } from '@constants/colors';
import { styles } from '@styles/components/CardStyles';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  elevation?: 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({ children, style, elevation = 'sm' }) => {
  const shadowStyle = THEME.shadows[elevation as keyof typeof THEME.shadows];
  return <View style={[styles.card, shadowStyle, style]}>{children}</View>;
};
