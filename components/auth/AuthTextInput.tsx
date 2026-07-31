import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { HydroColors, HydroRadius, HydroTypography } from '@/constants/auth-theme';

type AuthTextInputProps = TextInputProps & {
  label: string;
  error?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  isPassword?: boolean;
};

export function AuthTextInput({
  label,
  error,
  icon,
  isPassword = false,
  value,
  onFocus,
  onBlur,
  ...props
}: AuthTextInputProps) {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const focusProgress = useSharedValue(0);

  const handleFocus = (e: Parameters<NonNullable<TextInputProps['onFocus']>>[0]) => {
    setFocused(true);
    focusProgress.value = withTiming(1, { duration: 200 });
    onFocus?.(e);
  };

  const handleBlur = (e: Parameters<NonNullable<TextInputProps['onBlur']>>[0]) => {
    setFocused(false);
    focusProgress.value = withTiming(0, { duration: 200 });
    onBlur?.(e);
  };

  const borderStyle = useAnimatedStyle(() => ({
    borderColor: error
      ? HydroColors.error
      : interpolateColor(focusProgress.value, [0, 1], [HydroColors.outlineVariant, HydroColors.primary]),
  }));

  const labelStyle = useAnimatedStyle(() => ({
    color: error
      ? HydroColors.error
      : interpolateColor(focusProgress.value, [0, 1], [HydroColors.onSurfaceVariant, HydroColors.primary]),
  }));

  return (
    <View style={styles.wrapper}>
      <Animated.Text style={[styles.label, labelStyle]}>{label}</Animated.Text>
      <Animated.View style={[styles.inputContainer, borderStyle, error && styles.inputError]}>
        {icon && (
          <Ionicons
            name={icon}
            size={20}
            color={focused ? HydroColors.primary : HydroColors.onSurfaceVariant}
            style={styles.icon}
          />
        )}
        <TextInput
          {...props}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={isPassword && !showPassword}
          placeholderTextColor={HydroColors.outline}
          style={[styles.input, icon && styles.inputWithIcon]}
          autoCapitalize={isPassword ? 'none' : props.autoCapitalize}
        />
        {isPassword && (
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            hitSlop={8}
            style={styles.eyeButton}>
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={HydroColors.onSurfaceVariant}
            />
          </Pressable>
        )}
      </Animated.View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  label: {
    ...HydroTypography.labelMedium,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: HydroColors.surfaceContainer,
    borderRadius: HydroRadius.md,
    borderWidth: 1.5,
    minHeight: 52,
    paddingHorizontal: 14,
  },
  inputError: {
    backgroundColor: HydroColors.errorContainer + '30',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    ...HydroTypography.bodyLarge,
    color: HydroColors.onSurface,
    paddingVertical: 12,
  },
  inputWithIcon: {
    paddingLeft: 0,
  },
  eyeButton: {
    padding: 4,
  },
  errorText: {
    ...HydroTypography.labelMedium,
    color: HydroColors.error,
    marginTop: 4,
    marginLeft: 4,
  },
});
