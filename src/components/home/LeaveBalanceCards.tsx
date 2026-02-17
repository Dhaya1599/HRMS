import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, THEME } from '../../constants/colors';
import { SectionHeader } from './SectionHeader';

interface LeaveBalanceCardsProps {
  annual: number;
  sick: number;
  casual: number;
  onViewDetails?: () => void;
}

const CONFIG = [
  { key: 'annual' as const, label: 'Annual', valueKey: 'annual' as const, accent: COLORS.leaveAnnual },
  { key: 'sick' as const, label: 'Sick', valueKey: 'sick' as const, accent: COLORS.leaveSick },
  { key: 'casual' as const, label: 'Casual', valueKey: 'casual' as const, accent: COLORS.leaveCasual },
] as const;

export const LeaveBalanceCards: React.FC<LeaveBalanceCardsProps> = ({
  annual,
  sick,
  casual,
  onViewDetails,
}) => {
  const values = { annual, sick, casual };

  return (
    <View style={styles.section}>
      <SectionHeader
        title="Leave balance"
        actionLabel="View details"
        onAction={onViewDetails}
      />
      <View style={styles.cardsRow}>
        {CONFIG.map(({ key, label, valueKey, accent }) => (
          <View key={key} style={styles.card}>
            <Text style={styles.label}>{label}</Text>
            <Text style={[styles.number, { color: accent }]}>
              {values[valueKey]}
            </Text>
            <Text style={styles.sublabel}>days left</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: { marginBottom: THEME.spacing.xl },
  cardsRow: {
    flexDirection: 'row',
    gap: THEME.spacing.sm,
  },
  card: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.md,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    ...THEME.shadows.sm,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textSecondary,
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  number: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  sublabel: {
    fontSize: 10,
    color: COLORS.textTertiary,
    marginTop: 2,
  },
});
