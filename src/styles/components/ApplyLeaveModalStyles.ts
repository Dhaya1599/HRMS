import { StyleSheet } from 'react-native';
import { COLORS, THEME } from '../../constants/colors';

export const styles = StyleSheet.create({
  field: { marginBottom: THEME.spacing.md },
  half: { flex: 1 },
  row: { flexDirection: 'row', gap: THEME.spacing.sm },
  fieldLabel: {
    fontSize: 13,
    color: COLORS.textPrimary,
    marginBottom: THEME.spacing.xs,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: THEME.borderRadius.md,
    paddingHorizontal: THEME.spacing.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: COLORS.textPrimary,
    paddingVertical: THEME.spacing.sm,
  },
  inputText: {
    flex: 1,
    fontSize: 15,
    color: COLORS.textPrimary,
    paddingVertical: THEME.spacing.sm,
  },
  textArea: {
    minHeight: 64,
    textAlignVertical: 'top',
    paddingTop: THEME.spacing.sm,
  },
});
