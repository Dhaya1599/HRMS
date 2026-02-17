import { StyleSheet } from 'react-native';
import { COLORS, THEME } from '../../constants/colors';

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: THEME.spacing.lg,
  },
  labelValue: { flex: 1, marginLeft: THEME.spacing.md },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textTertiary,
    letterSpacing: 0.3,
    marginBottom: 2,
  },
  value: { fontSize: 15, fontWeight: '600', color: COLORS.textPrimary },
  sub: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
});
