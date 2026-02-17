import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { COLORS, THEME } from '../../constants/colors';
import { formatDate } from '../../utils/formatters';
import {Megaphone} from 'lucide-react-native';
import {SectionHeader} from './SectionHeader';

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
    <SectionHeader title="Announcements" />
    <View style={styles.card}>
      {announcements.slice(0, maxItems).map((a, i, arr) => (
        <View
          key={a.id}
          style={[styles.item, i < arr.length - 1 && styles.itemBorder]}>
          <View style={styles.iconWrap}>
            <Megaphone size={18} color={COLORS.primary} />
          </View>
          <View style={styles.body}>
            <Text style={styles.title}>{a.title}</Text>
            <Text style={styles.text} numberOfLines={2}>
              {a.body}
            </Text>
            <Text style={styles.meta}>
              {formatDate(a.date, 'MMM dd')} · {a.target}
            </Text>
          </View>
        </View>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  section: {marginBottom: THEME.spacing.xl},
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.lg,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    ...THEME.shadows.sm,
  },
  item: {
    flexDirection: 'row',
    paddingVertical: THEME.spacing.sm,
  },
  itemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
    marginBottom: THEME.spacing.sm,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(253, 122, 46, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: THEME.spacing.md,
  },
  body: {flex: 1},
  title: {
    ...THEME.typography.body,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  text: {
    ...THEME.typography.caption,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  meta: {
    ...THEME.typography.caption,
    color: COLORS.textTertiary,
    marginTop: 4,
  },
});
