import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  Alert,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS } from '../constants/colors';
import { LEAVE_TYPE_DISPLAY_NAMES } from '../constants/leave';
import { leaveApi, LeaveRecord } from '../api/leave';
import { MOCK_PERMISSIONS, MOCK_LEAVE_RECORDS } from '../data/mockData';
import { LeaveBalanceSection } from '../components/leave/LeaveBalanceSection';
import { LeaveHistoryItem } from '../components/leave/LeaveHistoryItem';
import { PermissionItem } from '../components/leave/PermissionItem';
import { ApplyLeaveModal } from '../components/leave/ApplyLeaveModal';
import { ApplyPermissionModal, ApplyPermissionPayload } from '../components/leave/ApplyPermissionModal';
import { ScreenTitle } from '../components/ui/ScreenTitle';
import { styles } from '../styles/screens/LeaveScreenStyles';
import { Clock, FileText } from 'lucide-react-native';

export function LeaveScreen() {
  const [leaveRecords, setLeaveRecords] = useState<LeaveRecord[]>([]);
  const [balance, setBalance] = useState<{ sick: number; casual: number; earned: number } | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [applyLeaveModalVisible, setApplyLeaveModalVisible] = useState(false);
  const [permissions, setPermissions] = useState(MOCK_PERMISSIONS);
  const [permissionModalVisible, setPermissionModalVisible] = useState(false);
  const [permissionSubmitLoading, setPermissionSubmitLoading] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const [resRecords, resBalance] = await Promise.all([
        leaveApi.getLeaveRequests(),
        leaveApi.getLeaveBalance(),
      ]);
      if (resRecords.success && resRecords.data) setLeaveRecords(Array.isArray(resRecords.data) ? resRecords.data : []);
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
          setApplyLeaveModalVisible(false);
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

  const effectiveLeaveRecords = useMemo(() => {
    const list = leaveRecords.length > 0 ? leaveRecords : (MOCK_LEAVE_RECORDS as unknown as LeaveRecord[]);
    return [...list].sort((a, b) => a.startDate.localeCompare(b.startDate));
  }, [leaveRecords]);

  const handleApplyPermission = useCallback(async (payload: ApplyPermissionPayload) => {
    setPermissionSubmitLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 400));
      setPermissions((prev) => [
        ...prev,
        {
          id: `perm-${Date.now()}`,
          employeeId: 'demo-1',
          date: payload.date,
          fromTime: payload.fromTime,
          toTime: payload.toTime,
          reason: payload.reason,
          status: 'pending' as const,
          createdAt: new Date().toISOString(),
        },
      ]);
      Alert.alert('Submitted', 'Short permission request submitted.');
    } catch {
      Alert.alert('Error', 'Failed to submit.');
    } finally {
      setPermissionSubmitLoading(false);
    }
  }, []);

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

        <ApplyLeaveModal
          visible={applyLeaveModalVisible}
          onClose={() => setApplyLeaveModalVisible(false)}
          onSubmit={handleApplyLeave}
          loading={submitLoading}
        />

        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <Clock size={18} color={COLORS.primary} style={styles.sectionIcon} />
            <Text style={styles.sectionTitle}>Short permissions</Text>
            <TouchableOpacity onPress={() => setPermissionModalVisible(true)} style={styles.sectionAction}>
              <Text style={styles.sectionActionText}>+ Apply</Text>
            </TouchableOpacity>
          </View>
          {permissions.map((p) => (
            <PermissionItem
              key={p.id}
              item={{
                id: p.id,
                date: p.date,
                fromTime: p.fromTime,
                toTime: p.toTime,
                reason: p.reason,
                status: p.status,
              }}
            />
          ))}
        </View>

        <ApplyPermissionModal
          visible={permissionModalVisible}
          onClose={() => setPermissionModalVisible(false)}
          onSubmit={handleApplyPermission}
          loading={permissionSubmitLoading}
        />

        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <FileText size={18} color={COLORS.primary} style={styles.sectionIcon} />
            <Text style={styles.sectionTitle}>Leave history</Text>
            <TouchableOpacity onPress={() => setApplyLeaveModalVisible(true)} style={styles.sectionAction}>
              <Text style={styles.sectionActionText}>+ Apply</Text>
            </TouchableOpacity>
          </View>
          {effectiveLeaveRecords.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No leave records yet.</Text>
              <Text style={styles.emptySub}>Apply for leave to see history here.</Text>
            </View>
          ) : (
            effectiveLeaveRecords.map((item) => (
              <LeaveHistoryItem
                key={item.id}
                item={{
                  id: item.id,
                  type: LEAVE_TYPE_DISPLAY_NAMES[item.type] ?? item.type,
                  startDate: item.startDate,
                  endDate: item.endDate,
                  status: item.status,
                }}
              />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
