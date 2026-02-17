import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, THEME } from '@constants/colors';
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

const styles = StyleSheet.create({
  strip: {
    backgroundColor: COLORS.surface,
    borderRadius: THEME.borderRadius.lg,
    paddingVertical: THEME.spacing.md,
    paddingHorizontal: THEME.spacing.lg,
    marginBottom: THEME.spacing.lg,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  calIcon: { marginRight: THEME.spacing.xs },
  date: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
    letterSpacing: 0.3,
  },
  tagline: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
    letterSpacing: -0.2,
  },
});
