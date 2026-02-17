import { StyleSheet } from 'react-native';
import { COLORS, THEME } from '../../constants/colors';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: THEME.borderRadius.xl,
    padding: THEME.spacing.lg,
    marginBottom: THEME.spacing.lg,
    borderWidth: 1,
    borderLeftWidth: 4,
    borderColor: COLORS.borderLight,
    ...THEME.shadows.sm,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: THEME.spacing.md,
  },
  sectionLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
    letterSpacing: -0.2,
  },
  livePill: {
    backgroundColor: 'rgba(76, 175, 80, 0.12)',
    paddingHorizontal: THEME.spacing.sm,
    paddingVertical: 2,
    borderRadius: THEME.borderRadius.xs,
  },
  livePillText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.success,
    letterSpacing: 0.5,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: THEME.spacing.md,
  },
  clockedInRow: { flexDirection: 'row', alignItems: 'center' },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.success,
    marginRight: THEME.spacing.sm,
  },
  clockedInText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  entryTimeBlock: { alignItems: 'flex-end' },
  entryTime: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.primary,
  },
  entryLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  shiftText: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  statsRow: {
    flexDirection: 'row',
    gap: THEME.spacing.md,
    marginBottom: THEME.spacing.lg,
  },
  statBox: {
    flex: 1,
    backgroundColor: COLORS.backgroundSecondary,
    borderRadius: THEME.borderRadius.md,
    padding: THEME.spacing.md,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  statValueGrey: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  punchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: THEME.spacing.lg,
    borderRadius: THEME.borderRadius.lg,
  },
  punchButtonDisabled: { opacity: 0.7 },
  punchButtonDone: {
    backgroundColor: COLORS.surfaceVariant,
    paddingVertical: THEME.spacing.md,
    borderRadius: THEME.borderRadius.md,
    alignItems: 'center',
  },
  punchIcon: { marginRight: THEME.spacing.sm },
  punchButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.onPrimary,
  },
});
