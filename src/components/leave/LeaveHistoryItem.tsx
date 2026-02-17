import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, THEME } from '@constants/colors';
import { StatusPill } from '@components/ui/StatusPill';
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
  formatDate: (d: string, f: string) => string;
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

export const LeaveHistoryItem: React.FC<LeaveHistoryItemProps> = ({ item, formatDate }) => (
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

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: THEME.borderRadius.md,
    paddingVertical: THEME.spacing.md,
    paddingHorizontal: THEME.spacing.lg,
    marginBottom: THEME.spacing.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.border,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: THEME.spacing.md,
  },
  iconGreen: { backgroundColor: COLORS.approved },
  iconOrange: { backgroundColor: COLORS.primary },
  iconRed: { backgroundColor: COLORS.rejected },
  content: { flex: 1 },
  type: { fontSize: 15, fontWeight: '600', color: COLORS.textPrimary },
  dateRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  calIcon: { marginRight: 4 },
  dates: { fontSize: 12, color: COLORS.textSecondary },
});
