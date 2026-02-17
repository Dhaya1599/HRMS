import { StyleSheet } from 'react-native';
import { COLORS, THEME } from '../constants/colors';

/** Horizontal padding for screen content. Re-export from theme for components that need it. */
export const SCREEN_PAD = THEME.spacing.lg;

export const globalStyles = StyleSheet.create({
  screenContainer: { flex: 1, backgroundColor: COLORS.backgroundSecondary },
  screenContainerBg: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: THEME.spacing.xxl },
  content: {
    paddingHorizontal: SCREEN_PAD,
    paddingTop: THEME.spacing.lg,
  },
});
