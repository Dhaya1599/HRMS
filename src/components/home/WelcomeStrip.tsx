import React from 'react';
import { View, Text } from 'react-native';
import { COLORS } from '@constants/colors';
import { styles } from '@styles/components/WelcomeStripStyles';
import { Calendar } from 'lucide-react-native';

interface WelcomeStripProps {
  /** e.g. "You're on track" or "Ready to start your day" */
  tagline?: string;
}

function getDateLabel(): string {
  const d = new Date();
  const weekday = d.toLocaleDateString('en-US', { weekday: 'short' });
  const day = d.getDate();
  const month = d.toLocaleDateString('en-US', { month: 'short' });
  return `${weekday}, ${day} ${month}`;
}

export const WelcomeStrip: React.FC<WelcomeStripProps> = ({
  tagline = "You're on track this week",
}) => (
  <View style={styles.strip}>
    <View style={styles.dateRow}>
      <Calendar size={16} color={COLORS.primary} style={styles.calIcon} />
      <Text style={styles.date}>{getDateLabel()}</Text>
    </View>
    <Text style={styles.tagline} numberOfLines={1}>{tagline}</Text>
  </View>
);
