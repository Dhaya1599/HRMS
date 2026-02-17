import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Modal } from '@components/ui/Modal';
import { COLORS } from '@constants/colors';
import { styles } from '@styles/components/MonthYearPickerModalStyles';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export interface MonthYearOption {
  monthIndex: number;
  year: number;
  label: string;
}

interface MonthYearPickerModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (monthIndex: number, year: number) => void;
  currentMonthIndex: number;
  currentYear: number;
}

function buildOptions(currentMonth: number, currentYear: number): MonthYearOption[] {
  const options: MonthYearOption[] = [];
  for (let y = currentYear; y >= currentYear - 1; y--) {
    const startM = y === currentYear ? currentMonth : 11;
    for (let m = startM; m >= 0; m--) {
      options.push({
        monthIndex: m,
        year: y,
        label: `${MONTHS[m]} ${y}`,
      });
    }
  }
  return options;
}

export const MonthYearPickerModal: React.FC<MonthYearPickerModalProps> = ({
  visible,
  onClose,
  onSelect,
  currentMonthIndex,
  currentYear,
}) => {
  const options = buildOptions(currentMonthIndex, currentYear);

  return (
    <Modal visible={visible} onClose={onClose} title="Select month" scrollable={false}>
      <ScrollView style={styles.list} contentContainerStyle={styles.listContent} keyboardShouldPersistTaps="handled">
        {options.map((opt) => (
          <TouchableOpacity
            key={`${opt.year}-${opt.monthIndex}`}
            style={[styles.option, opt.monthIndex === currentMonthIndex && opt.year === currentYear && styles.optionSelected]}
            onPress={() => {
              onSelect(opt.monthIndex, opt.year);
              onClose();
            }}
            activeOpacity={0.7}
          >
            <Text style={[styles.optionText, opt.monthIndex === currentMonthIndex && opt.year === currentYear && styles.optionTextSelected]}>
              {opt.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Modal>
  );
};
