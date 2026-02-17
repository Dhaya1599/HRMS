import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS, THEME} from '@constants/colors';
import {CalendarDays, Stethoscope, Award} from 'lucide-react-native';

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

const styles = StyleSheet.create({
  section: {marginBottom: THEME.spacing.xl},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: THEME.spacing.md,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textSecondary,
    letterSpacing: 0.5,
  },
  action: {fontSize: 12, fontWeight: '600', color: COLORS.primary},
  cardsRow: {flexDirection: 'row', gap: THEME.spacing.sm},
  card: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: THEME.borderRadius.md,
    padding: THEME.spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: THEME.borderRadius.sm,
    backgroundColor: COLORS.surfaceVariant,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: THEME.spacing.sm,
  },
  remaining: {fontSize: 22, fontWeight: '700', color: COLORS.textPrimary},
  remainingLabel: {
    fontSize: 9,
    fontWeight: '600',
    color: COLORS.textTertiary,
    marginTop: 0,
    letterSpacing: 0.3,
  },
  barTrack: {
    height: 4,
    width: '100%',
    backgroundColor: COLORS.border,
    borderRadius: 2,
    marginTop: THEME.spacing.sm,
    overflow: 'hidden',
  },
  barFill: {height: '100%', backgroundColor: COLORS.primary, borderRadius: 2},
  usedTotal: {
    fontSize: 10,
    color: COLORS.textTertiary,
    marginTop: THEME.spacing.xs,
  },
  type: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textSecondary,
    letterSpacing: 0.3,
    marginTop: 1,
  },
});
