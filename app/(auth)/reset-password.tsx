import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {
  AnimatedScreen,
  AuthButton,
  AuthHeader,
  AuthLayout,
  AuthTextInput,
  PasswordStrengthIndicator,
} from '@/components/auth';
import { HydroColors, HydroSpacing, HydroTypography } from '@/constants/auth-theme';
import { resetPasswordSchema, validateForm, type ResetPasswordFormData } from '@/utils/validation';

export default function ResetPasswordScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ email?: string }>();

  const [form, setForm] = useState<ResetPasswordFormData>({
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const updateField = (field: keyof ResetPasswordFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleReset = async () => {
    const result = validateForm(resetPasswordSchema, form);
    if (!result.success) {
      setErrors(result.errors);
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setSuccess(true);

    setTimeout(() => {
      router.replace('/(auth)/login');
    }, 2000);
  };

  if (success) {
    return (
      <AuthLayout showGradient={false}>
        <AnimatedScreen>
          <View style={styles.successContainer}>
            <View style={styles.successIcon}>
              <Text style={styles.successEmoji}>✅</Text>
            </View>
            <Text style={styles.successTitle}>Password updated!</Text>
            <Text style={styles.successText}>
              Your password has been reset successfully. Redirecting to sign in...
            </Text>
          </View>
        </AnimatedScreen>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout showGradient={false}>
      <AnimatedScreen>
        <AuthHeader
          title="New password"
          subtitle={
            params.email
              ? `Create a new password for ${params.email}`
              : 'Create a strong new password'
          }
          showBack
        />

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Choose a password that's different from your previous one. Use at least 8 characters
            with uppercase, lowercase, and numbers.
          </Text>
        </View>

        <AuthTextInput
          label="New Password"
          icon="lock-closed-outline"
          placeholder="Enter new password"
          value={form.password}
          onChangeText={(v) => updateField('password', v)}
          error={errors.password}
          isPassword
          autoComplete="new-password"
        />

        <PasswordStrengthIndicator password={form.password} />

        <AuthTextInput
          label="Confirm New Password"
          icon="shield-checkmark-outline"
          placeholder="Re-enter new password"
          value={form.confirmPassword}
          onChangeText={(v) => updateField('confirmPassword', v)}
          error={errors.confirmPassword}
          isPassword
          autoComplete="new-password"
        />

        <AuthButton
          label="Update Password"
          loading={loading}
          icon="key-outline"
          onPress={handleReset}
        />
      </AnimatedScreen>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  infoBox: {
    backgroundColor: HydroColors.surfaceContainer,
    borderRadius: 12,
    padding: 14,
    marginBottom: HydroSpacing.lg,
  },
  infoText: {
    ...HydroTypography.bodyMedium,
    color: HydroColors.onSurfaceVariant,
    lineHeight: 20,
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: HydroSpacing.xxl,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: HydroColors.successContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: HydroSpacing.lg,
  },
  successEmoji: {
    fontSize: 40,
  },
  successTitle: {
    ...HydroTypography.headlineLarge,
    color: HydroColors.onSurface,
    marginBottom: 8,
  },
  successText: {
    ...HydroTypography.bodyMedium,
    color: HydroColors.onSurfaceVariant,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
});
