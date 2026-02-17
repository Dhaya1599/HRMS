import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, THEME } from '@constants/colors';
import { Umbrella, Heart, Calendar } from 'lucide-react-native';

interface LeaveBalanceCardsProps {
  annual: number;
  sick: number;
  casual: number;
  onViewDetails?: () => void;
}

export const LeaveBalanceCards: React.FC<LeaveBalanceCardsProps> = ({
  annual,
  sick,
  casual,
  onViewDetails,
}) => (
  <View style={styles.section}>
    <View style={styles.header}>
      <Text style={styles.sectionTitle}>Leave Balance</Text>
      <TouchableOpacity onPress={onViewDetails}>
        <Text style={styles.actionLink}>View Details</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.cardsRow}>
      <View style={[styles.balanceCard, styles.cardAnnual]}>
        <Umbrella size={22} color={COLORS.leaveAnnual} style={styles.cardIcon} />
        <Text style={[styles.balanceNumber, { color: COLORS.leaveAnnual }]}>{annual}</Text>
        <Text style={styles.balanceLabel}>ANNUAL</Text>
      </View>
      <View style={[styles.balanceCard, styles.cardSick]}>
        <Heart size={22} color={COLORS.leaveSick} style={styles.cardIcon} />
        <Text style={[styles.balanceNumber, { color: COLORS.leaveSick }]}>{sick}</Text>
        <Text style={styles.balanceLabel}>SICK</Text>
      </View>
      <View style={[styles.balanceCard, styles.cardCasual]}>
        <Calendar size={22} color={COLORS.leaveCasual} style={styles.cardIcon} />
        <Text style={[styles.balanceNumber, { color: COLORS.leaveCasual }]}>{casual}</Text>
        <Text style={styles.balanceLabel}>CASUAL</Text>
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
    gap: THEME.spacing.sm,
  },
  balanceCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.md,
    alignItems: 'center',
    minHeight: 100,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  cardAnnual: {},
  cardSick: {},
  cardCasual: {},
  cardIcon: { marginBottom: THEME.spacing.xs },
  balanceNumber: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 2,
  },
  balanceLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textSecondary,
    letterSpacing: 0.5,
  },
});
