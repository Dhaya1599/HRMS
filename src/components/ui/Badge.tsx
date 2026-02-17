import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { COLORS, THEME } from '@constants/colors';
import { styles } from '@styles/components/BadgeStyles';

interface BadgeProps {
  label: string;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'default';
  size?: 'small' | 'medium';
  style?: ViewStyle;
}

const variantStyle = {
  success: { backgroundColor: COLORS.success, color: COLORS.background },
  warning: { backgroundColor: COLORS.warning, color: COLORS.background },
  error: { backgroundColor: COLORS.error, color: COLORS.textPrimary },
  info: { backgroundColor: COLORS.info, color: COLORS.background },
  default: { backgroundColor: COLORS.surfaceVariant, color: COLORS.textPrimary },
};

export const Badge: React.FC<BadgeProps> = ({ label, variant = 'default', size = 'small', style }) => {
  const selected = variantStyle[variant];
  const sizePadding = size === 'small' ? { paddingVertical: 4, paddingHorizontal: 8 } : { paddingVertical: 6, paddingHorizontal: 12 };
  return (
    <View style={[styles.badge, { backgroundColor: selected.backgroundColor }, sizePadding, style]}>
      <Text style={[size === 'small' ? THEME.typography.caption : THEME.typography.bodySmall, { color: selected.color, fontWeight: '600' }]}>
        {label}
      </Text>
    </View>
  );
};
