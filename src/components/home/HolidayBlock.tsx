import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '@components/ui/Card';
import { COLORS, THEME } from '@constants/colors';
import { formatDate } from '@utils/formatters';
import { Calendar } from 'lucide-react-native';

interface Holiday {
  date: string;
  name: string;
}

interface HolidayBlockProps {
  holidays: Holiday[];
  maxItems?: number;
}

export const HolidayBlock: React.FC<HolidayBlockProps> = ({ holidays, maxItems = 4 }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Holiday List</Text>
    <Card style={styles.card}>
      {holidays.slice(0, maxItems).map((h) => (
        <View key={h.date} style={styles.row}>
          <Calendar size={16} color={COLORS.textSecondary} />
          <Text style={styles.date}>{formatDate(h.date, 'MMM dd')}</Text>
          <Text style={styles.name}>{h.name}</Text>
        </View>
      ))}
    </Card>
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
  card: { padding: THEME.spacing.lg, borderWidth: 1, borderColor: COLORS.border },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: THEME.spacing.sm, gap: THEME.spacing.sm },
  date: { ...THEME.typography.caption, color: COLORS.textSecondary, width: 56 },
  name: { ...THEME.typography.bodySmall, color: COLORS.textPrimary },
});
