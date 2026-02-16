import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Alert,
  Linking,
  Platform,
} from 'react-native';
import { useAuth } from '@context/AuthContext';
import { Card } from '@components/ui/Card';
import { ScreenTitle, SCREEN_PAD } from '@components/ui/ScreenTitle';
import { COLORS, THEME } from '@constants/colors';
import { MOCK_PROFILE_EXTENDED } from '../data/mockData';
import {
  User as UserIcon,
  Mail,
  Phone,
  LogOut,
  Edit2,
  Lock,
  Copy,
  Check,
  MapPin,
} from 'lucide-react-native';

export function ProfileScreen({ navigation }: { navigation?: { goBack?: () => void } }) {
  const { state: authState, logout } = useAuth();
  const user = authState.user;

  const profile = MOCK_PROFILE_EXTENDED;
  const joinDateFormatted = user?.joinDate
    ? new Date(user.joinDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : '—';

  const handleEditProfile = () =>
    Alert.alert(
      'Edit Profile',
      'You can edit phone number, address, and emergency contact. Mock UI — changes are saved locally for this session.',
      [{ text: 'OK' }]
    );
  const handleChangePassword = () =>
    Alert.alert('Change Password', 'Forgot password / Reset password — use web portal or contact HR. Mock UI.', [{ text: 'OK' }]);
  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: () => logout(), style: 'destructive' },
    ]);
  };

  const copyEmail = () => {
    if (user?.email) {
      if (Platform.OS === 'web') {
        try {
          navigator.clipboard?.writeText(user.email);
          Alert.alert('Copied', 'Email copied to clipboard');
        } catch (_) {}
      } else {
        Alert.alert('Email', user.email);
      }
    }
  };

  const callEmergency = () => {
    const num = profile.emergencyContact.phone.replace(/\D/g, '');
    Linking.openURL(`tel:${num}`).catch(() => Alert.alert('Error', 'Could not open dialer'));
  };

  if (!user) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScreenTitle
        title="Profile Details"
        right={
          <TouchableOpacity onPress={handleEditProfile} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
            <Edit2 size={22} color={COLORS.primary} />
          </TouchableOpacity>
        }
      />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Profile overview */}
        <View style={styles.profileOverview}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarContainer}>
              <UserIcon size={44} color={COLORS.primary} />
            </View>
            <View style={styles.verifiedBadge}>
              <Check size={14} color={COLORS.background} strokeWidth={3} />
            </View>
          </View>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.designation}>{profile.designation.toUpperCase()}</Text>
          <View style={styles.employeeIdBadge}>
            <Text style={styles.employeeIdText}>ID: {user.employeeId}</Text>
          </View>
        </View>

        {/* Contact Information */}
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>CONTACT INFORMATION</Text>
          <View style={styles.infoRow}>
            <Mail size={20} color={COLORS.primary} style={styles.rowIcon} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Personal Email</Text>
              <Text style={styles.infoValue}>{user.email}</Text>
            </View>
            <TouchableOpacity onPress={copyEmail}>
              <Copy size={18} color={COLORS.textSecondary} />
            </TouchableOpacity>
          </View>
          <View style={styles.infoRow}>
            <Phone size={20} color={COLORS.primary} style={styles.rowIcon} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Phone Number</Text>
              <Text style={styles.infoValue}>{user.phone || '—'}</Text>
            </View>
          </View>
          {'address' in profile && profile.address && (
            <View style={styles.infoRow}>
              <MapPin size={20} color={COLORS.primary} style={styles.rowIcon} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Address</Text>
                <Text style={styles.infoValue}>{(profile as { address?: string }).address}</Text>
              </View>
            </View>
          )}
        </Card>

        {/* Employment Details */}
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>EMPLOYMENT DETAILS</Text>
          <View style={styles.employmentRow}>
            <Text style={styles.employmentLabel}>Department</Text>
            <Text style={styles.employmentValue}>{user.department}</Text>
          </View>
          <View style={styles.employmentRow}>
            <Text style={styles.employmentLabel}>Reporting Manager</Text>
            <Text style={styles.employmentValueOrange}>{profile.reportingManager}</Text>
          </View>
          <View style={styles.employmentRow}>
            <Text style={styles.employmentLabel}>Date of Joining</Text>
            <Text style={styles.employmentValue}>{joinDateFormatted}</Text>
          </View>
          <View style={styles.employmentRow}>
            <Text style={styles.employmentLabel}>Employment Type</Text>
            <Text style={styles.employmentValue}>{profile.employmentType}</Text>
          </View>
          {'approvedWorkLocation' in profile && (
            <View style={styles.employmentRow}>
              <Text style={styles.employmentLabel}>Approved Work Location</Text>
              <Text style={styles.employmentValue}>{(profile as { approvedWorkLocation?: string }).approvedWorkLocation}</Text>
            </View>
          )}
          {'reportingHierarchy' in profile && Array.isArray((profile as { reportingHierarchy?: string[] }).reportingHierarchy) && (
            <View style={styles.employmentRow}>
              <Text style={styles.employmentLabel}>Reporting Hierarchy</Text>
              <Text style={styles.employmentValue}>
                {(profile as { reportingHierarchy: string[] }).reportingHierarchy.join(' → ')}
              </Text>
            </View>
          )}
        </Card>

        {/* Emergency Contact */}
        <Card style={styles.card}>
          <Text style={styles.sectionTitle}>EMERGENCY CONTACT</Text>
          <View style={styles.emergencyCard}>
            <View style={styles.emergencyIcon}>
              <UserIcon size={20} color={COLORS.primary} />
            </View>
            <View style={styles.emergencyContent}>
              <Text style={styles.emergencyName}>{profile.emergencyContact.name}</Text>
              <Text style={styles.emergencyMeta}>
                {profile.emergencyContact.relationship} • {profile.emergencyContact.phone}
              </Text>
            </View>
            <TouchableOpacity onPress={callEmergency} style={styles.emergencyCallBtn}>
              <Phone size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </Card>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionRow} onPress={handleEditProfile}>
            <Edit2 size={20} color={COLORS.primary} />
            <Text style={styles.actionText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionRow, styles.actionRowBorder]} onPress={handleChangePassword}>
            <Lock size={20} color={COLORS.primary} />
            <Text style={styles.actionText}>Change Password</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color={COLORS.textPrimary} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { paddingBottom: THEME.spacing.xl },
  profileOverview: {
    alignItems: 'center',
    paddingVertical: THEME.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  avatarWrapper: { position: 'relative', marginBottom: THEME.spacing.md },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: { fontSize: 20, fontWeight: '600', color: COLORS.textPrimary, marginBottom: THEME.spacing.xs },
  designation: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.primary,
    letterSpacing: 1,
    marginBottom: THEME.spacing.xs,
  },
  employeeIdBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: THEME.spacing.md,
    paddingVertical: THEME.spacing.xs,
    borderRadius: THEME.borderRadius.md,
  },
  employeeIdText: { fontSize: 11, fontWeight: '600', color: COLORS.background },
  card: { marginHorizontal: SCREEN_PAD, marginBottom: THEME.spacing.md },
  sectionTitle: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.textSecondary,
    letterSpacing: 1,
    marginBottom: THEME.spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: THEME.spacing.md,
  },
  rowIcon: { marginRight: THEME.spacing.md },
  infoContent: { flex: 1 },
  infoLabel: { ...THEME.typography.caption, color: COLORS.textSecondary },
  infoValue: { ...THEME.typography.body, color: COLORS.textPrimary, fontWeight: '500' },
  employmentRow: { marginBottom: THEME.spacing.sm },
  employmentLabel: { ...THEME.typography.caption, color: COLORS.textSecondary },
  employmentValue: { ...THEME.typography.body, color: COLORS.textPrimary, fontWeight: '600', marginTop: 2 },
  employmentValueOrange: { ...THEME.typography.body, color: COLORS.primary, fontWeight: '600', marginTop: 2 },
  emergencyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceVariant,
    padding: THEME.spacing.md,
    borderRadius: THEME.borderRadius.md,
  },
  emergencyIcon: { marginRight: THEME.spacing.md },
  emergencyContent: { flex: 1 },
  emergencyName: { fontSize: 15, color: COLORS.textPrimary, fontWeight: '600' },
  emergencyMeta: { ...THEME.typography.caption, color: COLORS.textSecondary, marginTop: 2 },
  emergencyCallBtn: { padding: THEME.spacing.sm },
  actions: { marginHorizontal: SCREEN_PAD, marginBottom: THEME.spacing.md },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: THEME.spacing.md,
    gap: THEME.spacing.md,
  },
  actionRowBorder: { borderTopWidth: 1, borderTopColor: COLORS.border },
  actionText: { ...THEME.typography.body, color: COLORS.textPrimary, fontWeight: '500' },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: THEME.spacing.sm,
    marginHorizontal: SCREEN_PAD,
    paddingVertical: THEME.spacing.md,
    backgroundColor: COLORS.error,
    borderRadius: THEME.borderRadius.md,
  },
  logoutText: { fontSize: 15, color: COLORS.textPrimary, fontWeight: '600' },
});
