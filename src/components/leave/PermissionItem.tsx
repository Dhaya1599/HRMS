import React from 'react';
import { View, Text } from 'react-native';
import { COLORS } from '@constants/colors';
import { StatusPill } from '@components/ui/StatusPill';
import { styles } from '@styles/components/PermissionItemStyles';
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
