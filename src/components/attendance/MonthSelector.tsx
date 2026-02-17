import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '@constants/colors';
import { styles } from '@styles/components/MonthSelectorStyles';
import { ChevronDown } from 'lucide-react-native';

interface MonthSelectorProps {
  label: string;
  onPress?: () => void;
}

export const MonthSelector: React.FC<MonthSelectorProps> = ({ label, onPress }) => (
  <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
    <Text style={styles.label}>{label}</Text>
    <ChevronDown size={20} color={COLORS.textPrimary} />
  </TouchableOpacity>
);
