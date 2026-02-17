import { StyleSheet } from 'react-native';
import { COLORS, THEME } from '../../constants/colors';

const PAD = THEME.spacing.lg;

export const SCREEN_PAD = PAD;

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: PAD,
    paddingVertical: THEME.spacing.md,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  right: {},
});
