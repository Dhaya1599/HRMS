import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Modal } from '@components/ui/Modal';
import { COLORS, THEME } from '@constants/colors';
import { ChevronDown, Calendar } from 'lucide-react-native';

const LEAVE_TYPES = ['Casual Leave', 'Sick Leave', 'Earned Leave'];

export interface ApplyLeavePayload {
  type: string;
  startDate: string;
  endDate: string;
  reason: string;
}

interface ApplyLeaveModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (payload: ApplyLeavePayload) => void;
  loading?: boolean;
}

export const ApplyLeaveModal: React.FC<ApplyLeaveModalProps> = ({
  visible,
  onClose,
  onSubmit,
  loading,
}) => {
  const [type, setType] = useState(LEAVE_TYPES[0]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');

  useEffect(() => {
    if (visible) {
      setType(LEAVE_TYPES[0]);
      setStartDate('');
      setEndDate('');
      setReason('');
    }
  }, [visible]);

  const handleSubmit = () => {
    if (!startDate.trim() || !endDate.trim()) {
      Alert.alert('Required', 'Please enter start and end date.');
      return;
    }
    onSubmit({
      type,
      startDate: startDate.trim(),
      endDate: endDate.trim(),
      reason: reason.trim() || '—',
    });
    onClose();
  };

  const cycleType = () => {
    const i = LEAVE_TYPES.indexOf(type);
    setType(LEAVE_TYPES[(i + 1) % LEAVE_TYPES.length]);
  };

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="Apply for Leave"
      primaryAction={{ label: 'Submit Application', onPress: handleSubmit, loading }}
      scrollable
    >
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
              placeholder="YYYY-MM-DD"
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
              placeholder="YYYY-MM-DD"
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
    </Modal>
  );
};

const styles = StyleSheet.create({
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
});
