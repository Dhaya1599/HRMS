import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, THEME } from '@constants/colors';
import { StatusPill } from '@components/ui/StatusPill';
import { formatDate } from '@utils/formatters';
import { Clock } from 'lucide-react-native';

export interface PermissionRecord {
  id: string;
  date: string;
  fromTime: string;
  toTime: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
}

interface PermissionItemProps {
  item: PermissionRecord;
}

const statusVariant: Record<string, 'approved' | 'pending' | 'rejected'> = {
  approved: 'approved',
  pending: 'pending',
  rejected: 'rejected',
};

export const PermissionItem: React.FC<PermissionItemProps> = ({ item }) => (
  <View style={styles.card}>
    <View style={styles.row}>
      <View style={styles.dateBlock}>
        <Text style={styles.dateDay}>{formatDate(item.date, 'dd')}</Text>
        <Text style={styles.dateMonth}>{formatDate(item.date, 'MMM')}</Text>
      </View>
      <View style={styles.main}>
        <View style={styles.timeRow}>
          <Clock size={14} color={COLORS.textSecondary} />
          <Text style={styles.time}>{item.fromTime} – {item.toTime}</Text>
        </View>
        <Text style={styles.reason} numberOfLines={1}>{item.reason}</Text>
      </View>
      <StatusPill label={item.status} variant={statusVariant[item.status] ?? 'pending'} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: THEME.borderRadius.md,
    padding: THEME.spacing.md,
    marginBottom: THEME.spacing.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  dateBlock: {
    width: 44,
    alignItems: 'center',
    marginRight: THEME.spacing.md,
    paddingVertical: THEME.spacing.xs,
    paddingHorizontal: THEME.spacing.sm,
    backgroundColor: COLORS.surfaceVariant,
    borderRadius: THEME.borderRadius.sm,
  },
  dateDay: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary },
  dateMonth: { fontSize: 10, fontWeight: '600', color: COLORS.textTertiary },
  main: { flex: 1 },
  timeRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 2 },
  time: { fontSize: 13, fontWeight: '600', color: COLORS.textPrimary },
  reason: { fontSize: 12, color: COLORS.textSecondary },
});
