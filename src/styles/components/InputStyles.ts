import { StyleSheet } from 'react-native';
import { COLORS, THEME } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: { marginBottom: THEME.spacing.lg },
  label: {
    ...THEME.typography.bodySmall,
    color: COLORS.textPrimary,
    marginBottom: THEME.spacing.sm,
    fontWeight: '600',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBg,
    borderRadius: THEME.borderRadius.md,
    paddingHorizontal: THEME.spacing.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    minHeight: 48,
  },
  input: {
    flex: 1,
    ...THEME.typography.body,
    color: COLORS.textPrimary,
    paddingVertical: THEME.spacing.md,
  },
  iconLeft: { marginRight: THEME.spacing.sm },
  iconRight: { marginLeft: THEME.spacing.sm },
  inputError: { borderColor: COLORS.error },
  errorText: {
    ...THEME.typography.caption,
    color: COLORS.error,
    marginTop: THEME.spacing.xs,
  },
});
