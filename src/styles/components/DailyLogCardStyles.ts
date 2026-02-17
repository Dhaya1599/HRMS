import { StyleSheet } from 'react-native';
import { COLORS, THEME } from '../../constants/colors';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: THEME.borderRadius.md,
    padding: THEME.spacing.md,
    marginBottom: THEME.spacing.sm,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: THEME.spacing.sm,
  },
  dateBlock: {
    width: 52,
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: THEME.spacing.md,
    paddingVertical: THEME.spacing.xs,
    paddingHorizontal: THEME.spacing.xs,
    borderRadius: THEME.borderRadius.sm,
    backgroundColor: COLORS.surface,
  },
  dateBlockOrange: {
    backgroundColor: COLORS.surfaceVariant,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  dayLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textSecondary,
    letterSpacing: 0.5,
  },
  dateNum: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary,
    lineHeight: 24,
  },
  main: { flex: 1, justifyContent: 'center', minHeight: 44 },
  chevron: { marginLeft: THEME.spacing.xs },
  worked: { fontSize: 14, fontWeight: '700', color: COLORS.textPrimary },
  shift: { fontSize: 12, color: COLORS.textSecondary, marginTop: 1 },
  punchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: THEME.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  punchCol: {},
  punchLabel: {
    fontSize: 9,
    fontWeight: '600',
    color: COLORS.textSecondary,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  punchTimeRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  punchTimeRowEnd: { justifyContent: 'flex-end' },
  punchTime: { fontSize: 13, fontWeight: '600', color: COLORS.textPrimary },
});
