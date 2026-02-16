import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, THEME } from '@constants/colors';

type Variant = 'approved' | 'pending' | 'rejected' | 'onTime' | 'late' | 'absent';

const PILL_COLORS: Record<Variant, { bg: string; text: string }> = {
  approved: { bg: '#4CAF5020', text: COLORS.approved },
  pending: { bg: '#FD7A2E20', text: COLORS.pending },
  rejected: { bg: '#F4433620', text: COLORS.rejected },
  onTime: { bg: '#4CAF5020', text: COLORS.success },
  late: { bg: '#FD7A2E20', text: COLORS.warning },
  absent: { bg: '#F4433620', text: COLORS.error },
};

interface StatusPillProps {
  label: string;
  variant: Variant;
}

export const StatusPill: React.FC<StatusPillProps> = ({ label, variant }) => {
  const { bg, text } = PILL_COLORS[variant] ?? { bg: COLORS.surfaceVariant, text: COLORS.textSecondary };
  return (
    <View style={[styles.pill, { backgroundColor: bg }]}>
      <Text style={[styles.text, { color: text }]}>{label.toUpperCase()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: THEME.spacing.md,
    paddingVertical: THEME.spacing.xs,
    borderRadius: THEME.borderRadius.full,
  },
  text: {
    fontSize: 11,
    fontWeight: '600',
  },
});
