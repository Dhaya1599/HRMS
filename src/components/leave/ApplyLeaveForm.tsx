import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { COLORS, THEME } from '@constants/colors';
import { PenLine, ChevronDown, Calendar } from 'lucide-react-native';
import { Button } from '@components/ui/Button';

const LEAVE_TYPES = ['Casual Leave', 'Sick Leave', 'Earned Leave'];

interface ApplyLeaveFormProps {
  onSubmit: (payload: { type: string; startDate: string; endDate: string; reason: string }) => void;
  loading?: boolean;
}

export const ApplyLeaveForm: React.FC<ApplyLeaveFormProps> = ({ onSubmit, loading }) => {
  const [type, setType] = useState(LEAVE_TYPES[0]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = () => {
    if (!startDate.trim() || !endDate.trim()) {
      Alert.alert('Required', 'Please enter start and end date.');
      return;
    }
    onSubmit({
      type: LEAVE_TYPES[type === 'Casual Leave' ? 0 : type === 'Sick Leave' ? 1 : 0] ?? type,
      startDate: startDate.trim(),
      endDate: endDate.trim(),
      reason: reason.trim() || '—',
    });
  };

  const cycleType = () => {
    const i = LEAVE_TYPES.indexOf(type);
    setType(LEAVE_TYPES[(i + 1) % LEAVE_TYPES.length]);
  };

  return (
    <View style={styles.section}>
      <View style={styles.titleRow}>
        <PenLine size={18} color={COLORS.primary} style={styles.titleIcon} />
        <Text style={styles.title}>Apply for Leave</Text>
      </View>

      <TouchableOpacity style={styles.field} onPress={cycleType}>
        <Text style={styles.fieldLabel}>Leave Type</Text>
        <View style={styles.inputRow}>
          <Text style={styles.inputText}>{type}</Text>
          <ChevronDown size={18} color={COLORS.textSecondary} />
        </View>
      </TouchableOpacity>

      <View style={styles.row}>
        <View style={[styles.field, styles.half]}>
          <Text style={styles.fieldLabel}>Start Date</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="mm/dd/yyyy"
              placeholderTextColor={COLORS.textTertiary}
              value={startDate}
              onChangeText={setStartDate}
            />
            <Calendar size={18} color={COLORS.textSecondary} />
          </View>
        </View>
        <View style={[styles.field, styles.half]}>
          <Text style={styles.fieldLabel}>End Date</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="mm/dd/yyyy"
              placeholderTextColor={COLORS.textTertiary}
              value={endDate}
              onChangeText={setEndDate}
            />
            <Calendar size={18} color={COLORS.textSecondary} />
          </View>
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Reason for Leave</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Brief explanation..."
          placeholderTextColor={COLORS.textTertiary}
          value={reason}
          onChangeText={setReason}
          multiline
          numberOfLines={3}
        />
      </View>

      <Button
        title="Submit Application"
        onPress={handleSubmit}
        loading={loading}
        fullWidth
        style={styles.submitBtn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  section: { marginBottom: THEME.spacing.lg },
  titleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: THEME.spacing.md },
  titleIcon: { marginRight: THEME.spacing.sm },
  title: { fontSize: 16, fontWeight: '600', color: COLORS.textPrimary },
  field: { marginBottom: THEME.spacing.md },
  half: { flex: 1 },
  row: { flexDirection: 'row', gap: THEME.spacing.sm },
  fieldLabel: { fontSize: 13, color: COLORS.textPrimary, marginBottom: THEME.spacing.xs },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: THEME.borderRadius.md,
    paddingHorizontal: THEME.spacing.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: COLORS.textPrimary,
    paddingVertical: THEME.spacing.sm,
  },
  inputText: { flex: 1, fontSize: 15, color: COLORS.textPrimary, paddingVertical: THEME.spacing.sm },
  textArea: { minHeight: 64, textAlignVertical: 'top', paddingTop: THEME.spacing.sm },
  submitBtn: { marginTop: THEME.spacing.xs },
});
