import { StyleSheet } from 'react-native';
import { COLORS, THEME } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  backBtn: { padding: THEME.spacing.lg },
  keyboard: { flex: 1 },
  content: { paddingHorizontal: THEME.spacing.xl, paddingTop: THEME.spacing.lg },
  centered: {
    flex: 1,
    paddingHorizontal: THEME.spacing.xl,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: THEME.spacing.sm,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: THEME.spacing.xl,
  },
  iconWrap: {
    alignItems: 'center',
    marginBottom: THEME.spacing.lg,
  },
  input: { marginBottom: THEME.spacing.lg },
  primaryBtn: { marginTop: THEME.spacing.md },
});
