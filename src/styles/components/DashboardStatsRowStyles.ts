import { StyleSheet } from 'react-native';
import { COLORS, THEME } from '../../constants/colors';

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: THEME.spacing.sm,
    gap: THEME.spacing.xs,
  },
  tile: {
    flex: 1,
    minWidth: '47%',
    backgroundColor: COLORS.surface,
    borderRadius: THEME.borderRadius.sm,
    paddingVertical: THEME.spacing.sm,
    paddingHorizontal: THEME.spacing.md,
  },
  value: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  valueAccent: {
    color: COLORS.primary,
    fontSize: 13,
  },
  label: {
    fontSize: 10,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
});
