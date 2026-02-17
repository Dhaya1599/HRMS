import { StyleSheet } from 'react-native';
import { COLORS, THEME } from '../../constants/colors';

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: THEME.borderRadius.md,
    paddingVertical: THEME.spacing.md,
    paddingHorizontal: THEME.spacing.lg,
    marginBottom: THEME.spacing.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.border,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: THEME.spacing.md,
  },
  iconGreen: { backgroundColor: COLORS.approved },
  iconOrange: { backgroundColor: COLORS.primary },
  iconRed: { backgroundColor: COLORS.rejected },
  content: { flex: 1 },
  type: { fontSize: 15, fontWeight: '600', color: COLORS.textPrimary },
  dateRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  calIcon: { marginRight: 4 },
  dates: { fontSize: 12, color: COLORS.textSecondary },
});
