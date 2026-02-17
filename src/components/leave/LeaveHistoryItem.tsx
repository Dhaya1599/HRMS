import React from 'react';
import { View, Text } from 'react-native';
import { COLORS } from '@constants/colors';
import { StatusPill } from '@components/ui/StatusPill';
import { styles } from '@styles/components/LeaveHistoryItemStyles';
import { formatDate } from '@utils/formatters';
import { Check, Clock, X, Calendar } from 'lucide-react-native';

export interface LeaveHistoryRecord {
  id: string;
  type: string;
  startDate: string;
  endDate: string;
  status: string;
}

interface LeaveHistoryItemProps {
  item: LeaveHistoryRecord;
}

function statusVariant(s: string): 'approved' | 'pending' | 'rejected' {
  if (s === 'approved') return 'approved';
  if (s === 'rejected') return 'rejected';
  return 'pending';
}

function StatusIcon({ status }: { status: string }) {
  if (status === 'approved') return <View style={[styles.iconCircle, styles.iconGreen]}><Check size={12} color="#fff" strokeWidth={3} /></View>;
  if (status === 'rejected') return <View style={[styles.iconCircle, styles.iconRed]}><X size={12} color="#fff" strokeWidth={3} /></View>;
  return <View style={[styles.iconCircle, styles.iconOrange]}><Clock size={12} color="#fff" /></View>;
}

function getBorderColor(status: string) {
  if (status === 'approved') return COLORS.approved;
  if (status === 'rejected') return COLORS.rejected;
  return COLORS.primary;
}

export const LeaveHistoryItem: React.FC<LeaveHistoryItemProps> = ({ item }) => (
  <View style={[styles.row, { borderLeftColor: getBorderColor(item.status) }]}>
    <StatusIcon status={item.status} />
    <View style={styles.content}>
      <Text style={styles.type}>{item.type}</Text>
      <View style={styles.dateRow}>
        <Calendar size={12} color={COLORS.textTertiary} style={styles.calIcon} />
        <Text style={styles.dates}>
          {formatDate(item.startDate, 'MMM dd')} – {formatDate(item.endDate, 'MMM dd, yyyy')}
        </Text>
      </View>
    </View>
    <StatusPill label={item.status} variant={statusVariant(item.status)} />
  </View>
);
