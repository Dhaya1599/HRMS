import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { COLORS, THEME } from '@constants/colors';
import { useLiveElapsed } from '@hooks/useLiveElapsed';
import { LogOut } from 'lucide-react-native';

interface LiveAttendanceCardProps {
  checkInTime: string | undefined;
  checkOutTime: string | undefined;
  onPunchIn: () => void;
  onPunchOut: () => void;
  loading: boolean;
}

const TARGET_HOURS = 9;
const TARGET_MINUTES = 0;

export const LiveAttendanceCard: React.FC<LiveAttendanceCardProps> = ({
  checkInTime,
  checkOutTime,
  onPunchIn,
  onPunchOut,
  loading,
}) => {
  const isPunchedIn = Boolean(checkInTime && !checkOutTime);
  const elapsed = useLiveElapsed(checkInTime ?? undefined, isPunchedIn);

  const elapsedParts = elapsed.split(':').map(Number);
  const elapsedHours = elapsedParts[0] ?? 0;
  const elapsedMins = (elapsedParts[1] ?? 0) + (elapsedParts[2] ?? 0) / 60;
  const totalElapsedMinutes = elapsedHours * 60 + elapsedMins;
  const targetMinutes = TARGET_HOURS * 60 + TARGET_MINUTES;
  const progressPercent = Math.min(100, Math.round((totalElapsedMinutes / targetMinutes) * 100));

  const shiftStartedText = checkInTime
    ? `Shift started at ${formatTimeForDisplay(checkInTime)}`
    : 'Punch in to start your shift';

  function formatTimeForDisplay(t: string): string {
    const [h, m] = t.split(':').map(Number);
    const hour12 = (h ?? 0) % 12 || 12;
    const ampm = (h ?? 0) >= 12 ? 'PM' : 'AM';
    return `${hour12}:${String(m ?? 0).padStart(2, '0')} ${ampm}`;
  }

  return (
    <View style={styles.card}>
      <Text style={styles.sectionLabel}>LIVE ATTENDANCE</Text>

      {!checkInTime ? (
        <>
          <Text style={styles.timer}>00:00:00</Text>
          <Text style={styles.hrs}>Hrs</Text>
          <Text style={styles.shiftText}>{shiftStartedText}</Text>
          <View style={styles.targetRow}>
            <Text style={styles.targetLabel}>Target: {TARGET_HOURS}h {TARGET_MINUTES}m</Text>
            <Text style={styles.percent}>0%</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: '0%' }]} />
          </View>
          <TouchableOpacity
            style={[styles.punchButton, loading && styles.punchButtonDisabled]}
            onPress={onPunchIn}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color={COLORS.textPrimary} />
            ) : (
              <>
                <LogOut size={20} color={COLORS.textPrimary} style={styles.punchIcon} />
                <Text style={styles.punchButtonText}>Punch In</Text>
              </>
            )}
          </TouchableOpacity>
        </>
      ) : isPunchedIn ? (
        <>
          <View style={styles.timerRow}>
            <Text style={styles.timer}>{elapsed}</Text>
            <Text style={styles.hrs}>Hrs</Text>
          </View>
          <Text style={styles.shiftText}>{shiftStartedText}</Text>
          <View style={styles.targetRow}>
            <Text style={styles.targetLabel}>Target: {TARGET_HOURS}h {TARGET_MINUTES}m</Text>
            <Text style={styles.percent}>{progressPercent}%</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
          </View>
          <TouchableOpacity
            style={[styles.punchButton, loading && styles.punchButtonDisabled]}
            onPress={onPunchOut}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color={COLORS.textPrimary} />
            ) : (
              <>
                <LogOut size={20} color={COLORS.textPrimary} style={styles.punchIcon} />
                <Text style={styles.punchButtonText}>Punch Out</Text>
              </>
            )}
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.timer}>{elapsed}</Text>
          <Text style={styles.hrs}>Hrs</Text>
          <Text style={styles.shiftText}>Shift ended</Text>
          <View style={styles.targetRow}>
            <Text style={styles.targetLabel}>Target: {TARGET_HOURS}h {TARGET_MINUTES}m</Text>
            <Text style={styles.percent}>100%</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: '100%' }]} />
          </View>
          <View style={[styles.punchButton, styles.punchButtonDone]}>
            <Text style={styles.punchButtonText}>Done for today</Text>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: THEME.borderRadius.md,
    padding: THEME.spacing.md,
    marginBottom: THEME.spacing.sm,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.primary,
    letterSpacing: 0.5,
    marginBottom: THEME.spacing.sm,
  },
  timerRow: { flexDirection: 'row', alignItems: 'baseline' },
  timer: {
    fontSize: 30,
    fontWeight: '700',
    color: COLORS.textPrimary,
    letterSpacing: 1,
  },
  hrs: {
    fontSize: 14,
    color: COLORS.textPrimary,
    marginLeft: THEME.spacing.sm,
    fontWeight: '500',
  },
  shiftText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: THEME.spacing.xs,
    marginBottom: THEME.spacing.md,
  },
  targetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: THEME.spacing.xs,
  },
  targetLabel: { fontSize: 11, color: COLORS.textSecondary },
  percent: { fontSize: 11, color: COLORS.textPrimary, fontWeight: '600' },
  progressTrack: {
    height: 5,
    backgroundColor: COLORS.border,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: THEME.spacing.md,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },
  punchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: THEME.spacing.md,
    borderRadius: THEME.borderRadius.md,
  },
  punchButtonDisabled: { opacity: 0.7 },
  punchButtonDone: { backgroundColor: COLORS.success },
  punchIcon: { marginRight: THEME.spacing.sm },
  punchButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
});
