import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, THEME } from '@constants/colors';
import { StatusPill } from '@components/ui/StatusPill';
import { ArrowRight, ArrowLeft } from 'lucide-react-native';

type StatusVariant = 'onTime' | 'late' | 'absent';

function getStatusVariant(s: string): StatusVariant {
  if (s === 'late') return 'late';
  if (s === 'absent') return 'absent';
  return 'onTime';
}

function formatTime(t: string): string {
  if (!t || t === '—') return '—';
  const [h, m] = t.split(':').map(Number);
  const hour12 = (h ?? 0) % 12 || 12;
  const ampm = (h ?? 0) >= 12 ? 'PM' : 'AM';
  return `${hour12}:${String(m ?? 0).padStart(2, '0')} ${ampm}`;
}

export interface DailyLogRecord {
  id: string;
  date: string;
  dayLabel: string;
  checkInTime: string;
  checkOutTime: string;
  workedText: string;
  shiftLabel: string;
  status: string;
}

interface DailyLogCardProps {
  item: DailyLogRecord;
}

export const DailyLogCard: React.FC<DailyLogCardProps> = ({ item }) => {
  const isAbsent = item.status === 'absent';
  const variant = getStatusVariant(item.status);
  const dateBlockHighlight = variant === 'onTime' || variant === 'late';

  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <View style={[styles.dateBlock, dateBlockHighlight && styles.dateBlockOrange]}>
          <Text style={styles.dayLabel}>{item.dayLabel}</Text>
          <Text style={styles.dateNum}>{item.date}</Text>
        </View>
        <View style={styles.main}>
          <Text style={styles.worked}>{item.workedText}</Text>
          <Text style={styles.shift}>{item.shiftLabel}</Text>
        </View>
        <StatusPill
          label={variant === 'onTime' ? 'ON TIME' : variant === 'late' ? 'LATE' : 'ABSENT'}
          variant={variant}
        />
      </View>
      {!isAbsent && (
        <View style={styles.punchRow}>
          <View style={styles.punchCol}>
            <Text style={styles.punchLabel}>PUNCH IN</Text>
            <View style={styles.punchTimeRow}>
              <ArrowRight size={14} color={COLORS.textSecondary} />
              <Text style={styles.punchTime}>{formatTime(item.checkInTime)}</Text>
            </View>
          </View>
          <View style={styles.punchCol}>
            <Text style={styles.punchLabel}>PUNCH OUT</Text>
            <View style={[styles.punchTimeRow, styles.punchTimeRowEnd]}>
              <Text style={styles.punchTime}>{formatTime(item.checkOutTime)}</Text>
              <ArrowLeft size={14} color={COLORS.textSecondary} />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: THEME.borderRadius.md,
    padding: THEME.spacing.md,
    marginBottom: THEME.spacing.sm,
  },
  top: { flexDirection: 'row', alignItems: 'center', marginBottom: THEME.spacing.sm },
  dateBlock: {
    width: 46,
    alignItems: 'center',
    marginRight: THEME.spacing.md,
    paddingVertical: THEME.spacing.xs,
    borderRadius: THEME.borderRadius.sm,
    backgroundColor: COLORS.surface,
  },
  dateBlockOrange: { backgroundColor: COLORS.surfaceVariant },
  dayLabel: { fontSize: 10, fontWeight: '600', color: COLORS.textSecondary, letterSpacing: 0.5 },
  dateNum: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary },
  main: { flex: 1 },
  worked: { fontSize: 14, fontWeight: '700', color: COLORS.textPrimary },
  shift: { fontSize: 12, color: COLORS.textSecondary, marginTop: 1 },
  punchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: THEME.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  punchCol: {},
  punchLabel: { fontSize: 9, fontWeight: '600', color: COLORS.textSecondary, letterSpacing: 0.5, marginBottom: 2 },
  punchTimeRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  punchTimeRowEnd: { justifyContent: 'flex-end' },
  punchTime: { fontSize: 13, fontWeight: '600', color: COLORS.textPrimary },
});
