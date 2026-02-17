import React from 'react';
import { TextInput, View, Text, TextInputProps, ViewStyle, TextStyle } from 'react-native';
import { COLORS, THEME } from '@constants/colors';
import { styles } from '@styles/components/InputStyles';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  containerStyle,
  labelStyle,
  icon,
  rightIcon,
  style,
  ...props
}) => (
  <View style={[styles.container, containerStyle]}>
    {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
    <View style={[styles.inputWrapper, error && styles.inputError]}>
      {icon && <View style={styles.iconLeft}>{icon}</View>}
      <TextInput
        {...props}
        style={[
          styles.input,
          icon && { paddingLeft: THEME.spacing.lg },
          rightIcon && { paddingRight: THEME.spacing.lg },
          style,
        ]}
        placeholderTextColor={COLORS.textTertiary}
      />
      {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
    </View>
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);
