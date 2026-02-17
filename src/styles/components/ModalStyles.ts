import { StyleSheet } from 'react-native';
import { COLORS, THEME } from '../../constants/colors';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: THEME.spacing.lg,
  },
  centered: { width: '100%', maxWidth: 400, alignSelf: 'center' },
  box: {
    backgroundColor: COLORS.surface,
    borderRadius: THEME.borderRadius.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    maxHeight: '85%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: THEME.spacing.lg,
    paddingVertical: THEME.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.textPrimary,
    flex: 1,
  },
  closeBtn: { padding: THEME.spacing.xs },
  bodyScroll: { maxHeight: 360 },
  bodyContent: { padding: THEME.spacing.lg, paddingBottom: THEME.spacing.xl },
  body: { padding: THEME.spacing.lg },
  primaryBtn: {
    backgroundColor: COLORS.primary,
    marginHorizontal: THEME.spacing.lg,
    marginBottom: THEME.spacing.lg,
    paddingVertical: THEME.spacing.md,
    borderRadius: THEME.borderRadius.md,
    alignItems: 'center',
  },
  primaryBtnDisabled: { opacity: 0.6 },
  primaryBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.onPrimary,
  },
});
