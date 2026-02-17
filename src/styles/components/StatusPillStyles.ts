import { StyleSheet } from 'react-native';
import { THEME } from '../../constants/colors';

export const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: THEME.spacing.md,
    paddingVertical: THEME.spacing.xs,
    borderRadius: THEME.borderRadius.full,
  },
  text: {
    fontSize: 11,
    fontWeight: '600',
  },
});
