import React, { useState, useCallback } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, THEME } from '@constants/colors';
import { leaveApi, LeaveRecord } from '@api/leave';
import { formatDate } from '@utils/formatters';
import { LeaveBalanceSection } from '@components/leave/LeaveBalanceSection';
import { ApplyLeaveForm } from '@components/leave/ApplyLeaveForm';
import { LeaveHistoryItem } from '@components/leave/LeaveHistoryItem';
import { SectionHeader } from '@components/ui/SectionHeader';
import { ScreenTitle, SCREEN_PAD } from '@components/ui/ScreenTitle';

const LEAVE_TYPE_LABELS: Record<string, string> = {
  sick: 'Sick Leave',
  casual: 'Casual Leave',
  earned: 'Earned Leave',
};

export function LeaveScreen() {
  const [leaveRecords, setLeaveRecords] = useState<LeaveRecord[]>([]);
  const [balance, setBalance] = useState<{ sick: number; casual: number; earned: number } | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const [resRecords, resBalance] = await Promise.all([
        leaveApi.getLeaveRequests(),
        leaveApi.getLeaveBalance(),
      ]);
      if (resRecords.success && resRecords.data) setLeaveRecords(resRecords.data.records);
      if (resBalance.success && resBalance.data) setBalance(resBalance.data);
    } catch (_) {}
  }, []);

  useFocusEffect(useCallback(() => { loadData(); }, [loadData]));

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadData().finally(() => setRefreshing(false));
  }, [loadData]);

  const handleApplyLeave = useCallback(
    async (payload: { type: string; startDate: string; endDate: string; reason: string }) => {
      setSubmitLoading(true);
      try {
        const typeKey = payload.type.toLowerCase().includes('sick') ? 'sick' : payload.type.toLowerCase().includes('casual') ? 'casual' : 'earned';
        const res = await leaveApi.applyLeave({
          type: typeKey,
          startDate: payload.startDate,
          endDate: payload.endDate,
          reason: payload.reason,
        });
        if (res.success) {
          Alert.alert('Submitted', 'Leave application submitted successfully.');
          loadData();
        }
      } catch (_) {
        Alert.alert('Error', 'Failed to submit leave.');
      } finally {
        setSubmitLoading(false);
      }
    },
    [loadData]
  );

  const b = balance ?? { sick: 5, casual: 10, earned: 14 };
  const casualTotal = 12;
  const sickTotal = 8;
  const earnedTotal = 20;

  return (
    <SafeAreaView style={styles.container}>
      <ScreenTitle title="Leave Management" />
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />
        }
        showsVerticalScrollIndicator={false}
      >
        <LeaveBalanceSection
          casual={{ used: casualTotal - b.casual, total: casualTotal }}
          sick={{ used: sickTotal - b.sick, total: sickTotal }}
          earned={{ used: earnedTotal - b.earned, total: earnedTotal }}
          onViewPolicy={() => Alert.alert('Policy', 'Leave policy details — mock.')}
        />

        <ApplyLeaveForm onSubmit={handleApplyLeave} loading={submitLoading} />

        <SectionHeader title="Leave History" actionLabel="View All" onAction={() => {}} />
        {leaveRecords.map((item) => (
          <LeaveHistoryItem
            key={item.id}
            item={{
              id: item.id,
              type: LEAVE_TYPE_LABELS[item.type] ?? item.type,
              startDate: item.startDate,
              endDate: item.endDate,
              status: item.status,
            }}
            formatDate={formatDate}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingHorizontal: SCREEN_PAD, paddingBottom: THEME.spacing.xl },
});
