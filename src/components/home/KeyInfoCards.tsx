import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from '@components/ui/Card';
import { COLORS, THEME } from '@constants/colors';
import { User, Clock, FileText, ChevronRight } from 'lucide-react-native';
import { formatDuration } from '@utils/formatters';

interface KeyInfoCardsProps {
  todayHoursMinutes: number;
  todayStatus: string;
  leaveBalance: { sick: number; casual: number; earned: number } | null;
  onProfile: () => void;
  onLeave: () => void;
}

export const KeyInfoCards: React.FC<KeyInfoCardsProps> = ({
  todayHoursMinutes,
  todayStatus,
  leaveBalance,
  onProfile,
  onLeave,
}) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Key Information</Text>
    <TouchableOpacity style={styles.infoCard} onPress={onProfile} activeOpacity={0.8}>
      <View style={styles.infoCardLeft}>
        <View style={[styles.infoCardIcon, { backgroundColor: COLORS.surfaceVariant }]}>
          <User size={22} color={COLORS.primary} />
        </View>
        <View>
          <Text style={styles.infoCardTitle}>My Profile</Text>
          <Text style={styles.infoCardSub}>View & edit profile, employment details</Text>
        </View>
      </View>
      <ChevronRight size={20} color={COLORS.textSecondary} />
    </TouchableOpacity>

    <Card style={styles.infoCardWrap}>
      <View style={styles.infoCardLeft}>
        <View style={[styles.infoCardIcon, { backgroundColor: COLORS.surfaceVariant }]}>
          <Clock size={22} color={COLORS.primary} />
        </View>
        <View style={styles.infoCardContent}>
          <Text style={styles.infoCardTitle}>My Attendance</Text>
          <Text style={styles.infoCardSub}>
            {todayHoursMinutes > 0 ? formatDuration(todayHoursMinutes) : '--'} today · {todayStatus}
          </Text>
        </View>
      </View>
    </Card>

    <TouchableOpacity style={styles.infoCard} onPress={onLeave} activeOpacity={0.8}>
      <View style={styles.infoCardLeft}>
        <View style={[styles.infoCardIcon, { backgroundColor: COLORS.surfaceVariant }]}>
          <FileText size={22} color={COLORS.primary} />
        </View>
        <View>
          <Text style={styles.infoCardTitle}>Leave Application</Text>
          <Text style={styles.infoCardSub}>
            Balance: SL {leaveBalance?.sick ?? 0} · CL {leaveBalance?.casual ?? 0} · EL {leaveBalance?.earned ?? 0}
          </Text>
        </View>
      </View>
      <ChevronRight size={20} color={COLORS.textSecondary} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  section: { paddingHorizontal: THEME.spacing.lg, marginBottom: THEME.spacing.lg },
  sectionTitle: {
    ...THEME.typography.caption,
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: THEME.spacing.sm,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surface,
    padding: THEME.spacing.lg,
    borderRadius: THEME.borderRadius.lg,
    marginBottom: THEME.spacing.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  infoCardWrap: { padding: THEME.spacing.lg, marginBottom: THEME.spacing.sm, borderWidth: 1, borderColor: COLORS.border },
  infoCardLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  infoCardIcon: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginRight: THEME.spacing.md },
  infoCardContent: { flex: 1 },
  infoCardTitle: { ...THEME.typography.body, fontWeight: '600', color: COLORS.textPrimary },
  infoCardSub: { ...THEME.typography.caption, color: COLORS.textSecondary, marginTop: 2 },
});
