import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, THEME } from '@constants/colors';
import { attendanceApi, AttendanceRecord } from '@api/attendance';
import { MonthSelector } from '@components/attendance/MonthSelector';
import { DailyLogCard, DailyLogRecord } from '@components/attendance/DailyLogCard';
import { ScreenTitle, SCREEN_PAD } from '@components/ui/ScreenTitle';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function toDailyLog(r: AttendanceRecord): DailyLogRecord {
  const d = new Date(r.date);
  const dayLabel = d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase().slice(0, 3);
  const dateNum = d.getDate().toString();
  const isAbsent = r.status === 'absent';
  const workedText = isAbsent ? 'No Records' : `Worked ${Math.floor((r.workingHours ?? 0))}h ${Math.round(((r.workingHours ?? 0) % 1) * 60)}m`;
  const shiftLabel = isAbsent ? 'Mid-week Absent' : 'Regular Shift';
  return {
    id: r.id,
    date: r.date,
    dayLabel,
    checkInTime: r.checkInTime ?? '—',
    checkOutTime: r.checkOutTime ?? '—',
    workedText,
    shiftLabel,
    status: r.status,
  };
}

export function AttendanceScreen() {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [monthIndex, setMonthIndex] = useState(9);
  const [year, setYear] = useState(2023);

  const loadAttendance = useCallback(async () => {
    try {
      const res = await attendanceApi.getAttendanceHistory(1, 30);
      if (res.success && res.data) setRecords(res.data.records);
    } catch (_) {}
  }, []);

  useFocusEffect(useCallback(() => { loadAttendance(); }, [loadAttendance]));

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadAttendance().finally(() => setRefreshing(false));
  }, [loadAttendance]);

  const filtered = records.filter((r) => {
    const [y, m] = r.date.split('-').map(Number);
    return y === year && m === monthIndex + 1;
  });
  const totalDays = filtered.filter((r) => r.status !== 'absent').length;
  const withHours = filtered.filter((r) => r.workingHours != null && r.workingHours > 0);
  const avgHours = withHours.length
    ? withHours.reduce((s, r) => s + (r.workingHours ?? 0), 0) / withHours.length
    : 0;
  const daysAbsent = filtered.filter((r) => r.status === 'absent').length;

  const monthLabel = `${MONTHS[monthIndex]} ${year}`;

  return (
    <SafeAreaView style={styles.container}>
      <ScreenTitle title="Attendance History" />
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />
        }
        showsVerticalScrollIndicator={false}
      >
        <MonthSelector label={monthLabel} onPress={() => {}} />

        <View style={styles.summaryRow}>
          <View style={[styles.summaryCard, styles.summaryCardOrange]}>
            <Text style={styles.summaryLabel}>TOTAL DAYS</Text>
            <Text style={styles.summaryValue}>{totalDays}</Text>
            <Text style={styles.summaryTrend}>+2% vs last mo</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>AVG. HOURS</Text>
            <Text style={styles.summaryValue}>{avgHours.toFixed(1)}h</Text>
            <Text style={[styles.summaryTrend, styles.trendDown]}>-1% vs last mo</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>ABSENT</Text>
            <Text style={styles.summaryValue}>{daysAbsent}</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Daily Logs</Text>
          <Text style={styles.sectionSub}>{MONTHS[monthIndex]}</Text>
        </View>

        {filtered.map((r) => (
          <DailyLogCard key={r.id} item={toDailyLog(r)} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingHorizontal: SCREEN_PAD, paddingBottom: THEME.spacing.xl },
  summaryRow: { flexDirection: 'row', gap: THEME.spacing.sm, marginBottom: THEME.spacing.lg },
  summaryCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: THEME.borderRadius.md,
    padding: THEME.spacing.md,
  },
  summaryCardOrange: { backgroundColor: COLORS.primary },
  summaryLabel: { fontSize: 9, fontWeight: '600', color: COLORS.textSecondary, letterSpacing: 0.5 },
  summaryValue: { fontSize: 20, fontWeight: '700', color: COLORS.textPrimary, marginTop: 2 },
  summaryTrend: { fontSize: 10, color: COLORS.success, marginTop: 2 },
  trendDown: { color: COLORS.error },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: THEME.spacing.sm,
  },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: COLORS.textPrimary },
  sectionSub: { fontSize: 13, color: COLORS.textSecondary },
});
