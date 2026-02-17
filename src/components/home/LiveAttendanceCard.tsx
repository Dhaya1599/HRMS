import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { COLORS } from '../../constants/colors';
import { useLiveElapsed } from '../../hooks/useLiveElapsed';
import { formatTime12h, formatHoursMinutes } from '../../utils/formatters';
import { styles } from '../../styles/components/LiveAttendanceCardStyles';
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
  const elapsedHours = (elapsedParts[0] ?? 0) + (elapsedParts[1] ?? 0) / 60 + (elapsedParts[2] ?? 0) / 3600;
  const todayHours = isPunchedIn ? elapsedHours : (checkInTime && checkOutTime ? 6.75 : 0);
  const weeklyAvg = 8.2;

  const statusAccent = !checkInTime ? COLORS.primary : isPunchedIn ? COLORS.success : COLORS.textTertiary;

  return (
    <View style={[styles.card, { borderLeftColor: statusAccent }]}>
      <View style={styles.labelRow}>
        <Text style={styles.sectionLabel}>Attendance</Text>
        {isPunchedIn && <View style={styles.livePill}><Text style={styles.livePillText}>LIVE</Text></View>}
      </View>

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
              <Text style={styles.entryTime}>{formatTime12h(checkInTime)}</Text>
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
              <Text style={styles.entryTime}>{checkOutTime ? formatTime12h(checkOutTime) : '—'}</Text>
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
