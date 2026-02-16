import React, { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView, Text, RefreshControl, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '@context/AuthContext';
import { Card } from '@components/ui/Card';
import { Loading } from '@components/ui/Loading';
import { Badge } from '@components/ui/Badge';
import { COLORS, THEME } from '@constants/colors';
import { teamApi, TeamMember } from '@api/team';
import { formatTime } from '@utils/formatters';
import { Clock, User, Building } from 'lucide-react-native';

function getStatusLabel(status?: string): string {
  if (status === 'in') return 'In';
  if (status === 'out') return 'Out';
  if (status === 'on_leave') return 'On Leave';
  return 'Unknown';
}

function getStatusVariant(status?: string): 'success' | 'warning' | 'error' | 'info' | 'default' {
  if (status === 'in') return 'success';
  if (status === 'out') return 'default';
  if (status === 'on_leave') return 'warning';
  return 'default';
}

export function TeamScreen() {
  const { state: authState } = useAuth();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadTeamMembers = useCallback(async () => {
    try {
      const response = await teamApi.getTeamMembers();
      if (response.success && response.data) setMembers(response.data.members);
    } catch (error) {
      Alert.alert('Error', 'Failed to load team members');
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (authState.user?.role === 'manager') loadTeamMembers();
      else setLoading(false);
    }, [authState.user?.role, loadTeamMembers])
  );

  const onRefresh = useCallback(() => { setRefreshing(true); loadTeamMembers(); }, [loadTeamMembers]);

  const renderItem = ({ item }: { item: TeamMember }) => (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={styles.memberInfo}>
          <View style={styles.avatar}>
            <User size={24} color={COLORS.primary} />
          </View>
          <View style={styles.details}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.employeeId}>{item.employeeId}</Text>
          </View>
        </View>
        <Badge label={getStatusLabel(item.currentStatus)} variant={getStatusVariant(item.currentStatus)} />
      </View>
      <View style={styles.department}>
        <Building size={14} color={COLORS.textSecondary} />
        <Text style={styles.departmentText}>{item.department}</Text>
      </View>
      {(item as TeamMember & { approvedWorkLocation?: string }).approvedWorkLocation && (
        <View style={styles.locationRow}>
          <Building size={14} color={COLORS.primary} />
          <Text style={styles.locationText}>{(item as TeamMember & { approvedWorkLocation?: string }).approvedWorkLocation}</Text>
        </View>
      )}
      {item.currentStatus === 'in' && item.lastCheckIn && (
        <View style={styles.timeRow}>
          <Clock size={14} color={COLORS.textSecondary} />
          <Text style={styles.timeText}>Check in at {formatTime(item.lastCheckIn)}</Text>
        </View>
      )}
    </Card>
  );

  if (authState.user?.role !== 'manager') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Team view is available for managers only.</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (loading && members.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Loading fullScreen message="Loading team..." />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={members}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={members.length === 0 ? styles.emptyContainer : styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyText}>No team members.</Text>}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  listContent: { padding: THEME.spacing.lg, paddingBottom: THEME.spacing.xxl },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: THEME.spacing.xl },
  emptyText: { ...THEME.typography.body, color: COLORS.textSecondary, textAlign: 'center' },
  card: { marginBottom: THEME.spacing.md },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: THEME.spacing.sm },
  memberInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.surfaceVariant, justifyContent: 'center', alignItems: 'center', marginRight: THEME.spacing.md },
  details: { flex: 1 },
  name: { ...THEME.typography.body, color: COLORS.textPrimary, fontWeight: '600' },
  employeeId: { ...THEME.typography.caption, color: COLORS.textSecondary, marginTop: 2 },
  department: { flexDirection: 'row', alignItems: 'center', gap: THEME.spacing.sm, marginTop: THEME.spacing.sm },
  departmentText: { ...THEME.typography.bodySmall, color: COLORS.textSecondary },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: THEME.spacing.sm, marginTop: THEME.spacing.sm },
  locationText: { ...THEME.typography.caption, color: COLORS.primary, flex: 1 },
  timeRow: { flexDirection: 'row', alignItems: 'center', gap: THEME.spacing.sm, marginTop: THEME.spacing.xs },
  timeText: { ...THEME.typography.caption, color: COLORS.textSecondary },
});
