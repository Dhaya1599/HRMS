import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS } from '../constants/colors';
import { attendanceApi, AttendanceRecord } from '../api/attendance';
import { MonthSelector } from '../components/attendance/MonthSelector';
import { MonthYearPickerModal } from '../components/attendance/MonthYearPickerModal';
import { AttendanceRecordDetailModal } from '../components/attendance/AttendanceRecordDetailModal';
import { DailyLogCard, DailyLogRecord } from '../components/attendance/DailyLogCard';
import { ScreenTitle } from '../components/ui/ScreenTitle';
import { styles } from '../styles/screens/AttendanceScreenStyles';
import { Clock, CalendarCheck, AlertCircle, XCircle } from 'lucide-react-native';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function toDailyLog(r: AttendanceRecord): DailyLogRecord {
  const d = new Date(r.date);
  const dayLabel = d
    .toLocaleDateString('en-US', {weekday: 'short'})
    .toUpperCase()
    .slice(0, 3);
  const dateNum = d.getDate().toString();
  const monthShort = d.toLocaleDateString('en-US', {month: 'short'});
  const isAbsent = r.status === 'absent';
  const workedText = isAbsent
    ? 'No Records'
    : `Worked ${Math.floor(r.workingHours ?? 0)}h ${Math.round(
        ((r.workingHours ?? 0) % 1) * 60,
      )}m`;
  const shiftLabel = isAbsent ? 'Mid-week Absent' : 'Regular Shift';
  return {
    id: r.id,
    date: r.date,
    dayLabel,
    dateNum,
    monthShort,
    checkInTime: r.checkInTime ?? '—',
    checkOutTime: r.checkOutTime ?? '—',
    workedText,
    shiftLabel,
    status: r.status,
  };
}

const now = new Date();
const defaultMonth = now.getMonth();
const defaultYear = now.getFullYear();

export function AttendanceScreen() {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [monthIndex, setMonthIndex] = useState(defaultMonth);
  const [year, setYear] = useState(defaultYear);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord | null>(
    null,
  );
  const [detailModalVisible, setDetailModalVisible] = useState(false);

  const loadAttendance = useCallback(async () => {
    try {
      const res = await attendanceApi.getAttendanceHistory(1, 100);
      if (res.success && res.data) setRecords(Array.isArray(res.data) ? res.data : []);
    } catch (_) {}
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadAttendance();
    }, [loadAttendance]),
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadAttendance().finally(() => setRefreshing(false));
  }, [loadAttendance]);

  const filtered = useMemo(() => {
    const list = records.filter(r => {
      const [y, m] = r.date.split('-').map(Number);
      return y === year && m === monthIndex + 1;
    });
    return [...list].sort((a, b) => a.date.localeCompare(b.date));
  }, [records, year, monthIndex]);
  const totalPresent = filtered.filter(r => r.status !== 'absent').length;
  const withHours = filtered.filter(
    r => r.workingHours != null && r.workingHours > 0,
  );
  const totalHours = withHours.reduce((s, r) => s + (r.workingHours ?? 0), 0);
  const avgHours = withHours.length ? totalHours / withHours.length : 0;
  const daysLate = filtered.filter(r => r.status === 'late').length;
  const daysAbsent = filtered.filter(r => r.status === 'absent').length;
  const onTimePct =
    totalPresent > 0
      ? Math.round(((totalPresent - daysLate) / totalPresent) * 100)
      : 0;

  const monthLabel = `${MONTHS[monthIndex]} ${year}`;

  const openRecordDetail = (r: AttendanceRecord) => {
    setSelectedRecord(r);
    setDetailModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenTitle title="Attendance History" />
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.primary}
          />
        }
        showsVerticalScrollIndicator={false}>
        <MonthSelector
          label={monthLabel}
          onPress={() => setPickerVisible(true)}
        />
        <MonthYearPickerModal
          visible={pickerVisible}
          onClose={() => setPickerVisible(false)}
          onSelect={(m, y) => {
            setMonthIndex(m);
            setYear(y);
          }}
          currentMonthIndex={monthIndex}
          currentYear={year}
        />

        <AttendanceRecordDetailModal
          visible={detailModalVisible}
          onClose={() => {
            setDetailModalVisible(false);
            setSelectedRecord(null);
          }}
          record={selectedRecord}
        />

        <View style={styles.summaryGrid}>
          <View style={[styles.summaryCard, styles.summaryCardPrimary]}>
            <CalendarCheck
              size={20}
              color={COLORS.onPrimary}
              style={styles.summaryIcon}
            />
            <Text style={[styles.summaryValue, styles.summaryValueOnPrimary]}>
              {totalPresent}
            </Text>
            <Text style={[styles.summaryLabel, styles.summaryLabelOnPrimary]}>
              Present
            </Text>
          </View>
          <View style={styles.summaryCard}>
            <Clock
              size={20}
              color={COLORS.primary}
              style={styles.summaryIcon}
            />
            <Text style={styles.summaryValue}>{totalHours.toFixed(1)}</Text>
            <Text style={styles.summaryLabel}>Total hrs</Text>
          </View>
          <View style={styles.summaryCard}>
            <Clock
              size={20}
              color={COLORS.textSecondary}
              style={styles.summaryIcon}
            />
            <Text style={styles.summaryValue}>{avgHours.toFixed(1)}h</Text>
            <Text style={styles.summaryLabel}>Avg/day</Text>
          </View>
          <View style={styles.summaryCard}>
            <AlertCircle
              size={20}
              color={COLORS.warning}
              style={styles.summaryIcon}
            />
            <Text style={styles.summaryValue}>{daysLate}</Text>
            <Text style={styles.summaryLabel}>Late</Text>
          </View>
          <View style={styles.summaryCard}>
            <XCircle
              size={20}
              color={COLORS.error}
              style={styles.summaryIcon}
            />
            <Text style={styles.summaryValue}>{daysAbsent}</Text>
            <Text style={styles.summaryLabel}>Absent</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={[styles.summaryValue, styles.summaryValueSmall]}>
              {onTimePct}%
            </Text>
            <Text style={styles.summaryLabel}>On time</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Daily logs</Text>
          <Text style={styles.sectionSub}>
            {filtered.length} record{filtered.length !== 1 ? 's' : ''} · tap for
            details
          </Text>
        </View>

        <View style={styles.logHeader}>
          <Text style={styles.logHeaderDate}>DATE</Text>
          <Text style={styles.logHeaderWorked}>WORKED</Text>
          <Text style={styles.logHeaderStatus}>STATUS</Text>
        </View>

        {filtered.length === 0 ? (
          <View style={styles.emptyLogs}>
            <CalendarCheck
              size={48}
              color={COLORS.textTertiary}
              style={styles.emptyIcon}
            />
            <Text style={styles.emptyTitle}>No records this month</Text>
            <Text style={styles.emptyText}>
              Attendance for {monthLabel} will appear here after you punch
              in/out.
            </Text>
          </View>
        ) : (
          filtered.map(r => (
            <DailyLogCard
              key={r.id}
              item={toDailyLog(r)}
              onPress={() => openRecordDetail(r)}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
