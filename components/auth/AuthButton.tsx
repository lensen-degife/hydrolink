import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  type PressableProps,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { HydroColors, HydroRadius, HydroTypography } from '@/constants/auth-theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type AuthButtonProps = PressableProps & {
  label: string;
  variant?: 'filled' | 'outlined' | 'text' | 'tonal';
  loading?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
};

export function AuthButton({
  label,
  variant = 'filled',
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = true,
  disabled,
  style,
  ...props
}: AuthButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const isDisabled = disabled || loading;

  const variantStyles = {
    filled: {
      container: styles.filled,
      text: styles.filledText,
      iconColor: HydroColors.onPrimary,
    },
    outlined: {
      container: styles.outlined,
      text: styles.outlinedText,
      iconColor: HydroColors.primary,
    },
    text: {
      container: styles.textVariant,
      text: styles.textVariantText,
      iconColor: HydroColors.primary,
    },
    tonal: {
      container: styles.tonal,
      text: styles.tonalText,
      iconColor: HydroColors.primary,
    },
  }[variant];

  return (
    <AnimatedPressable
      {...props}
      disabled={isDisabled}
      onPressIn={() => {
        scale.value = withSpring(0.97, { damping: 15, stiffness: 300 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 15, stiffness: 300 });
      }}
      style={[
        styles.base,
        variantStyles.container,
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        animatedStyle,
        style,
      ]}>
      {loading ? (
        <ActivityIndicator color={variantStyles.iconColor} size="small" />
      ) : (
        <View style={styles.inner}>
          {icon && iconPosition === 'left' && (
            <Ionicons name={icon} size={20} color={variantStyles.iconColor} style={styles.iconLeft} />
          )}
          <Text style={[styles.label, variantStyles.text]}>{label}</Text>
          {icon && iconPosition === 'right' && (
            <Ionicons name={icon} size={20} color={variantStyles.iconColor} style={styles.iconRight} />
          )}
        </View>
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 52,
    borderRadius: HydroRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    ...HydroTypography.labelLarge,
    fontSize: 15,
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
  filled: {
    backgroundColor: HydroColors.primary,
  },
  filledText: {
    color: HydroColors.onPrimary,
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: HydroColors.outlineVariant,
  },
  outlinedText: {
    color: HydroColors.primary,
  },
  textVariant: {
    backgroundColor: 'transparent',
    height: 44,
  },
  textVariantText: {
    color: HydroColors.primary,
  },
  tonal: {
    backgroundColor: HydroColors.primaryContainer,
  },
  tonalText: {
    color: HydroColors.onPrimaryContainer,
  },
});
