import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import { Card } from '@components/ui/Card';
import { COLORS, THEME } from '@constants/colors';
import { MOCK_NOTIFICATIONS } from '../data/mockData';
import { formatRelativeDate } from '@utils/formatters';

export function NotificationsScreen() {
  const navigation = useNavigation();
  const unreadCount = MOCK_NOTIFICATIONS.filter((n) => !n.isRead).length;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ArrowLeft size={22} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Notifications</Text>
        {unreadCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{unreadCount}</Text>
          </View>
        )}
      </View>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {MOCK_NOTIFICATIONS.map((n) => (
          <Card key={n.id} style={StyleSheet.flatten([styles.card, !n.isRead ? styles.cardUnread : null])}>
            <Text style={styles.cardTitle}>{n.title}</Text>
            <Text style={styles.cardBody}>{n.body}</Text>
            <Text style={styles.cardMeta}>{formatRelativeDate(n.createdAt)} · {n.type}</Text>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: THEME.spacing.lg, paddingVertical: THEME.spacing.md, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  backBtn: { marginRight: THEME.spacing.md },
  title: { fontSize: 18, fontWeight: '600', color: COLORS.textPrimary, flex: 1 },
  badge: { backgroundColor: COLORS.primary, minWidth: 22, height: 22, borderRadius: 11, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 6 },
  badgeText: { fontSize: 12, fontWeight: '700', color: COLORS.textPrimary },
  content: { padding: THEME.spacing.lg, paddingBottom: THEME.spacing.xl },
  card: { marginBottom: THEME.spacing.md },
  cardUnread: { borderLeftWidth: 3, borderLeftColor: COLORS.primary },
  cardTitle: { fontSize: 15, fontWeight: '600', color: COLORS.textPrimary, marginBottom: THEME.spacing.xs },
  cardBody: { fontSize: 14, color: COLORS.textSecondary, lineHeight: 20, marginBottom: THEME.spacing.xs },
  cardMeta: { fontSize: 11, color: COLORS.textTertiary },
});
