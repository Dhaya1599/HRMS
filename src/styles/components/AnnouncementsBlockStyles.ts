import { StyleSheet } from 'react-native';
import { COLORS, THEME } from '../../constants/colors';

export const styles = StyleSheet.create({
  section: { marginBottom: THEME.spacing.xl },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.lg,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    ...THEME.shadows.sm,
  },
  item: {
    flexDirection: 'row',
    paddingVertical: THEME.spacing.sm,
  },
  itemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
    marginBottom: THEME.spacing.sm,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(253, 122, 46, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: THEME.spacing.md,
  },
  body: { flex: 1 },
  title: {
    ...THEME.typography.body,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  text: {
    ...THEME.typography.caption,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  meta: {
    ...THEME.typography.caption,
    color: COLORS.textTertiary,
    marginTop: 4,
  },
});
