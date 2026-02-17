import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS, THEME} from '@constants/colors';
import {ChevronRight} from 'lucide-react-native';
import {SectionHeader} from './SectionHeader';

export interface HolidayItem {
  date: string;
  name: string;
}

interface UpcomingHolidaysListProps {
  holidays: HolidayItem[];
  onViewCalendar?: () => void;
  maxItems?: number;
}

export const UpcomingHolidaysList: React.FC<UpcomingHolidaysListProps> = ({
  holidays,
  onViewCalendar,
  maxItems = 5,
}) => {
  const sorted = [...holidays].sort((a, b) => a.date.localeCompare(b.date));
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = sorted.filter(h => h.date >= today).slice(0, maxItems);
  return (
    <View style={styles.section}>
      <SectionHeader
        title="Upcoming holidays"
        actionLabel={onViewCalendar != null ? 'View calendar' : undefined}
        onAction={onViewCalendar}
      />
      {upcoming.map((h, index) => {
        const d = new Date(h.date);
        const month = d
          .toLocaleDateString('en-US', {month: 'short'})
          .toUpperCase();
        const day = d.getDate();
        const weekday = d.toLocaleDateString('en-US', {weekday: 'long'});
        const isOrange = index % 2 === 0;
        const dateAccent = isOrange ? COLORS.primary : COLORS.info;
        const dateBg = isOrange ? '#FEE7D6' : '#EFF6FF';
        return (
          <View key={h.date} style={styles.row}>
            <View style={[styles.dateBlock, {backgroundColor: dateBg}]}>
              <Text style={styles.dateMonth}>{month}</Text>
              <Text style={[styles.dateDay, {color: dateAccent}]}>{day}</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.name}>{h.name}</Text>
              <Text style={styles.meta}>Public Holiday • {weekday}</Text>
            </View>
            <ChevronRight size={20} color={COLORS.textTertiary} />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {marginBottom: THEME.spacing.xl},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.md,
    marginBottom: THEME.spacing.sm,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    ...THEME.shadows.sm,
  },
  dateBlock: {
    width: 48,
    paddingVertical: THEME.spacing.sm,
    borderRadius: THEME.borderRadius.md,
    alignItems: 'center',
    marginRight: THEME.spacing.md,
  },
  dateMonth: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.textSecondary,
    letterSpacing: 0.5,
  },
  dateDay: {
    fontSize: 18,
    fontWeight: '700',
  },
  details: {flex: 1},
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  meta: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 1,
  },
});
