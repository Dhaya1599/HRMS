import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { COLORS, THEME } from '../../constants/colors';

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
  /** Optional small label above title (e.g. "AT A GLANCE") */
  overline?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  actionLabel,
  onAction,
  overline,
}) => (
  <View style={styles.wrap}>
    <View style={styles.accentBar} />
    <View style={styles.content}>
      <View style={styles.row}>
        <Text style={styles.title}>{title}</Text>
        {actionLabel != null && onAction != null ? (
          <TouchableOpacity onPress={onAction} activeOpacity={0.7}>
            <Text style={styles.action}>{actionLabel}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginBottom: THEME.spacing.sm,
  },
  accentBar: {
    width: 4,
    borderRadius: 2,
    backgroundColor: COLORS.primary,
    marginRight: THEME.spacing.sm,
  },
  content: {flex: 1},
  overline: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textTertiary,
    letterSpacing: 1.2,
    marginBottom: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.textPrimary,
    letterSpacing: -0.3,
  },
  action: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
  },
});
