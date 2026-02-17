import { StyleSheet } from 'react-native';
import { COLORS, THEME } from '../../constants/colors';

export const styles = StyleSheet.create({
  list: { maxHeight: 280 },
  listContent: { paddingBottom: THEME.spacing.md },
  option: {
    paddingVertical: THEME.spacing.md,
    paddingHorizontal: THEME.spacing.lg,
    borderRadius: THEME.borderRadius.sm,
    marginBottom: THEME.spacing.xs,
  },
  optionSelected: {
    backgroundColor: COLORS.surfaceVariant,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
  },
  optionText: {
    fontSize: 15,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  optionTextSelected: { fontWeight: '600', color: COLORS.primary },
});
