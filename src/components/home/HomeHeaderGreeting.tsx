import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import { COLORS, THEME } from '@constants/colors';
import { User, Bell, Settings, LogOut } from 'lucide-react-native';
import { useAuth } from '@context/AuthContext';

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
  const { logout } = useAuth();
  const [menuVisible, setMenuVisible] = useState(false);

  const firstName = userName?.split(' ')[0] ?? 'there';
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

  const handleLogout = () => {
    setMenuVisible(false);
    logout();
  };

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
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => setMenuVisible(true)}
          activeOpacity={0.8}
        >
          <Settings size={20} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>

      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable style={styles.menuBackdrop} onPress={() => setMenuVisible(false)}>
          <View style={styles.menuAnchor} />
        </Pressable>
        <View style={styles.menuBox}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <LogOut size={18} color={COLORS.error} />
            <Text style={styles.menuItemText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  menuBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  menuAnchor: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 100,
    height: 80,
  },
  menuBox: {
    position: 'absolute',
    top: 56,
    right: THEME.spacing.lg,
    minWidth: 140,
    backgroundColor: COLORS.surface,
    borderRadius: THEME.borderRadius.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...THEME.shadows.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: THEME.spacing.sm,
    paddingVertical: THEME.spacing.md,
    paddingHorizontal: THEME.spacing.lg,
  },
  menuItemText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
});
