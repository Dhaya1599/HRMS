import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, THEME } from '@constants/colors';
import { User, Bell, Settings } from 'lucide-react-native';

interface HomeHeaderGreetingProps {
  userName: string;
  designation?: string;
  location?: string;
}

export const HomeHeaderGreeting: React.FC<HomeHeaderGreetingProps> = ({
  userName,
  designation = 'Product Designer',
  location = 'HQ Office',
}) => {
  const firstName = userName?.split(' ')[0] ?? 'there';
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.avatarWrap}>
          <View style={styles.avatar}>
            <User size={24} color={COLORS.primary} />
          </View>
          <View style={styles.statusDot} />
        </View>
        <View style={styles.textWrap}>
          <Text style={styles.greeting}>{greeting}, {firstName}</Text>
          <Text style={styles.sub}>{designation} • {location}</Text>
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.iconBtn}>
          <Bell size={20} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn}>
          <Settings size={20} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: THEME.spacing.lg,
    paddingVertical: THEME.spacing.md,
  },
  left: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  avatarWrap: { position: 'relative', marginRight: THEME.spacing.sm },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.surface,
    borderWidth: 2,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.success,
    borderWidth: 2,
    borderColor: COLORS.background,
  },
  textWrap: { flex: 1 },
  greeting: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  sub: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 1,
  },
  actions: { flexDirection: 'row', gap: THEME.spacing.xs },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
