import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, THEME } from '@constants/colors';
import { User, Bell, Settings, LogOut } from 'lucide-react-native';
import { useAuth } from '@context/AuthContext';
import { MOCK_UNREAD_COUNT } from '../../data/mockData';

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
  const navigation = useNavigation();
  const { logout } = useAuth();
  const [menuVisible, setMenuVisible] = useState(false);

  const displayName = userName || 'Alex Thompson';
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'GOOD MORNING' : hour < 17 ? 'GOOD AFTERNOON' : 'GOOD EVENING';

  const handleLogout = () => {
    setMenuVisible(false);
    logout();
  };

  const hasNotifications = MOCK_UNREAD_COUNT > 0;

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.avatarWrap}>
          <View style={styles.avatar}>
            <User size={24} color={COLORS.textSecondary} />
          </View>
        </View>
        <View style={styles.textWrap}>
          <Text style={styles.greeting}>{greeting}</Text>
          <Text style={styles.name}>{displayName}</Text>
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => navigation.navigate('Notifications' as never)}
        >
          <Bell size={22} color={COLORS.textSecondary} />
          {hasNotifications && <View style={styles.bellDot} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconBtnOutline}
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
    backgroundColor: COLORS.background,
  },
  left: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  avatarWrap: { marginRight: THEME.spacing.md },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FEE7D6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWrap: { flex: 1 },
  greeting: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
    letterSpacing: 0.5,
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: 2,
  },
  actions: { flexDirection: 'row', alignItems: 'center', gap: THEME.spacing.sm },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surfaceVariant,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  iconBtnOutline: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bellDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    borderWidth: 1.5,
    borderColor: COLORS.background,
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
