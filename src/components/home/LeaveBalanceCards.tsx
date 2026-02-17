import React from 'react';
import { View, Text } from 'react-native';
import { COLORS } from '../../constants/colors';
import { SectionHeader } from './SectionHeader';
import { styles } from '../../styles/components/LeaveBalanceCardsStyles';

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
