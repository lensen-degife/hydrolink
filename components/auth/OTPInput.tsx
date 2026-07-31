import React, { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { HydroColors, HydroRadius, HydroTypography } from '@/constants/auth-theme';

type OTPInputProps = {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

export function OTPInput({ length = 6, value, onChange, error }: OTPInputProps) {
  const inputRef = useRef<TextInput>(null);
  const [focused, setFocused] = useState(false);
  const shake = useSharedValue(0);

  const triggerShake = () => {
    shake.value = withSequence(
      withTiming(-8, { duration: 50 }),
      withTiming(8, { duration: 50 }),
      withTiming(-6, { duration: 50 }),
      withTiming(6, { duration: 50 }),
      withTiming(0, { duration: 50 }),
    );
  };

  React.useEffect(() => {
    if (error) triggerShake();
  }, [error]);

  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shake.value }],
  }));

  const digits = value.padEnd(length, ' ').split('').slice(0, length);
  const activeIndex = Math.min(value.length, length - 1);

  return (
    <View style={styles.wrapper}>
      <Pressable onPress={() => inputRef.current?.focus()}>
        <Animated.View style={[styles.row, shakeStyle]}>
          {digits.map((digit, index) => {
            const isActive = focused && index === activeIndex;
            const isFilled = digit.trim() !== '';

            return (
              <View
                key={index}
                style={[
                  styles.cell,
                  isActive && styles.cellActive,
                  isFilled && styles.cellFilled,
                  error && styles.cellError,
                ]}>
                <Text style={[styles.digit, isFilled && styles.digitFilled]}>
                  {digit.trim() || (isActive ? '|' : '')}
                </Text>
              </View>
            );
          })}
        </Animated.View>
      </Pressable>

      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={(text) => onChange(text.replace(/\D/g, '').slice(0, length))}
        keyboardType="number-pad"
        maxLength={length}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={styles.hiddenInput}
        autoComplete="one-time-code"
        textContentType="oneTimeCode"
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  cell: {
    width: 48,
    height: 56,
    borderRadius: HydroRadius.md,
    borderWidth: 1.5,
    borderColor: HydroColors.outlineVariant,
    backgroundColor: HydroColors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellActive: {
    borderColor: HydroColors.primary,
    borderWidth: 2,
    backgroundColor: HydroColors.primaryContainer + '40',
  },
  cellFilled: {
    borderColor: HydroColors.primary,
    backgroundColor: HydroColors.surface,
  },
  cellError: {
    borderColor: HydroColors.error,
    backgroundColor: HydroColors.errorContainer + '30',
  },
  digit: {
    ...HydroTypography.headlineMedium,
    color: HydroColors.outline,
  },
  digitFilled: {
    color: HydroColors.onSurface,
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    height: 0,
    width: 0,
  },
  errorText: {
    ...HydroTypography.labelMedium,
    color: HydroColors.error,
    marginTop: 12,
    textAlign: 'center',
  },
});
