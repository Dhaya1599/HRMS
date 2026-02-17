import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import { Card } from '@components/ui/Card';
import { COLORS, THEME } from '@constants/colors';
import { MOCK_ANNOUNCEMENTS } from '../data/mockData';
import { formatDate } from '@utils/formatters';

export function AnnouncementsScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ArrowLeft size={22} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Announcements</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {MOCK_ANNOUNCEMENTS.map((a) => (
          <Card key={a.id} style={styles.card}>
            <Text style={styles.cardTitle}>{a.title}</Text>
            <Text style={styles.cardBody}>{a.body}</Text>
            <Text style={styles.cardMeta}>{formatDate(a.date, 'MMM dd, yyyy')} · {a.target}</Text>
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
  title: { fontSize: 18, fontWeight: '600', color: COLORS.textPrimary },
  content: { padding: THEME.spacing.lg, paddingBottom: THEME.spacing.xl },
  card: { marginBottom: THEME.spacing.md },
  cardTitle: { fontSize: 16, fontWeight: '600', color: COLORS.textPrimary, marginBottom: THEME.spacing.sm },
  cardBody: { fontSize: 14, color: COLORS.textSecondary, lineHeight: 20, marginBottom: THEME.spacing.sm },
  cardMeta: { fontSize: 12, color: COLORS.textTertiary },
});
