import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import {
  AnimatedScreen,
  AuthButton,
  AuthHeader,
  AuthLayout,
  OTPInput,
} from '@/components/auth';
import { HydroColors, HydroSpacing, HydroTypography } from '@/constants/auth-theme';
import { otpSchema, validateForm } from '@/utils/validation';
import { sendOtp, verifyOtp } from '@/services/auth';
import { ApiError } from '@/services/api';

const RESEND_COOLDOWN = 60;

export default function OTPVerificationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ email?: string; flow?: string }>();
  const email = params.email ?? '';
  const flow = (params.flow === 'reset' ? 'reset' : 'register') as 'register' | 'reset';

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

  const handleResend = useCallback(async () => {
    if (!canResend || !email) return;

    setCountdown(RESEND_COOLDOWN);
    setCanResend(false);
    setOtp('');
    setError('');

    try {
      await sendOtp(email, flow);
      Alert.alert('Code sent', 'A new verification code was sent. Check Render logs for the OTP.');
    } catch (err) {
      console.log('RESEND OTP ERROR:', err);
      const message =
        err instanceof ApiError
          ? err.message
          : err instanceof Error
            ? err.message
            : 'Could not resend code.';
      Alert.alert('Resend failed', message);
      setCanResend(true);
      setCountdown(0);
    }
  }, [canResend, email, flow]);

  const handleVerify = async () => {
    if (!email) {
      setError('Missing email. Go back and try again.');
      return;
    }

    const result = validateForm(otpSchema, { otp });
    if (!result.success) {
      setError(result.errors.otp ?? 'Invalid code');
      return;
    }

    setError('');
    setLoading(true);
    try {
      await verifyOtp(email, result.data.otp, flow);

      if (flow === 'reset') {
        router.push({
          pathname: '/(auth)/reset-password',
          params: { email, otp: result.data.otp }, // needed later for reset-password API
        });
      } else {
        // Register does not return tokens — user must sign in
        Alert.alert('Verified', 'Your email is verified. Please sign in.', [
          { text: 'Sign in', onPress: () => router.replace('/(auth)/login') },
        ]);
      }
    } catch (err) {
      console.log('VERIFY OTP ERROR:', err);
      const message =
        err instanceof ApiError
          ? err.message
          : err instanceof Error
            ? err.message
            : 'Invalid or expired code.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const maskedEmail = email.includes('@')
    ? email.replace(/(.{2})(.*)(@.*)/, '$1***$3')
    : email || 'your email';

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
            Dev mode: OTP is printed in Render logs as [OTP] email (register): ######
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