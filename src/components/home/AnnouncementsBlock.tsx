import React from 'react';
import { View, Text } from 'react-native';
import { COLORS } from '../../constants/colors';
import { formatDate } from '../../utils/formatters';
import { Megaphone } from 'lucide-react-native';
import { SectionHeader } from './SectionHeader';
import { styles } from '../../styles/components/AnnouncementsBlockStyles';

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
