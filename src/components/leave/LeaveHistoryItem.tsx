import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, THEME } from '@constants/colors';
import { StatusPill } from '@components/ui/StatusPill';
import { Check, Clock, X } from 'lucide-react-native';

export interface LeaveHistoryRecord {
  id: string;
  type: string;
  startDate: string;
  endDate: string;
  status: string;
}

interface LeaveHistoryItemProps {
  item: LeaveHistoryRecord;
  formatDate: (d: string, f: string) => string;
}

function statusVariant(s: string): 'approved' | 'pending' | 'rejected' {
  if (s === 'approved') return 'approved';
  if (s === 'rejected') return 'rejected';
  return 'pending';
}

function StatusIcon({ status }: { status: string }) {
  if (status === 'approved') return <View style={[styles.iconCircle, styles.iconGreen]}><Check size={14} color="#fff" strokeWidth={3} /></View>;
  if (status === 'rejected') return <View style={[styles.iconCircle, styles.iconRed]}><X size={14} color="#fff" strokeWidth={3} /></View>;
  return <View style={[styles.iconCircle, styles.iconOrange]}><Clock size={14} color="#fff" /></View>;
}

export const LeaveHistoryItem: React.FC<LeaveHistoryItemProps> = ({ item, formatDate }) => (
  <View style={styles.row}>
    <StatusIcon status={item.status} />
    <View style={styles.content}>
      <Text style={styles.type}>{item.type}</Text>
      <Text style={styles.dates}>
        {formatDate(item.startDate, 'MMM dd')} - {formatDate(item.endDate, 'MMM dd, yyyy')}
      </Text>
    </View>
    <StatusPill label={item.status} variant={statusVariant(item.status)} />
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: THEME.borderRadius.md,
    padding: THEME.spacing.md,
    marginBottom: THEME.spacing.xs,
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: THEME.spacing.sm,
  },
  iconGreen: { backgroundColor: COLORS.approved },
  iconOrange: { backgroundColor: COLORS.primary },
  iconRed: { backgroundColor: COLORS.rejected },
  content: { flex: 1 },
  type: { fontSize: 14, fontWeight: '600', color: COLORS.textPrimary },
  dates: { fontSize: 12, color: COLORS.textSecondary, marginTop: 1 },
});
