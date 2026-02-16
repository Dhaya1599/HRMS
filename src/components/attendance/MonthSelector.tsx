import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, THEME } from '@constants/colors';
import { ChevronDown } from 'lucide-react-native';

interface MonthSelectorProps {
  label: string;
  onPress?: () => void;
}

export const MonthSelector: React.FC<MonthSelectorProps> = ({ label, onPress }) => (
  <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
    <Text style={styles.label}>{label}</Text>
    <ChevronDown size={20} color={COLORS.textPrimary} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surface,
    borderRadius: THEME.borderRadius.md,
    paddingHorizontal: THEME.spacing.md,
    paddingVertical: THEME.spacing.sm,
    marginBottom: THEME.spacing.md,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
});
