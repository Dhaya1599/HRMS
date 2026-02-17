import { StyleSheet } from 'react-native';
import { COLORS, THEME } from '../../constants/colors';

export function getButtonStyles(
  variant: string,
  size: string,
  fullWidth: boolean,
) {
  const baseSize = {
    small: {
      paddingVertical: THEME.spacing.sm,
      paddingHorizontal: THEME.spacing.lg,
    },
    medium: {
      paddingVertical: THEME.spacing.md,
      paddingHorizontal: THEME.spacing.xl,
    },
    large: {
      paddingVertical: THEME.spacing.lg,
      paddingHorizontal: THEME.spacing.xxl,
    },
  };
  const variantStyle = {
    primary: {
      button: { backgroundColor: COLORS.primary },
      text: { color: COLORS.onPrimary },
    },
    secondary: {
      button: { backgroundColor: COLORS.surfaceVariant },
      text: { color: COLORS.textPrimary },
    },
    danger: {
      button: { backgroundColor: COLORS.error },
      text: { color: COLORS.textPrimary },
    },
    outline: {
      button: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: COLORS.primary,
      },
      text: { color: COLORS.primary },
    },
  };
  const selected =
    variantStyle[variant as keyof typeof variantStyle] || variantStyle.primary;
  return StyleSheet.create({
    button: {
      ...baseSize[size as keyof typeof baseSize],
      ...selected.button,
      borderRadius: THEME.borderRadius.md,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      gap: THEME.spacing.sm,
      width: fullWidth ? '100%' : 'auto',
    },
    disabled: { opacity: 0.5 },
    text: { ...THEME.typography.body, ...selected.text, fontWeight: '600' },
  });
}
