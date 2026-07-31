import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import {
  AnimatedScreen,
  AuthButton,
  AuthHeader,
  AuthLayout,
  OTPInput,
} from '@/components/auth';
import { HydroColors, HydroSpacing, HydroTypography } from '@/constants/auth-theme';
import { otpSchema, validateForm } from '@/utils/validation';

const RESEND_COOLDOWN = 60;

export default function OTPVerificationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ email?: string; flow?: string }>();
  const email = params.email ?? 'your email';
  const flow = params.flow ?? 'register';

  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(RESEND_COOLDOWN);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleResend = useCallback(() => {
    if (!canResend) return;
    setCountdown(RESEND_COOLDOWN);
    setCanResend(false);
    setOtp('');
    setError('');
  }, [canResend]);

  const handleVerify = async () => {
    const result = validateForm(otpSchema, { otp });
    if (!result.success) {
      setError(result.errors.otp ?? 'Invalid code');
      return;
    }

    setError('');
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setLoading(false);

    if (flow === 'reset') {
      router.push({
        pathname: '/(auth)/reset-password',
        params: { email },
      });
    } else {
      router.replace('/(tabs)');
    }
  };

  const maskedEmail = email.includes('@')
    ? email.replace(/(.{2})(.*)(@.*)/, '$1***$3')
    : email;

  return (
    <AuthLayout showGradient={false}>
      <AnimatedScreen>
        <AuthHeader
          title="Verify your email"
          subtitle={`Code sent to ${maskedEmail}`}
          showBack
        />

        <View style={styles.otpSection}>
          <OTPInput value={otp} onChange={setOtp} error={error} />
        </View>

        <AuthButton
          label="Verify Code"
          loading={loading}
          icon="checkmark-circle-outline"
          onPress={handleVerify}
          disabled={otp.length < 6}
        />

        <View style={styles.resendSection}>
          {canResend ? (
            <Pressable onPress={handleResend}>
              <Text style={styles.resendLink}>Resend code</Text>
            </Pressable>
          ) : (
            <Text style={styles.resendTimer}>
              Resend code in{' '}
              <Text style={styles.timerValue}>
                {String(Math.floor(countdown / 60)).padStart(2, '0')}:
                {String(countdown % 60).padStart(2, '0')}
              </Text>
            </Text>
          )}
        </View>

        <View style={styles.hint}>
          <Text style={styles.hintText}>
            Didn't receive the code? Check your spam folder or try a different email address.
          </Text>
        </View>
      </AnimatedScreen>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  otpSection: {
    marginVertical: HydroSpacing.xl,
  },
  resendSection: {
    alignItems: 'center',
    marginTop: HydroSpacing.lg,
  },
  resendLink: {
    ...HydroTypography.labelLarge,
    color: HydroColors.primary,
  },
  resendTimer: {
    ...HydroTypography.bodyMedium,
    color: HydroColors.onSurfaceVariant,
  },
  timerValue: {
    fontWeight: '600',
    color: HydroColors.primary,
    fontVariant: ['tabular-nums'],
  },
  hint: {
    marginTop: HydroSpacing.xl,
    padding: 16,
    backgroundColor: HydroColors.surfaceContainer,
    borderRadius: 12,
  },
  hintText: {
    ...HydroTypography.labelMedium,
    color: HydroColors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 18,
  },
});
