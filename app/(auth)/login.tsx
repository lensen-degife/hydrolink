import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
import { HydroColors, HydroSpacing, HydroTypography } from '@/constants/auth-theme';
import { loginSchema, validateForm, type LoginFormData } from '@/utils/validation';

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
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    router.replace('/(tabs)');
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

        <View style={styles.securityNote}>
          <Text style={styles.securityText}>
            🔒 Secured with 256-bit encryption
          </Text>
        </View>
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
  },
  securityNote: {
    alignItems: 'center',
    marginTop: HydroSpacing.md,
  },
  securityText: {
    ...HydroTypography.labelMedium,
    color: HydroColors.onSurfaceVariant,
  },
});
