import { StyleSheet } from 'react-native';
import { COLORS, THEME } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: THEME.spacing.lg,
    paddingVertical: THEME.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backBtn: { marginRight: THEME.spacing.md },
  title: { fontSize: 18, fontWeight: '600', color: COLORS.textPrimary },
  content: { padding: THEME.spacing.lg, paddingBottom: THEME.spacing.xl },
  card: { marginBottom: THEME.spacing.md },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: THEME.spacing.sm,
  },
  cardBody: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: THEME.spacing.sm,
  },
  cardMeta: { fontSize: 12, color: COLORS.textTertiary },
});
