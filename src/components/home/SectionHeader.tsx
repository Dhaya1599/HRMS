import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../../styles/components/SectionHeaderStyles';

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
  /** Optional small label above title (e.g. "AT A GLANCE") */
  overline?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  actionLabel,
  onAction,
  overline,
}) => (
  <View style={styles.wrap}>
    <View style={styles.accentBar} />
    <View style={styles.content}>
      <View style={styles.row}>
        <Text style={styles.title}>{title}</Text>
        {actionLabel != null && onAction != null ? (
          <TouchableOpacity onPress={onAction} activeOpacity={0.7}>
            <Text style={styles.action}>{actionLabel}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  </View>
);
