import React, {useState, useCallback, useMemo} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useAuth} from '@context/AuthContext';
import {useAttendance} from '@context/AttendanceContext';
import {COLORS, THEME} from '@constants/colors';
import {leaveApi} from '@api/leave';
import {useLiveElapsed} from '@hooks/useLiveElapsed';
import {
  MOCK_HOLIDAYS,
  MOCK_PROFILE_EXTENDED,
  MOCK_DASHBOARD,
  MOCK_LEAVE_BALANCE,
  MOCK_ANNOUNCEMENTS,
} from '../data/mockData';
import {HomeHeaderGreeting} from '@components/home/HomeHeaderGreeting';
import {DashboardStatsRow} from '@components/home/DashboardStatsRow';
import {LiveAttendanceCard} from '@components/home/LiveAttendanceCard';
import {LeaveBalanceCards} from '@components/home/LeaveBalanceCards';
import {UpcomingHolidaysList} from '@components/home/UpcomingHolidaysList';
import {AnnouncementsBlock} from '@components/home/AnnouncementsBlock';
import {SCREEN_PAD} from '@components/ui/ScreenTitle';
import {Megaphone, Bell, Users} from 'lucide-react-native';

export function HomeScreen({
  navigation,
}: {
  navigation?: {navigate: (name: string) => void};
}) {
  const {state: authState} = useAuth();
  const {todayAttendance, refreshAttendance, punchIn, punchOut, punchLoading} =
    useAttendance();
  const [leaveBalance, setLeaveBalance] = useState<{
    sick: number;
    casual: number;
    earned: number;
  } | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const isPunchedIn = Boolean(
    todayAttendance?.checkInTime && !todayAttendance?.checkOutTime,
  );
  const elapsed = useLiveElapsed(
    todayAttendance?.checkInTime ?? undefined,
    isPunchedIn,
  );

  const todayMinutes = useMemo(() => {
    if (
      todayAttendance?.checkOutTime &&
      todayAttendance?.workingHours != null
    ) {
      return Math.round(todayAttendance.workingHours * 60);
    }
    if (isPunchedIn && elapsed) {
      const [h, m, s] = elapsed.split(':').map(Number);
      return (h ?? 0) * 60 + (m ?? 0) + (s ?? 0) / 60;
    }
    return 0;
  }, [
    todayAttendance?.checkOutTime,
    todayAttendance?.workingHours,
    isPunchedIn,
    elapsed,
  ]);

  const nextHoliday = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    const sorted = [...MOCK_HOLIDAYS].sort((a, b) =>
      a.date.localeCompare(b.date),
    );
    return sorted.find(h => h.date >= today) ?? null;
  }, []);

  const effectiveLeaveBalance = leaveBalance ?? MOCK_LEAVE_BALANCE;

  const loadLeaveBalance = useCallback(async () => {
    try {
      const response = await leaveApi.getLeaveBalance();
      if (response.success && response.data) setLeaveBalance(response.data);
    } catch (_) {}
  }, []);

  useFocusEffect(
    useCallback(() => {
      refreshAttendance();
      loadLeaveBalance();
    }, [refreshAttendance, loadLeaveBalance]),
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([refreshAttendance(), loadLeaveBalance()]).finally(() =>
      setRefreshing(false),
    );
  }, [refreshAttendance, loadLeaveBalance]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.primary}
          />
        }
        showsVerticalScrollIndicator={false}>
        <HomeHeaderGreeting
          userName={authState.user?.name ?? ''}
          designation={MOCK_PROFILE_EXTENDED.designation}
          location="HQ Office"
        />

        <View style={styles.content}>
          <LiveAttendanceCard
            checkInTime={todayAttendance?.checkInTime}
            checkOutTime={todayAttendance?.checkOutTime}
            onPunchIn={punchIn}
            onPunchOut={punchOut}
            loading={punchLoading}
          />

          {/* <DashboardStatsRow
            leaveBalance={effectiveLeaveBalance}
            todayMinutes={todayMinutes}
            presentDaysThisMonth={MOCK_DASHBOARD.presentDaysThisMonth}
            nextHoliday={nextHoliday}
          /> */}
          <LeaveBalanceCards
            annual={effectiveLeaveBalance.earned}
            sick={effectiveLeaveBalance.sick}
            onHistory={() => navigation?.navigate('Leave')}
          />

          <AnnouncementsBlock announcements={MOCK_ANNOUNCEMENTS} maxItems={2} />
          {/* <View style={styles.quickLinks}>
            <TouchableOpacity
              style={styles.quickLink}
              onPress={() => navigation?.navigate('Announcements')}>
              <Megaphone size={18} color={COLORS.primary} />
              <Text style={styles.quickLinkText}>Announcements</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickLink}
              onPress={() => navigation?.navigate('Notifications')}>
              <Bell size={18} color={COLORS.primary} />
              <Text style={styles.quickLinkText}>Notifications</Text>
            </TouchableOpacity>
          </View> */}

          {/* <UpcomingHolidaysList
            holidays={MOCK_HOLIDAYS}
            maxItems={3}
            onViewCalendar={() => navigation?.navigate('Attendance')}
          /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLORS.background},
  scroll: {flex: 1},
  scrollContent: {paddingBottom: THEME.spacing.xl},
  content: {paddingHorizontal: SCREEN_PAD, paddingTop: THEME.spacing.xs},
  quickLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: THEME.spacing.sm,
    marginBottom: THEME.spacing.md,
  },
  quickLink: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingVertical: THEME.spacing.sm,
    paddingHorizontal: THEME.spacing.md,
    borderRadius: THEME.borderRadius.sm,
    gap: THEME.spacing.xs,
  },
  quickLinkText: {fontSize: 13, fontWeight: '600', color: COLORS.textPrimary},
});
