import React from 'react';
import {
  Modal as RNModal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { COLORS, THEME } from '@constants/colors';
import { X } from 'lucide-react-native';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  /** Optional primary action at bottom (e.g. Save). Modal does not handle submit. */
  primaryAction?: { label: string; onPress: () => void; loading?: boolean };
  /** Scrollable content area. Default true. */
  scrollable?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  title,
  children,
  primaryAction,
  scrollable = true,
}) => (
  <RNModal
    visible={visible}
    transparent
    animationType="fade"
    onRequestClose={onClose}
  >
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.centered}
          >
            <View style={styles.box}>
              <View style={styles.header}>
                <Text style={styles.title} numberOfLines={1}>{title}</Text>
                <TouchableOpacity
                  onPress={onClose}
                  hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                  style={styles.closeBtn}
                >
                  <X size={22} color={COLORS.textSecondary} />
                </TouchableOpacity>
              </View>
              {scrollable ? (
                <ScrollView
                  style={styles.bodyScroll}
                  contentContainerStyle={styles.bodyContent}
                  keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={false}
                >
                  {children}
                </ScrollView>
              ) : (
                <View style={styles.body}>{children}</View>
              )}
              {primaryAction && (
                <TouchableOpacity
                  style={[styles.primaryBtn, primaryAction.loading && styles.primaryBtnDisabled]}
                  onPress={primaryAction.onPress}
                  disabled={primaryAction.loading}
                  activeOpacity={0.8}
                >
                  <Text style={styles.primaryBtnText}>{primaryAction.label}</Text>
                </TouchableOpacity>
              )}
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  </RNModal>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: THEME.spacing.lg,
  },
  centered: { width: '100%', maxWidth: 400, alignSelf: 'center' },
  box: {
    backgroundColor: COLORS.surface,
    borderRadius: THEME.borderRadius.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    maxHeight: '85%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: THEME.spacing.lg,
    paddingVertical: THEME.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.textPrimary,
    flex: 1,
  },
  closeBtn: { padding: THEME.spacing.xs },
  bodyScroll: { maxHeight: 360 },
  bodyContent: { padding: THEME.spacing.lg, paddingBottom: THEME.spacing.xl },
  body: { padding: THEME.spacing.lg },
  primaryBtn: {
    backgroundColor: COLORS.primary,
    marginHorizontal: THEME.spacing.lg,
    marginBottom: THEME.spacing.lg,
    paddingVertical: THEME.spacing.md,
    borderRadius: THEME.borderRadius.md,
    alignItems: 'center',
  },
  primaryBtnDisabled: { opacity: 0.6 },
  primaryBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
});
