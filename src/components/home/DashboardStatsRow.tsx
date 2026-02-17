import React from 'react';
import { View, Text } from 'react-native';
import { COLORS } from '@constants/colors';
import { styles } from '@styles/components/DashboardStatsRowStyles';
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
