import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, THEME } from '@constants/colors';

interface LeaveBalanceCardsProps {
  annual: number;
  sick: number;
  onHistory?: () => void;
}

const MAX_ANNUAL = 18;
const MAX_SICK = 8;

export const LeaveBalanceCards: React.FC<LeaveBalanceCardsProps> = ({
  annual,
  sick,
  onHistory,
}) => {
  const annualPct = Math.min(100, (annual / MAX_ANNUAL) * 100);
  const sickPct = Math.min(100, (sick / MAX_SICK) * 100);

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Leave Balance</Text>
        <TouchableOpacity onPress={onHistory}>
          <Text style={styles.actionLink}>History →</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsRow}>
        <View style={styles.balanceCard}>
          <View style={styles.ringWrapper}>
            <Text style={styles.balanceNumber}>{annual}</Text>
          </View>
          <Text style={styles.balanceLabel}>Annual</Text>
          <Text style={styles.balanceSub}>DAYS REMAINING</Text>
        </View>
        <View style={styles.balanceCard}>
          <View style={styles.ringWrapper}>
            <Text style={styles.balanceNumber}>{sick}</Text>
          </View>
          <Text style={styles.balanceLabel}>Sick Leave</Text>
          <Text style={styles.balanceSub}>DAYS REMAINING</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: { marginBottom: THEME.spacing.md },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: THEME.spacing.sm,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  actionLink: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
  },
  cardsRow: {
    flexDirection: 'row',
    gap: THEME.spacing.md,
  },
  balanceCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: THEME.borderRadius.md,
    padding: THEME.spacing.md,
    alignItems: 'center',
  },
  ringWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: THEME.spacing.xs,
  },
  balanceNumber: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  balanceLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  balanceSub: {
    fontSize: 9,
    color: COLORS.textSecondary,
    letterSpacing: 0.5,
    marginTop: 1,
  },
});
