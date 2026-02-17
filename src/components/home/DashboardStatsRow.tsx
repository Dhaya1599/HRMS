import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, THEME } from '@constants/colors';
import { formatDuration } from '@utils/formatters';

export interface NextHolidayItem {
  date: string;
  name: string;
}

interface DashboardStatsRowProps {
  leaveBalance: { sick: number; casual: number; earned: number } | null;
  todayMinutes: number;
  presentDaysThisMonth: number;
  nextHoliday: NextHolidayItem | null;
}

function StatTile({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <View style={styles.tile}>
      <Text style={[styles.value, accent && styles.valueAccent]} numberOfLines={1}>
        {value}
      </Text>
      <Text style={styles.label} numberOfLines={1}>{label}</Text>
    </View>
  );
}

export const DashboardStatsRow: React.FC<DashboardStatsRowProps> = ({
  leaveBalance,
  todayMinutes,
  presentDaysThisMonth,
  nextHoliday,
}) => {
  const leaveStr = leaveBalance
    ? `EL ${leaveBalance.earned}  SL ${leaveBalance.sick}  CL ${leaveBalance.casual}`
    : '—';
  const todayStr = todayMinutes > 0 ? formatDuration(todayMinutes) : '—';
  const nextHolidayStr = nextHoliday
    ? `${new Date(nextHoliday.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} ${nextHoliday.name}`
    : 'None';

  return (
    <View style={styles.row}>
      <StatTile label="Leave balance" value={leaveStr} />
      <StatTile label="Today" value={todayStr} accent />
      <StatTile label="Present (month)" value={String(presentDaysThisMonth)} />
      <StatTile label="Next holiday" value={nextHolidayStr} />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: THEME.spacing.sm,
    gap: THEME.spacing.xs,
  },
  tile: {
    flex: 1,
    minWidth: '47%',
    backgroundColor: COLORS.surface,
    borderRadius: THEME.borderRadius.sm,
    paddingVertical: THEME.spacing.sm,
    paddingHorizontal: THEME.spacing.md,
  },
  value: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  valueAccent: {
    color: COLORS.primary,
    fontSize: 13,
  },
  label: {
    fontSize: 10,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
});
