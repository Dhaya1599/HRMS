import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, Users, CalendarCheck, AlertCircle, ChevronRight } from 'lucide-react-native';
import { Card } from '@components/ui/Card';
import { COLORS, THEME } from '@constants/colors';
import { MOCK_MANAGER_DASHBOARD } from '../data/mockData';

export function ManagerDashboardScreen() {
  const navigation = useNavigation();
  const d = MOCK_MANAGER_DASHBOARD;
  const summary = d.teamAttendanceSummary;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ArrowLeft size={22} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Manager Dashboard</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statsRow}>
          <View style={[styles.statCard, styles.statCardPrimary]}>
            <Text style={styles.statValue}>{summary.present}</Text>
            <Text style={styles.statLabel}>Present</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{summary.absent}</Text>
            <Text style={styles.statLabel}>Absent</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{summary.onLeave}</Text>
            <Text style={styles.statLabel}>On Leave</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{summary.late}</Text>
            <Text style={styles.statLabel}>Late</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.linkCard} onPress={() => navigation.navigate('Team' as never)}>
          <Users size={20} color={COLORS.primary} />
          <Text style={styles.linkTitle}>Team attendance</Text>
          <ChevronRight size={20} color={COLORS.textSecondary} />
        </TouchableOpacity>
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>Pending approvals</Text>
          <View style={styles.row}>
            <CalendarCheck size={18} color={COLORS.primary} />
            <Text style={styles.rowText}>Leave requests: {d.pendingLeaveApprovals}</Text>
          </View>
          <View style={styles.row}>
            <CalendarCheck size={18} color={COLORS.primary} />
            <Text style={styles.rowText}>Permissions: {d.pendingPermissionApprovals}</Text>
          </View>
        </Card>
        <Card style={styles.card}>
          <View style={styles.sectionHeader}>
            <AlertCircle size={18} color={COLORS.warning} />
            <Text style={styles.sectionTitle}>Exceptions</Text>
          </View>
          {d.exceptions.map((ex) => (
            <View key={ex.id} style={styles.exceptionRow}>
              <Text style={styles.exceptionName}>{ex.employeeName}</Text>
              <Text style={styles.exceptionType}>{ex.type === 'late_login' ? 'Late login' : 'No punch out'}</Text>
              <Text style={styles.exceptionMeta}>{ex.date}{ex.checkInTime ? ` · ${ex.checkInTime}` : ''}</Text>
            </View>
          ))}
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: THEME.spacing.lg, paddingVertical: THEME.spacing.md, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  backBtn: { marginRight: THEME.spacing.md },
  title: { fontSize: 18, fontWeight: '600', color: COLORS.textPrimary },
  content: { padding: THEME.spacing.lg, paddingBottom: THEME.spacing.xl },
  statsRow: { flexDirection: 'row', gap: THEME.spacing.sm, marginBottom: THEME.spacing.lg },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: THEME.borderRadius.md,
    padding: THEME.spacing.md,
    alignItems: 'center',
  },
  statCardPrimary: { backgroundColor: COLORS.primary },
  statValue: { fontSize: 20, fontWeight: '700', color: COLORS.textPrimary },
  statLabel: { fontSize: 10, color: COLORS.textSecondary, marginTop: 2 },
  linkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: THEME.spacing.md,
    borderRadius: THEME.borderRadius.md,
    marginBottom: THEME.spacing.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  linkTitle: { flex: 1, fontSize: 15, fontWeight: '600', color: COLORS.textPrimary, marginLeft: THEME.spacing.md },
  card: { marginBottom: THEME.spacing.md },
  sectionTitle: { fontSize: 12, fontWeight: '600', color: COLORS.textSecondary, marginBottom: THEME.spacing.sm },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: THEME.spacing.sm, marginBottom: THEME.spacing.sm },
  row: { flexDirection: 'row', alignItems: 'center', gap: THEME.spacing.sm, marginBottom: THEME.spacing.xs },
  rowText: { fontSize: 14, color: COLORS.textPrimary },
  exceptionRow: { marginBottom: THEME.spacing.sm },
  exceptionName: { fontSize: 14, fontWeight: '600', color: COLORS.textPrimary },
  exceptionType: { fontSize: 12, color: COLORS.warning, marginTop: 2 },
  exceptionMeta: { fontSize: 11, color: COLORS.textTertiary, marginTop: 2 },
});
