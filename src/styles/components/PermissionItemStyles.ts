import { StyleSheet } from 'react-native';
import { COLORS, THEME } from '../../constants/colors';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: THEME.borderRadius.md,
    padding: THEME.spacing.md,
    marginBottom: THEME.spacing.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  dateBlock: {
    width: 44,
    alignItems: 'center',
    marginRight: THEME.spacing.md,
    paddingVertical: THEME.spacing.xs,
    paddingHorizontal: THEME.spacing.sm,
    backgroundColor: COLORS.surfaceVariant,
    borderRadius: THEME.borderRadius.sm,
  },
  dateDay: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary },
  dateMonth: { fontSize: 10, fontWeight: '600', color: COLORS.textTertiary },
  main: { flex: 1 },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  time: { fontSize: 13, fontWeight: '600', color: COLORS.textPrimary },
  reason: { fontSize: 12, color: COLORS.textSecondary },
});
