import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, THEME } from '@constants/colors';

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  actionLabel,
  onAction,
}) => (
  <View style={styles.row}>
    <Text style={styles.title}>{title}</Text>
    {actionLabel != null && (
      <TouchableOpacity onPress={onAction} activeOpacity={0.7}>
        <Text style={styles.action}>{actionLabel}</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: THEME.spacing.sm,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  action: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
  },
});
