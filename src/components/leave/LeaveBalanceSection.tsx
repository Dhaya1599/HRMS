import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, THEME } from '@constants/colors';
import { CalendarCheck, Briefcase, Plane } from 'lucide-react-native';

interface LeaveBalanceSectionProps {
  casual: { used: number; total: number };
  sick: { used: number; total: number };
  earned: { used: number; total: number };
  onViewPolicy?: () => void;
}

export const LeaveBalanceSection: React.FC<LeaveBalanceSectionProps> = ({
  casual,
  sick,
  earned,
  onViewPolicy,
}) => (
  <View style={styles.section}>
    <View style={styles.header}>
      <Text style={styles.title}>Leave Balance</Text>
      <TouchableOpacity onPress={onViewPolicy}>
        <Text style={styles.action}>View Policy</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.cardsRow}>
      <View style={styles.card}>
        <View style={styles.iconBox}>
          <CalendarCheck size={20} color={COLORS.textPrimary} />
        </View>
        <Text style={styles.balance}>{casual.used}/{casual.total}</Text>
        <Text style={styles.type}>CASUAL</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.iconBox}>
          <Briefcase size={20} color={COLORS.textPrimary} />
        </View>
        <Text style={styles.balance}>{sick.used}/{sick.total}</Text>
        <Text style={styles.type}>SICK</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.iconBox}>
          <Plane size={20} color={COLORS.textPrimary} />
        </View>
        <Text style={styles.balance}>{earned.used}/{earned.total}</Text>
        <Text style={styles.type}>EARNED</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  section: { marginBottom: THEME.spacing.lg },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: THEME.spacing.sm,
  },
  title: { fontSize: 16, fontWeight: '600', color: COLORS.textPrimary },
  action: { fontSize: 13, fontWeight: '600', color: COLORS.primary },
  cardsRow: { flexDirection: 'row', gap: THEME.spacing.sm },
  card: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: THEME.borderRadius.md,
    padding: THEME.spacing.md,
    alignItems: 'center',
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: THEME.spacing.xs,
  },
  balance: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary },
  type: { fontSize: 10, fontWeight: '600', color: COLORS.textPrimary, letterSpacing: 0.5, marginTop: 1 },
});
