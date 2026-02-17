import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '@constants/colors';
import { styles } from '@styles/components/LeaveBalanceSectionStyles';
import { CalendarDays, Stethoscope, Award } from 'lucide-react-native';

interface LeaveBalanceSectionProps {
  casual: {used: number; total: number};
  sick: {used: number; total: number};
  earned: {used: number; total: number};
  onViewPolicy?: () => void;
}

function BalanceCard({
  used,
  total,
  typeLabel,
  icon: Icon,
}: {
  used: number;
  total: number;
  typeLabel: string;
  icon: React.ElementType;
}) {
  const pct = total > 0 ? Math.min(100, (used / total) * 100) : 0;
  const remaining = total - used;
  return (
    <View style={styles.card}>
      <View style={styles.iconBox}>
        <Icon size={20} color={COLORS.primary} />
      </View>
      <Text style={styles.remaining}>{remaining}</Text>
      <Text style={styles.remainingLabel}>days left</Text>
      <View style={styles.barTrack}>
        <View style={[styles.barFill, {width: `${pct}%`}]} />
      </View>
      <Text style={styles.usedTotal}>
        {used} / {total}
      </Text>
      <Text style={styles.type}>{typeLabel}</Text>
    </View>
  );
}

export const LeaveBalanceSection: React.FC<LeaveBalanceSectionProps> = ({
  casual,
  sick,
  earned,
  onViewPolicy,
}) => (
  <View style={styles.section}>
    <View style={styles.header}>
      <Text style={styles.title}></Text>
      <TouchableOpacity
        onPress={onViewPolicy}
        hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}>
        <Text style={styles.action}>Leave Policy</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.cardsRow}>
      <BalanceCard
        used={casual.used}
        total={casual.total}
        typeLabel="Casual"
        icon={CalendarDays}
      />
      <BalanceCard
        used={sick.used}
        total={sick.total}
        typeLabel="Sick"
        icon={Stethoscope}
      />
      <BalanceCard
        used={earned.used}
        total={earned.total}
        typeLabel="Earned"
        icon={Award}
      />
    </View>
  </View>
);
