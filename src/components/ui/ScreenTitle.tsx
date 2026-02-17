import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, THEME } from '../../constants/colors';

const PAD = THEME.spacing.lg;

interface ScreenTitleProps {
  title: string;
  right?: React.ReactNode;
  style?: ViewStyle;
}

export const ScreenTitle: React.FC<ScreenTitleProps> = ({ title, right, style }) => (
  <View style={[styles.row, style]}>
    <Text style={styles.title} numberOfLines={1}>{title}</Text>
    {right != null && <View style={styles.right}>{right}</View>}
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: PAD,
    paddingVertical: THEME.spacing.md,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  right: {},
});

export const SCREEN_PAD = PAD;
