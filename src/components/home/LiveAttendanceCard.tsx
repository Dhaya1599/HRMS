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

function formatTimeForDisplay(t: string): string {
  const [h, m] = t.split(':').map(Number);
  const hour12 = (h ?? 0) % 12 || 12;
  const ampm = (h ?? 0) >= 12 ? 'PM' : 'AM';
  return `${hour12}:${String(m ?? 0).padStart(2, '0')} ${ampm}`;
}

function formatHoursMinutes(hours: number): string {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return `${h}h ${m}m`;
}

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
  const elapsedHours = (elapsedParts[0] ?? 0) + (elapsedParts[1] ?? 0) / 60 + (elapsedParts[2] ?? 0) / 3600;
  const todayHours = isPunchedIn ? elapsedHours : (checkInTime && checkOutTime ? 6.75 : 0);
  const weeklyAvg = 8.2;

  return (
    <View style={styles.card}>
      <Text style={styles.sectionLabel}>Attendance Status</Text>

      {!checkInTime ? (
        <>
          <Text style={styles.shiftText}>Punch in to start your shift</Text>
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Today's Hours</Text>
              <Text style={[styles.statValue, { color: COLORS.info }]}>0h 0m</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Weekly Avg</Text>
              <Text style={styles.statValueGrey}>{formatHoursMinutes(weeklyAvg)}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={[styles.punchButton, loading && styles.punchButtonDisabled]}
            onPress={onPunchIn}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color={COLORS.onPrimary} />
            ) : (
              <>
                <LogOut size={20} color={COLORS.onPrimary} style={styles.punchIcon} />
                <Text style={styles.punchButtonText}>Punch In</Text>
              </>
            )}
          </TouchableOpacity>
        </>
      ) : isPunchedIn ? (
        <>
          <View style={styles.statusRow}>
            <View style={styles.clockedInRow}>
              <View style={styles.greenDot} />
              <Text style={styles.clockedInText}>Clocked In</Text>
            </View>
            <View style={styles.entryTimeBlock}>
              <Text style={styles.entryTime}>{formatTimeForDisplay(checkInTime)}</Text>
              <Text style={styles.entryLabel}>Entry Time</Text>
            </View>
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Today's Hours</Text>
              <Text style={[styles.statValue, { color: COLORS.info }]}>{formatHoursMinutes(todayHours)}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Weekly Avg</Text>
              <Text style={styles.statValueGrey}>{formatHoursMinutes(weeklyAvg)}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={[styles.punchButton, loading && styles.punchButtonDisabled]}
            onPress={onPunchOut}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color={COLORS.onPrimary} />
            ) : (
              <>
                <LogOut size={20} color={COLORS.onPrimary} style={styles.punchIcon} />
                <Text style={styles.punchButtonText}>Clock Out</Text>
              </>
            )}
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View style={styles.statusRow}>
            <Text style={styles.shiftText}>Shift ended</Text>
            <View style={styles.entryTimeBlock}>
              <Text style={styles.entryTime}>{checkOutTime ? formatTimeForDisplay(checkOutTime) : '—'}</Text>
              <Text style={styles.entryLabel}>Exit Time</Text>
            </View>
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Today's Hours</Text>
              <Text style={[styles.statValue, { color: COLORS.info }]}>
                {checkInTime && checkOutTime
                  ? formatHoursMinutes(
                      (() => {
                        const [h1, m1] = checkInTime.split(':').map(Number);
                        const [h2, m2] = checkOutTime.split(':').map(Number);
                        return (h2 - h1) + (m2 - m1) / 60;
                      })(),
                    )
                  : '0h 0m'}
              </Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Weekly Avg</Text>
              <Text style={styles.statValueGrey}>{formatHoursMinutes(weeklyAvg)}</Text>
            </View>
          </View>
          <View style={styles.punchButtonDone}>
            <Text style={[styles.punchButtonText, { color: COLORS.textSecondary }]}>Done for today</Text>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.lg,
    marginBottom: THEME.spacing.lg,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: THEME.spacing.md,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: THEME.spacing.md,
  },
  clockedInRow: { flexDirection: 'row', alignItems: 'center' },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.success,
    marginRight: THEME.spacing.sm,
  },
  clockedInText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  entryTimeBlock: { alignItems: 'flex-end' },
  entryTime: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.primary,
  },
  entryLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  shiftText: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  statsRow: {
    flexDirection: 'row',
    gap: THEME.spacing.md,
    marginBottom: THEME.spacing.lg,
  },
  statBox: {
    flex: 1,
    backgroundColor: COLORS.backgroundSecondary,
    borderRadius: THEME.borderRadius.md,
    padding: THEME.spacing.md,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  statValueGrey: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
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
  punchButtonDone: {
    backgroundColor: COLORS.surfaceVariant,
    paddingVertical: THEME.spacing.md,
    borderRadius: THEME.borderRadius.md,
    alignItems: 'center',
  },
  punchIcon: { marginRight: THEME.spacing.sm },
  punchButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.onPrimary,
  },
});
