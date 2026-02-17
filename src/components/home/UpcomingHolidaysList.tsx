import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, THEME } from '@constants/colors';
import { CalendarCheck } from 'lucide-react-native';

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
  const upcoming = sorted.filter((h) => h.date >= today).slice(0, maxItems);
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Upcoming Holidays</Text>
        <TouchableOpacity onPress={onViewCalendar}>
          <Text style={styles.actionLink}>View Calendar</Text>
        </TouchableOpacity>
      </View>
      {upcoming.map((h) => {
        const d = new Date(h.date);
        const month = d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
        const day = d.getDate();
        const weekday = d.toLocaleDateString('en-US', { weekday: 'long' });
        return (
          <View key={h.date} style={styles.row}>
            <View style={styles.dateBlock}>
              <Text style={styles.dateMonth}>{month}</Text>
              <Text style={styles.dateDay}>{day}</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.name}>{h.name}</Text>
              <Text style={styles.meta}>{weekday} • Gazetted Holiday</Text>
            </View>
            <CalendarCheck size={20} color={COLORS.textSecondary} />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  section: { marginBottom: THEME.spacing.md },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: THEME.spacing.sm,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  actionLink: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: THEME.borderRadius.md,
    padding: THEME.spacing.md,
    marginBottom: THEME.spacing.xs,
  },
  dateBlock: {
    width: 40,
    alignItems: 'center',
    marginRight: THEME.spacing.md,
  },
  dateMonth: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.primary,
    letterSpacing: 0.5,
  },
  dateDay: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  details: { flex: 1 },
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
