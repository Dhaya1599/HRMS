import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Modal } from '@components/ui/Modal';
import { COLORS, THEME } from '@constants/colors';
import { Calendar, Clock, MapPin, CheckCircle, AlertCircle, XCircle } from 'lucide-react-native';
import type { AttendanceRecord } from '@api/attendance';
import { formatDate } from '@utils/formatters';

function formatTime(t: string): string {
  if (!t || t === '—') return '—';
  const [h, m] = t.split(':').map(Number);
  const hour12 = (h ?? 0) % 12 || 12;
  const ampm = (h ?? 0) >= 12 ? 'PM' : 'AM';
  return `${hour12}:${String(m ?? 0).padStart(2, '0')} ${ampm}`;
}

function getStatusInfo(status: string) {
  if (status === 'present') return { label: 'On time', icon: CheckCircle, color: COLORS.approved };
  if (status === 'late') return { label: 'Late', icon: AlertCircle, color: COLORS.warning };
  if (status === 'half_day') return { label: 'Half day', icon: Clock, color: COLORS.primary };
  return { label: 'Absent', icon: XCircle, color: COLORS.error };
}

interface AttendanceRecordDetailModalProps {
  visible: boolean;
  onClose: () => void;
  record: AttendanceRecord | null;
}

export const AttendanceRecordDetailModal: React.FC<AttendanceRecordDetailModalProps> = ({
  visible,
  onClose,
  record,
}) => {
  if (!record) return null;

  const d = new Date(record.date);
  const dayLabel = d.toLocaleDateString('en-US', { weekday: 'long' });
  const dateFormatted = formatDate(record.date, 'MMMM dd, yyyy');
  const workedHours = record.workingHours != null && record.workingHours > 0
    ? `${Math.floor(record.workingHours)}h ${Math.round((record.workingHours % 1) * 60)}m`
    : '—';
  const statusInfo = getStatusInfo(record.status);
  const StatusIcon = statusInfo.icon;

  return (
    <Modal visible={visible} onClose={onClose} title="Record details" scrollable={false}>
      <View style={styles.row}>
        <Calendar size={18} color={COLORS.primary} />
        <View style={styles.labelValue}>
          <Text style={styles.label}>Date</Text>
          <Text style={styles.value}>{dateFormatted}</Text>
          <Text style={styles.sub}>{dayLabel}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <StatusIcon size={18} color={statusInfo.color} />
        <View style={styles.labelValue}>
          <Text style={styles.label}>Status</Text>
          <Text style={[styles.value, { color: statusInfo.color }]}>{statusInfo.label}</Text>
        </View>
      </View>
      {record.status !== 'absent' && (
        <>
          <View style={styles.row}>
            <Clock size={18} color={COLORS.textSecondary} />
            <View style={styles.labelValue}>
              <Text style={styles.label}>Punch in</Text>
              <Text style={styles.value}>{formatTime(record.checkInTime ?? '—')}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <Clock size={18} color={COLORS.textSecondary} />
            <View style={styles.labelValue}>
              <Text style={styles.label}>Punch out</Text>
              <Text style={styles.value}>{formatTime(record.checkOutTime ?? '—')}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <Clock size={18} color={COLORS.primary} />
            <View style={styles.labelValue}>
              <Text style={styles.label}>Worked</Text>
              <Text style={styles.value}>{workedHours}</Text>
            </View>
          </View>
        </>
      )}
      <View style={styles.row}>
        <MapPin size={18} color={COLORS.textSecondary} />
        <View style={styles.labelValue}>
          <Text style={styles.label}>Location</Text>
          <Text style={styles.value}>
            {record.checkInLocation?.latitude ? 'HQ Office' : '—'}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: THEME.spacing.lg,
  },
  labelValue: { flex: 1, marginLeft: THEME.spacing.md },
  label: { fontSize: 11, fontWeight: '600', color: COLORS.textTertiary, letterSpacing: 0.3, marginBottom: 2 },
  value: { fontSize: 15, fontWeight: '600', color: COLORS.textPrimary },
  sub: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
});
