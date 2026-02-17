import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '@components/ui/Card';
import { COLORS, THEME } from '@constants/colors';
import { formatDate } from '@utils/formatters';
import { Megaphone } from 'lucide-react-native';

interface Announcement {
  id: string;
  title: string;
  body: string;
  date: string;
  target: string;
}

interface AnnouncementsBlockProps {
  announcements: Announcement[];
  maxItems?: number;
}

export const AnnouncementsBlock: React.FC<AnnouncementsBlockProps> = ({
  announcements,
  maxItems = 2,
}) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Announcements</Text>
    <Card style={styles.card}>
      {announcements.slice(0, maxItems).map((a) => (
        <View key={a.id} style={styles.item}>
          <Megaphone size={16} color={COLORS.primary} style={styles.icon} />
          <View style={styles.body}>
            <Text style={styles.title}>{a.title}</Text>
            <Text style={styles.text} numberOfLines={2}>{a.body}</Text>
            <Text style={styles.meta}>{formatDate(a.date, 'MMM dd')} · {a.target}</Text>
          </View>
        </View>
      ))}
    </Card>
  </View>
);

const styles = StyleSheet.create({
  section: { marginBottom: THEME.spacing.md },
  sectionTitle: {
    ...THEME.typography.caption,
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: THEME.spacing.sm,
  },
  card: { padding: THEME.spacing.lg, borderWidth: 1, borderColor: COLORS.border },
  item: { flexDirection: 'row', marginBottom: THEME.spacing.lg },
  icon: { marginRight: THEME.spacing.sm, marginTop: 2 },
  body: { flex: 1 },
  title: { ...THEME.typography.body, fontWeight: '600', color: COLORS.textPrimary },
  text: { ...THEME.typography.caption, color: COLORS.textSecondary, marginTop: 2 },
  meta: { ...THEME.typography.caption, color: COLORS.textTertiary, marginTop: 4 },
});
