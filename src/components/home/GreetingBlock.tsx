import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, THEME } from '@constants/colors';
import { MapPin } from 'lucide-react-native';

interface GreetingBlockProps {
  userName: string;
  isMockLocation?: boolean;
}

export const GreetingBlock: React.FC<GreetingBlockProps> = ({ userName, isMockLocation }) => {
  const firstName = userName?.split(' ')[0] ?? 'there';
  const dateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hello, {firstName}</Text>
      <Text style={styles.date}>{dateStr}</Text>
      {isMockLocation && (
        <View style={styles.mockBadge}>
          <MapPin size={12} color={COLORS.textSecondary} />
          <Text style={styles.mockBadgeText}>Demo location</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: THEME.spacing.lg,
    paddingTop: THEME.spacing.lg,
    paddingBottom: THEME.spacing.md,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 28,
    color: COLORS.textPrimary,
  },
  date: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.textSecondary,
    marginTop: THEME.spacing.xs,
  },
  mockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: THEME.spacing.sm,
    gap: THEME.spacing.xs,
  },
  mockBadgeText: {
    fontSize: 12,
    lineHeight: 16,
    color: COLORS.textSecondary,
  },
});
