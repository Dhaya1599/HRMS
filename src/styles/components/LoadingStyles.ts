import { StyleSheet } from 'react-native';
import { COLORS, THEME } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: THEME.spacing.xxl,
  },
  fullScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  message: {
    ...THEME.typography.bodySmall,
    color: COLORS.textSecondary,
    marginTop: THEME.spacing.lg,
  },
});
