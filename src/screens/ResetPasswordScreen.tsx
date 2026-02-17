import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Input } from '@components/ui/Input';
import { Button } from '@components/ui/Button';
import { COLORS } from '@constants/colors';
import { styles } from '@styles/screens/ResetPasswordScreenStyles';
import { ArrowLeft, Lock, Eye, EyeOff } from 'lucide-react-native';

export function ResetPasswordScreen() {
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 600));
      Alert.alert('Done', 'Password updated. You can log in with your new password.', [
        { text: 'OK', onPress: () => navigation.navigate('Login' as never) },
      ]);
    } catch {
      Alert.alert('Error', 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <ArrowLeft size={22} color={COLORS.primary} />
      </TouchableOpacity>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboard}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Set new password</Text>
          <Text style={styles.subtitle}>
            Enter your new password below. You’ll use it to sign in.
          </Text>
          <Input
            label="NEW PASSWORD"
            placeholder="Min 6 characters"
            value={password}
            onChangeText={(t) => { setPassword(t); setError(''); }}
            error={error}
            secureTextEntry={!showPassword}
            containerStyle={styles.input}
            icon={<Lock size={18} color={COLORS.primary} />}
            rightIcon={
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={18} color={COLORS.primary} /> : <Eye size={18} color={COLORS.primary} />}
              </TouchableOpacity>
            }
          />
          <Input
            label="CONFIRM PASSWORD"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChangeText={(t) => { setConfirmPassword(t); setError(''); }}
            secureTextEntry={!showPassword}
            containerStyle={styles.input}
            icon={<Lock size={18} color={COLORS.primary} />}
          />
          <Button
            title="Update password"
            onPress={handleSubmit}
            loading={loading}
            disabled={loading}
            fullWidth
            style={styles.primaryBtn}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
