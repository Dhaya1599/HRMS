import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Input} from '@components/ui/Input';
import {Button} from '@components/ui/Button';
import {COLORS} from '@constants/colors';
import { styles } from '@styles/screens/ForgotPasswordScreenStyles';
import {ArrowLeft, Mail} from 'lucide-react-native';

export function ForgotPasswordScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    setError('');
    setLoading(true);
    try {
      // Mock: no API call
      await new Promise(r => setTimeout(r, 800));
      setSent(true);
    } catch {
      Alert.alert('Error', 'Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}>
          <ArrowLeft size={22} color={COLORS.primary} />
        </TouchableOpacity>
        <View style={styles.centered}>
          <View style={styles.iconWrap}>
            <Mail size={40} color={COLORS.primary} />
          </View>
          <Text style={styles.title}>Check your email</Text>
          <Text style={styles.subtitle}>
            We’ve sent a reset link to {email}. Open it to set a new password.
          </Text>
          <Button
            title="Back to login"
            onPress={() => navigation.goBack()}
            fullWidth
            style={styles.primaryBtn}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}>
        <ArrowLeft size={22} color={COLORS.primary} />
      </TouchableOpacity>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboard}>
        <View style={styles.content}>
          <Text style={styles.title}>Forgot password?</Text>
          <Text style={styles.subtitle}>
            Enter your email and we’ll send you a link to reset your password.
          </Text>
          <Input
            label="EMAIL"
            placeholder="name@company.com"
            value={email}
            onChangeText={t => {
              setEmail(t);
              setError('');
            }}
            error={error}
            containerStyle={styles.input}
            icon={<Mail size={18} color={COLORS.primary} />}
          />
          <Button
            title="Send reset link"
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
