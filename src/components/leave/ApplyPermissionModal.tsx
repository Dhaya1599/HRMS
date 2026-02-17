import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { Modal } from '@components/ui/Modal';
import { Input } from '@components/ui/Input';
import { styles } from '@styles/components/ApplyPermissionModalStyles';

export interface ApplyPermissionPayload {
  date: string;
  fromTime: string;
  toTime: string;
  reason: string;
}

interface ApplyPermissionModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (payload: ApplyPermissionPayload) => void;
  loading?: boolean;
}

export const ApplyPermissionModal: React.FC<ApplyPermissionModalProps> = ({
  visible,
  onClose,
  onSubmit,
  loading,
}) => {
  const [date, setDate] = useState('');
  const [fromTime, setFromTime] = useState('');
  const [toTime, setToTime] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = () => {
    if (!date.trim() || !fromTime.trim() || !toTime.trim()) {
      Alert.alert('Required', 'Please enter date, from time and to time.');
      return;
    }
    onSubmit({ date: date.trim(), fromTime: fromTime.trim(), toTime: toTime.trim(), reason: reason.trim() });
    setDate('');
    setFromTime('');
    setToTime('');
    setReason('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="Apply short permission"
      primaryAction={{ label: 'Submit', onPress: handleSubmit, loading }}
    >
      <Input label="Date" placeholder="YYYY-MM-DD" value={date} onChangeText={setDate} containerStyle={styles.input} />
      <Input label="From time" placeholder="HH:mm" value={fromTime} onChangeText={setFromTime} containerStyle={styles.input} />
      <Input label="To time" placeholder="HH:mm" value={toTime} onChangeText={setToTime} containerStyle={styles.input} />
      <Input label="Reason" placeholder="Brief reason" value={reason} onChangeText={setReason} containerStyle={styles.input} />
    </Modal>
  );
};
