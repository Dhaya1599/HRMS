import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '@constants/colors';
import { StatusPill } from '@components/ui/StatusPill';
import { styles } from '@styles/components/DailyLogCardStyles';
import { formatTime12h } from '@utils/formatters';
import { ArrowRight, ArrowLeft, ChevronRight } from 'lucide-react-native';

type StatusVariant = 'onTime' | 'late' | 'absent';

function getStatusVariant(s: string): StatusVariant {
  if (s === 'late') return 'late';
  if (s === 'absent') return 'absent';
  return 'onTime';
}

function getStatusLabel(s: string): string {
  if (s === 'late') return 'LATE';
  if (s === 'absent') return 'ABSENT';
  if (s === 'half_day') return 'HALF DAY';
  return 'ON TIME';
}

export interface DailyLogRecord {
  id: string;
  date: string;
  dayLabel: string;
  dateNum: string;
  monthShort: string;
  checkInTime: string;
  checkOutTime: string;
  workedText: string;
  shiftLabel: string;
  status: string;
}

interface DailyLogCardProps {
  item: DailyLogRecord;
  onPress?: () => void;
}

export const DailyLogCard: React.FC<DailyLogCardProps> = ({ item, onPress }) => {
  const isAbsent = item.status === 'absent';
  const variant = getStatusVariant(item.status);
  const dateBlockHighlight = variant === 'onTime' || variant === 'late';

  const content = (
    <>
      <View style={styles.top}>
        <View style={[styles.dateBlock, dateBlockHighlight && styles.dateBlockOrange]}>
          <Text style={styles.dayLabel}>{item.dayLabel}</Text>
          <Text style={styles.dateNum}>{item.dateNum}</Text>
        </View>
        <View style={styles.main}>
          <Text style={styles.worked}>{item.workedText}</Text>
          <Text style={styles.shift}>{item.shiftLabel}</Text>
        </View>
        <StatusPill label={getStatusLabel(item.status)} variant={variant} />
        {onPress && <ChevronRight size={18} color={COLORS.textTertiary} style={styles.chevron} />}
      </View>
      {!isAbsent && (
        <View style={styles.punchRow}>
          <View style={styles.punchCol}>
            <Text style={styles.punchLabel}>PUNCH IN</Text>
            <View style={styles.punchTimeRow}>
              <ArrowRight size={14} color={COLORS.textSecondary} />
              <Text style={styles.punchTime}>{formatTime12h(item.checkInTime)}</Text>
            </View>
          </View>
          <View style={styles.punchCol}>
            <Text style={styles.punchLabel}>PUNCH OUT</Text>
            <View style={[styles.punchTimeRow, styles.punchTimeRowEnd]}>
              <Text style={styles.punchTime}>{formatTime12h(item.checkOutTime)}</Text>
              <ArrowLeft size={14} color={COLORS.textSecondary} />
            </View>
          </View>
        </View>
      )}
    </>
  );

  if (onPress) {
    return (
      <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
        {content}
      </TouchableOpacity>
    );
  }
  return <View style={styles.card}>{content}</View>;
};
