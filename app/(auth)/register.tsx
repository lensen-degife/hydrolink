import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {
  AnimatedScreen,
  AuthButton,
  AuthFooterLink,
  AuthHeader,
  AuthLayout,
  AuthTextInput,
  PasswordStrengthIndicator,
} from '@/components/auth';
import { HydroColors, HydroSpacing, HydroTypography } from '@/constants/auth-theme';
import { registerSchema, validateForm, type RegisterFormData } from '@/utils/validation';

export default function RegisterScreen() {
  const router = useRouter();
  const [form, setForm] = useState<RegisterFormData>({
    fullName: '',
    email: '',
    phone: '',
    accountNumber: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const updateField = (field: keyof RegisterFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleRegister = async () => {
    const result = validateForm(registerSchema, form);
    if (!result.success) {
      setErrors(result.errors);
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);

    router.push({
      pathname: '/(auth)/otp-verification',
      params: { email: form.email, flow: 'register' },
    });
  };

  return (
    <AuthLayout showGradient={false}>
      <AnimatedScreen>
        <AuthHeader
          title="Create account"
          subtitle="Link your water utility account"
          showBack
        />

        <AuthTextInput
          label="Full Name"
          icon="person-outline"
          placeholder="John Doe"
          value={form.fullName}
          onChangeText={(v) => updateField('fullName', v)}
          error={errors.fullName}
          autoComplete="name"
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
          label="Phone Number"
          icon="call-outline"
          placeholder="+1 (555) 000-0000"
          value={form.phone}
          onChangeText={(v) => updateField('phone', v)}
          error={errors.phone}
          keyboardType="phone-pad"
          autoComplete="tel"
        />

        <AuthTextInput
          label="Utility Account Number"
          icon="document-text-outline"
          placeholder="123456789"
          value={form.accountNumber}
          onChangeText={(v) => updateField('accountNumber', v)}
          error={errors.accountNumber}
          keyboardType="number-pad"
        />

        <AuthTextInput
          label="Password"
          icon="lock-closed-outline"
          placeholder="Create a strong password"
          value={form.password}
          onChangeText={(v) => updateField('password', v)}
          error={errors.password}
          isPassword
          autoComplete="new-password"
        />

        <PasswordStrengthIndicator password={form.password} />

        <AuthTextInput
          label="Confirm Password"
          icon="shield-checkmark-outline"
          placeholder="Re-enter your password"
          value={form.confirmPassword}
          onChangeText={(v) => updateField('confirmPassword', v)}
          error={errors.confirmPassword}
          isPassword
          autoComplete="new-password"
        />

        <AuthButton
          label="Create Account"
          loading={loading}
          icon="person-add-outline"
          onPress={handleRegister}
        />

        <AuthFooterLink
          text="Already have an account?"
          linkText="Sign in"
          onPress={() => router.push('/(auth)/login')}
        />

        <View style={styles.terms}>
          <Text style={styles.termsText}>
            By creating an account, you agree to our{' '}
            <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
            <Text style={styles.termsLink}>Privacy Policy</Text>.
          </Text>
        </View>
      </AnimatedScreen>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  terms: {
    marginTop: HydroSpacing.md,
    paddingHorizontal: 4,
  },
  termsText: {
    ...HydroTypography.labelMedium,
    color: HydroColors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 18,
  },
  termsLink: {
    color: HydroColors.primary,
    fontWeight: '600',
  },
});
