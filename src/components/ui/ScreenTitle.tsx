import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { styles, SCREEN_PAD } from '../../styles/components/ScreenTitleStyles';

export { SCREEN_PAD };

interface ScreenTitleProps {
  title: string;
  right?: React.ReactNode;
  style?: ViewStyle;
}

export const ScreenTitle: React.FC<ScreenTitleProps> = ({ title, right, style }) => (
  <View style={[styles.row, style]}>
    <Text style={styles.title} numberOfLines={1}>{title}</Text>
    {right != null && <View style={styles.right}>{right}</View>}
  </View>
);
