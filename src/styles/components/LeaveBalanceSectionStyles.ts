import { StyleSheet } from 'react-native';
import { COLORS, THEME } from '../../constants/colors';

export const styles = StyleSheet.create({
  section: { marginBottom: THEME.spacing.xl },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: THEME.spacing.md,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textSecondary,
    letterSpacing: 0.5,
  },
  action: { fontSize: 12, fontWeight: '600', color: COLORS.primary },
  cardsRow: { flexDirection: 'row', gap: THEME.spacing.sm },
  card: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: THEME.borderRadius.md,
    padding: THEME.spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: THEME.borderRadius.sm,
    backgroundColor: COLORS.surfaceVariant,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: THEME.spacing.sm,
  },
  remaining: { fontSize: 22, fontWeight: '700', color: COLORS.textPrimary },
  remainingLabel: {
    fontSize: 9,
    fontWeight: '600',
    color: COLORS.textTertiary,
    marginTop: 0,
    letterSpacing: 0.3,
  },
  barTrack: {
    height: 4,
    width: '100%',
    backgroundColor: COLORS.border,
    borderRadius: 2,
    marginTop: THEME.spacing.sm,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
  usedTotal: {
    fontSize: 10,
    color: COLORS.textTertiary,
    marginTop: THEME.spacing.xs,
  },
  type: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textSecondary,
    letterSpacing: 0.3,
    marginTop: 1,
  },
});
