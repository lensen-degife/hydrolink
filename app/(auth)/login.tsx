import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import {
  AnimatedScreen,
  AuthButton,
  AuthDivider,
  AuthFooterLink,
  AuthHeader,
  AuthLayout,
  AuthTextInput,
  HydroLogoCompact,
} from '@/components/auth';
import {  HydroSpacing } from '@/constants/auth-theme';
import { loginSchema, validateForm, type LoginFormData } from '@/utils/validation';
import { login as loginApi } from '@/services/auth';
import { ApiError } from '@/services/api';

export default function LoginScreen() {
  const router = useRouter();
  const [form, setForm] = useState<LoginFormData>({ email: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const updateField = (field: keyof LoginFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleLogin = async () => {
    const result = validateForm(loginSchema, form);
    if (!result.success) {
      setErrors(result.errors);
      return;
    }

    setLoading(true);
    try {
      await loginApi(result.data.email, result.data.password);
      router.replace('/(tabs)');
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : 'Unable to sign in. Check your connection and try again.';
      Alert.alert('Login failed', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      header={
        <View style={styles.headerArea}>
          <HydroLogoCompact />
        </View>
      }>
      <AnimatedScreen>
        <AuthHeader
          title="Welcome back"
          subtitle="Sign in to manage your water account"
          showBack
          onBack={() => router.replace('/(auth)/welcome')}
        />

        <AuthTextInput
          label="Email Address"
          icon="mail-outline"
          placeholder="you@example.com"
          value={form.email}
          onChangeText={(v) => updateField('email', v)}
          error={errors.email}
          keyboardType="email-address"
          autoComplete="email"
          autoCapitalize="none"
        />

        <AuthTextInput
          label="Password"
          icon="lock-closed-outline"
          placeholder="Enter your password"
          value={form.password}
          onChangeText={(v) => updateField('password', v)}
          error={errors.password}
          isPassword
          autoComplete="password"
        />

        <AuthButton
          label="Forgot password?"
          variant="text"
          fullWidth={false}
          onPress={() => router.push('/(auth)/forgot-password')}
          style={styles.forgotButton}
        />

        <AuthButton label="Sign In" loading={loading} icon="log-in-outline" onPress={handleLogin} />

        <AuthDivider />

        <AuthButton
          label="Continue with Biometrics"
          variant="tonal"
          icon="finger-print-outline"
          onPress={handleLogin}
        />

        <AuthFooterLink
          text="Don't have an account?"
          linkText="Create one"
          onPress={() => router.push('/(auth)/register')}
        />
      </AnimatedScreen>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  headerArea: {
    paddingHorizontal: HydroSpacing.lg,
    paddingBottom: HydroSpacing.md,
  },
  forgotButton: {
    alignSelf: 'flex-end',
    height: 36,
    marginTop: -8,
    marginBottom: 8,
  }
});