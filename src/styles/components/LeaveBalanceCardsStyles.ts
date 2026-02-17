import { StyleSheet } from 'react-native';
import { COLORS, THEME } from '../../constants/colors';

export const styles = StyleSheet.create({
  section: { marginBottom: THEME.spacing.xl },
  cardsRow: {
    flexDirection: 'row',
    gap: THEME.spacing.sm,
  },
  card: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.md,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    ...THEME.shadows.sm,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textSecondary,
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  number: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  sublabel: {
    fontSize: 10,
    color: COLORS.textTertiary,
    marginTop: 2,
  },
});
