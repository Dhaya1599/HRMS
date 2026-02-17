import { StyleSheet } from 'react-native';
import { COLORS, THEME } from '../../constants/colors';
import { SCREEN_PAD } from '../global';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.backgroundSecondary },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: THEME.spacing.xxl },
  content: {
    paddingHorizontal: SCREEN_PAD,
    paddingTop: THEME.spacing.lg,
  },
});
