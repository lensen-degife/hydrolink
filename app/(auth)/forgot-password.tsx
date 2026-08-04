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
} from '@/components/auth';
import { HydroColors, HydroSpacing, HydroTypography } from '@/constants/auth-theme';
import { forgotPasswordSchema, validateForm, type ForgotPasswordFormData } from '@/utils/validation';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [form, setForm] = useState<ForgotPasswordFormData>({ email: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const updateField = (field: keyof ForgotPasswordFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async () => {
    const result = validateForm(forgotPasswordSchema, form);
    if (!result.success) {
      setErrors(result.errors);
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setLoading(false);

    router.push({
      pathname: '/(auth)/otp-verification',
      params: { email: form.email, flow: 'reset' },
    });
  };

  return (
    <AuthLayout showGradient={false}>
      <AnimatedScreen>
        <AuthHeader
          title="Reset password"
          subtitle="We'll send a verification code to your email"
          showBack
        />

        <View style={styles.infoBox}>
          <Text style={styles.infoIcon}>📧</Text>
          <Text style={styles.infoText}>
            Enter the email address associated with your HydroLink account. We&apos;ll send you a
            6-digit verification code.
          </Text>
        </View>

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

        <AuthButton
          label="Send Verification Code"
          loading={loading}
          icon="send-outline"
          onPress={handleSubmit}
        />

        <AuthFooterLink
          text="Remember your password?"
          linkText="Back to sign in"
          onPress={() => router.push('/(auth)/login')}
        />
      </AnimatedScreen>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  infoBox: {
    flexDirection: 'row',
    backgroundColor: HydroColors.primaryContainer,
    borderRadius: 16,
    padding: 16,
    marginBottom: HydroSpacing.lg,
    alignItems: 'flex-start',
    gap: 12,
  },
  infoIcon: {
    fontSize: 24,
  },
  infoText: {
    ...HydroTypography.bodyMedium,
    color: HydroColors.onPrimaryContainer,
    flex: 1,
    lineHeight: 20,
  },
});
