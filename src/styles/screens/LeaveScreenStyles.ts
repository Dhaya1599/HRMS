import { StyleSheet } from 'react-native';
import { COLORS, THEME } from '../../constants/colors';
import { SCREEN_PAD } from '../global';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingHorizontal: SCREEN_PAD, paddingBottom: THEME.spacing.xxl },
  section: { marginBottom: THEME.spacing.xl },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: THEME.spacing.md,
  },
  sectionIcon: { marginRight: THEME.spacing.sm },
  sectionTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
    letterSpacing: 0.3,
  },
  sectionAction: {
    paddingVertical: THEME.spacing.xs,
    paddingHorizontal: THEME.spacing.sm,
  },
  sectionActionText: { fontSize: 13, fontWeight: '600', color: COLORS.primary },
  emptyState: { paddingVertical: THEME.spacing.xxl, alignItems: 'center' },
  emptyText: { fontSize: 15, color: COLORS.textSecondary, fontWeight: '500' },
  emptySub: { fontSize: 13, color: COLORS.textTertiary, marginTop: 4 },
});
