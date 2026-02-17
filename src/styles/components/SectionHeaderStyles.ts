import { StyleSheet } from 'react-native';
import { COLORS, THEME } from '../../constants/colors';

export const styles = StyleSheet.create({
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
  content: { flex: 1 },
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
