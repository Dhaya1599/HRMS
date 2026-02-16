import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from '@components/ui/Card';
import { COLORS, THEME } from '@constants/colors';
import { FileText, Calendar, Users, ChevronRight } from 'lucide-react-native';

interface QuickActionsBlockProps {
  onLeave: () => void;
  onAttendance: () => void;
  onTeam: () => void;
}

export const QuickActionsBlock: React.FC<QuickActionsBlockProps> = ({
  onLeave,
  onAttendance,
  onTeam,
}) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Quick Actions</Text>
    <Card style={styles.card}>
      <TouchableOpacity style={styles.row} onPress={onLeave} activeOpacity={0.7}>
        <FileText size={20} color={COLORS.primary} />
        <Text style={styles.rowText}>Leave requests</Text>
        <ChevronRight size={18} color={COLORS.textSecondary} />
      </TouchableOpacity>
      <View style={styles.divider} />
      <TouchableOpacity style={styles.row} onPress={onAttendance} activeOpacity={0.7}>
        <Calendar size={20} color={COLORS.primary} />
        <Text style={styles.rowText}>Attendance history</Text>
        <ChevronRight size={18} color={COLORS.textSecondary} />
      </TouchableOpacity>
      <View style={styles.divider} />
      <TouchableOpacity style={styles.row} onPress={onTeam} activeOpacity={0.7}>
        <Users size={20} color={COLORS.primary} />
        <Text style={styles.rowText}>Team</Text>
        <ChevronRight size={18} color={COLORS.textSecondary} />
      </TouchableOpacity>
    </Card>
  </View>
);

const styles = StyleSheet.create({
  section: { paddingHorizontal: THEME.spacing.lg, marginBottom: THEME.spacing.lg },
  sectionTitle: {
    ...THEME.typography.caption,
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: THEME.spacing.sm,
  },
  card: { paddingVertical: THEME.spacing.xs, borderWidth: 1, borderColor: COLORS.border },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: THEME.spacing.lg,
    paddingHorizontal: THEME.spacing.lg,
    gap: THEME.spacing.md,
  },
  rowText: { ...THEME.typography.body, color: COLORS.textPrimary, flex: 1 },
  divider: { height: 1, backgroundColor: COLORS.border, marginLeft: THEME.spacing.lg + 20 + THEME.spacing.md },
});
