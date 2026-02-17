import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, MapPin, Check } from 'lucide-react-native';
import { useAuth } from '@context/AuthContext';
import { Card } from '@components/ui/Card';
import { COLORS, THEME } from '@constants/colors';
import { MOCK_GEOFENCES, MOCK_EMPLOYEE_GEOFENCES } from '../data/mockData';

export function GeofencingScreen() {
  const navigation = useNavigation();
  const { state: authState } = useAuth();
  const assignedIds = new Set(
    MOCK_EMPLOYEE_GEOFENCES.filter((eg) => eg.employeeId === authState.user?.id).map((eg) => eg.geofenceId)
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ArrowLeft size={22} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Work locations</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.subtitle}>Approved punch-in zones. You can punch in only when inside an assigned zone.</Text>
        {MOCK_GEOFENCES.map((gf) => (
          <Card key={gf.id} style={styles.card}>
            <View style={styles.cardRow}>
              <MapPin size={20} color={COLORS.primary} />
              <Text style={styles.cardName}>{gf.name}</Text>
              {assignedIds.has(gf.id) && (
                <View style={styles.assignedBadge}>
                  <Check size={12} color={COLORS.background} strokeWidth={3} />
                  <Text style={styles.assignedText}>Assigned</Text>
                </View>
              )}
            </View>
            <Text style={styles.cardMeta}>Radius: {gf.radius}m · Lat, lng: {gf.latitude.toFixed(4)}, {gf.longitude.toFixed(4)}</Text>
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
  subtitle: { fontSize: 13, color: COLORS.textSecondary, marginBottom: THEME.spacing.lg },
  card: { marginBottom: THEME.spacing.md },
  cardRow: { flexDirection: 'row', alignItems: 'center', marginBottom: THEME.spacing.xs },
  cardName: { flex: 1, fontSize: 16, fontWeight: '600', color: COLORS.textPrimary, marginLeft: THEME.spacing.sm },
  assignedBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.success, paddingHorizontal: THEME.spacing.sm, paddingVertical: THEME.spacing.xs, borderRadius: THEME.borderRadius.sm, gap: 4 },
  assignedText: { fontSize: 11, fontWeight: '600', color: COLORS.textPrimary },
  cardMeta: { fontSize: 12, color: COLORS.textTertiary, marginLeft: 28 },
});
