import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { COLORS, THEME } from '@constants/colors';
import { useAttendance } from '@context/AttendanceContext';
import { LogIn, LogOut, CheckCircle } from 'lucide-react-native';

export const PunchNavButton: React.FC = () => {
  const { todayAttendance, punchLoading, punchIn, punchOut } = useAttendance();

  const hasCheckedIn = todayAttendance?.hasCheckedIn ?? false;
  const hasCheckedOut = todayAttendance?.checkOutTime != null && todayAttendance.checkOutTime !== '';

  if (punchLoading) {
    return (
      <View style={styles.wrap}>
        <ActivityIndicator size="small" color={COLORS.primary} />
      </View>
    );
  }

  if (hasCheckedOut) {
    return (
      <View style={[styles.wrap, styles.doneWrap]}>
        <CheckCircle size={18} color={COLORS.success} />
        <Text style={styles.doneText}>Done</Text>
      </View>
    );
  }

  if (hasCheckedIn) {
    return (
      <TouchableOpacity style={[styles.wrap, styles.punchOut]} onPress={punchOut} activeOpacity={0.8}>
        <LogOut size={18} color={COLORS.background} />
        <Text style={styles.punchOutText}>Punch Out</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={[styles.wrap, styles.punchIn]} onPress={punchIn} activeOpacity={0.8}>
      <LogIn size={18} color={COLORS.background} />
      <Text style={styles.punchInText}>Punch In</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: THEME.spacing.sm,
    paddingHorizontal: THEME.spacing.md,
    borderRadius: THEME.borderRadius.lg,
    gap: 6,
  },
  punchIn: {
    backgroundColor: COLORS.success,
  },
  punchOut: {
    backgroundColor: COLORS.warning,
  },
  doneWrap: {
    backgroundColor: COLORS.surfaceVariant,
    paddingRight: THEME.spacing.md,
  },
  punchInText: { fontSize: 13, fontWeight: '700', color: COLORS.background },
  punchOutText: { fontSize: 13, fontWeight: '700', color: COLORS.background },
  doneText: { fontSize: 13, fontWeight: '600', color: COLORS.success },
});
