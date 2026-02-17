import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../constants/colors';
import { styles } from '../../styles/components/HomeHeaderGreetingStyles';
import { User, Bell, Settings, LogOut } from 'lucide-react-native';
import { useAuth } from '../../context/AuthContext';
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
  const {logout} = useAuth();
  const [menuVisible, setMenuVisible] = useState(false);

  const displayName = userName || 'Alex Thompson';
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const handleLogout = () => {
    setMenuVisible(false);
    logout();
  };

  const hasNotifications = MOCK_UNREAD_COUNT > 0;

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.left}>
          <View style={styles.avatar}>
            <User size={24} color={COLORS.textSecondary} />
          </View>
          <View style={styles.textWrap}>
            <Text style={styles.greeting}>{greeting}</Text>
            <Text style={styles.name}>{displayName}</Text>
            <Text style={styles.meta}>
              {designation} · {location}
            </Text>
          </View>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => navigation.navigate('Notifications' as never)}>
            <Bell size={22} color={COLORS.textSecondary} />
            {hasNotifications && <View style={styles.bellDot} />}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconBtnOutline}
            onPress={() => setMenuVisible(true)}
            activeOpacity={0.8}>
            <Settings size={20} color={COLORS.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}>
        <Pressable
          style={styles.menuBackdrop}
          onPress={() => setMenuVisible(false)}>
          <View style={styles.menuAnchor} />
        </Pressable>
        <View style={styles.menuBox}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={handleLogout}
            activeOpacity={0.7}>
            <LogOut size={18} color={COLORS.error} />
            <Text style={styles.menuItemText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};
