import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import { Card } from '@components/ui/Card';
import { COLORS } from '@constants/colors';
import { styles } from '@styles/screens/AnnouncementsScreenStyles';
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
