import React, { useState, useCallback } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '@context/AuthContext';
import { useAttendance } from '@context/AttendanceContext';
import { COLORS, THEME } from '@constants/colors';
import { leaveApi } from '@api/leave';
import { MOCK_HOLIDAYS } from '../data/mockData';
import { MOCK_PROFILE_EXTENDED } from '../data/mockData';
import { HomeHeaderGreeting } from '@components/home/HomeHeaderGreeting';
import { LiveAttendanceCard } from '@components/home/LiveAttendanceCard';
import { LeaveBalanceCards } from '@components/home/LeaveBalanceCards';
import { UpcomingHolidaysList } from '@components/home/UpcomingHolidaysList';
import { SCREEN_PAD } from '@components/ui/ScreenTitle';

export function HomeScreen({ navigation }: { navigation?: { navigate: (name: string) => void } }) {
  const { state: authState } = useAuth();
  const { todayAttendance, refreshAttendance, punchIn, punchOut, punchLoading } = useAttendance();
  const [leaveBalance, setLeaveBalance] = useState<{ sick: number; casual: number; earned: number } | null>(null);
  const [refreshing, setRefreshing] = useState(false);

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
    }, [refreshAttendance, loadLeaveBalance])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([refreshAttendance(), loadLeaveBalance()]).finally(() => setRefreshing(false));
  }, [refreshAttendance, loadLeaveBalance]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />
        }
        showsVerticalScrollIndicator={false}
      >
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

          <LeaveBalanceCards
            annual={leaveBalance?.earned ?? 14}
            sick={leaveBalance?.sick ?? 5}
            onHistory={() => navigation?.navigate('Leave')}
          />

          <UpcomingHolidaysList
            holidays={MOCK_HOLIDAYS}
            onViewCalendar={() => navigation?.navigate('Attendance')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: THEME.spacing.xl },
  content: { paddingHorizontal: SCREEN_PAD },
});
