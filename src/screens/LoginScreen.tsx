import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@context/AuthContext';
import { Input } from '@components/ui/Input';
import { Button } from '@components/ui/Button';
import { Loading } from '@components/ui/Loading';
import { COLORS, THEME } from '@constants/colors';
import { Lock, Mail, Shield, Eye, EyeOff } from 'lucide-react-native';

export function LoginScreen() {
  const navigation = useNavigation();
  const { state, login, loginDemo } = useAuth();
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ employeeId?: string; password?: string }>({});

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};
    if (!employeeId.trim()) newErrors.employeeId = 'Email or Employee ID is required';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    try {
      await login(employeeId, password);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } }; message?: string };
      Alert.alert('Login Failed', err?.response?.data?.error || err?.message || 'Please check your credentials');
    }
  };

  if (state.isLoading && !employeeId) {
    return (
      <View style={styles.container}>
        <Loading fullScreen message="Loading..." />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Branding */}
          <View style={styles.brandSection}>
            <View style={styles.logoCircle}>
              <Shield size={36} color={COLORS.primary} strokeWidth={2} />
            </View>
            <Text style={styles.portalTitle}>EMPLOYEE PORTAL</Text>
          </View>

          {/* Welcome block with image area */}
          <View style={styles.welcomeSection}>
            <View style={styles.welcomeImagePlaceholder}>
              <Text style={styles.welcomeTitle}>Welcome Back</Text>
              <Text style={styles.welcomeSubtitle}>Access your workspace securely</Text>
            </View>
          </View>

          {/* Form */}
          <View style={styles.formSection}>
            <Input
              label="EMAIL OR EMPLOYEE ID"
              placeholder="e.g. name@company.com"
              value={employeeId}
              onChangeText={(text) => {
                setEmployeeId(text);
                if (errors.employeeId) setErrors({ ...errors, employeeId: '' });
              }}
              error={errors.employeeId}
              icon={<Text style={styles.inputIcon}>@</Text>}
              labelStyle={styles.inputLabel}
              containerStyle={styles.inputContainer}
              editable={!state.isLoading}
            />
            <View style={styles.passwordRow}>
              <Text style={styles.inputLabel}>PASSWORD</Text>
              <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword' as never)}>
                <Text style={styles.forgotLink}>FORGOT?</Text>
              </TouchableOpacity>
            </View>
            <Input
              placeholder="Enter password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password) setErrors({ ...errors, password: '' });
              }}
              error={errors.password}
              secureTextEntry={!showPassword}
              icon={<Lock size={18} color={COLORS.primary} />}
              rightIcon={
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={18} color={COLORS.primary} /> : <Eye size={18} color={COLORS.primary} />}
                </TouchableOpacity>
              }
              containerStyle={styles.inputContainer}
              editable={!state.isLoading}
            />

            {state.error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{state.error}</Text>
              </View>
            )}

            <Button
              title="Secure Login"
              onPress={handleLogin}
              loading={state.isLoading}
              disabled={state.isLoading}
              fullWidth
              icon={<View style={styles.shieldCheck}><Shield size={16} color={COLORS.background} strokeWidth={2.5} /></View>}
              style={styles.secureButton}
            />
            <Button
              title="Continue as demo (no backend)"
              onPress={loginDemo}
              disabled={state.isLoading}
              fullWidth
              variant="outline"
              style={styles.demoButton}
            />
          </View>

          {/* Footer */}
          <View style={styles.footerSection}>
            <Text style={styles.footerText}>
              Trouble signing in? <Text style={styles.footerLink}>Contact HR Support</Text>
            </Text>
            <View style={styles.legalRow}>
              <TouchableOpacity><Text style={styles.legalLink}>PRIVACY POLICY</Text></TouchableOpacity>
              <Text style={styles.legalSpacer}> </Text>
              <TouchableOpacity><Text style={styles.legalLink}>TERMS OF USE</Text></TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.backgroundDark },
  keyboardView: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: THEME.spacing.xl,
    paddingTop: THEME.spacing.xxl,
    paddingBottom: THEME.spacing.xxxl,
  },
  brandSection: { alignItems: 'center', marginBottom: THEME.spacing.xl },
  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: THEME.spacing.md,
  },
  portalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
    letterSpacing: 1.5,
  },
  welcomeSection: { marginBottom: THEME.spacing.xl },
  welcomeImagePlaceholder: {
    backgroundColor: COLORS.surfaceVariant,
    borderRadius: THEME.borderRadius.lg,
    paddingVertical: THEME.spacing.xxl,
    paddingHorizontal: THEME.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 140,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: THEME.spacing.xs,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '500',
  },
  formSection: { marginBottom: THEME.spacing.xxl },
  inputLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.primary,
    letterSpacing: 0.5,
    marginBottom: THEME.spacing.sm,
  },
  inputContainer: { marginBottom: THEME.spacing.lg },
  inputIcon: { fontSize: 18, color: COLORS.primary, fontWeight: '600' },
  passwordRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: THEME.spacing.sm,
  },
  forgotLink: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
  },
  errorContainer: {
    backgroundColor: COLORS.error,
    padding: THEME.spacing.md,
    borderRadius: THEME.borderRadius.md,
    marginBottom: THEME.spacing.lg,
  },
  errorText: { fontSize: 14, color: COLORS.textPrimary },
  secureButton: { marginTop: THEME.spacing.sm, marginBottom: THEME.spacing.md },
  shieldCheck: { marginRight: THEME.spacing.sm },
  demoButton: {},
  footerSection: {
    alignItems: 'center',
    paddingTop: THEME.spacing.xl,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  footerText: { fontSize: 13, color: COLORS.textSecondary, marginBottom: THEME.spacing.md },
  footerLink: { color: COLORS.primary, fontWeight: '600', textDecorationLine: 'underline' },
  legalRow: { flexDirection: 'row', alignItems: 'center' },
  legalLink: { fontSize: 11, color: COLORS.textSecondary, letterSpacing: 0.5 },
  legalSpacer: { color: COLORS.textSecondary },
});
