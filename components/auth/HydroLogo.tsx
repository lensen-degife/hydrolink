import { Ionicons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { HydroColors, HydroRadius } from '@/constants/auth-theme';

type HydroLogoProps = {
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  variant?: 'light' | 'dark';
};

const SIZES = { sm: 48, md: 72, lg: 96 };

export function HydroLogo({ size = 'md', animated = false, variant = 'light' }: HydroLogoProps) {
  const dimension = SIZES[size];
  const scale = useSharedValue(1);
  const ripple = useSharedValue(0);

  useEffect(() => {
    if (!animated) return;
    scale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      false,
    );
    ripple.value = withRepeat(
      withTiming(1, { duration: 2000, easing: Easing.out(Easing.quad) }),
      -1,
      false,
    );
  }, [animated, ripple, scale]);

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const rippleStyle = useAnimatedStyle(() => ({
    opacity: 1 - ripple.value,
    transform: [{ scale: 1 + ripple.value * 0.6 }],
  }));

  const isLight = variant === 'light';

  return (
    <View style={[styles.wrapper, { width: dimension + 32, height: dimension + 32 }]}>
      {animated && (
        <Animated.View
          style={[
            styles.ripple,
            { width: dimension + 32, height: dimension + 32, borderRadius: (dimension + 32) / 2 },
            rippleStyle,
          ]}
        />
      )}
      <Animated.View
        style={[
          styles.logoContainer,
          {
            width: dimension,
            height: dimension,
            borderRadius: dimension * 0.28,
            backgroundColor: isLight ? 'rgba(255,255,255,0.2)' : HydroColors.primaryContainer,
          },
          animated && logoStyle,
        ]}>
        <Ionicons
          name="water"
          size={dimension * 0.5}
          color={isLight ? HydroColors.onPrimary : HydroColors.primary}
        />
      </Animated.View>
    </View>
  );
}

export function HydroWordmark({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const color = variant === 'light' ? HydroColors.onPrimary : HydroColors.primary;
  const subColor = variant === 'light' ? 'rgba(255,255,255,0.75)' : HydroColors.onSurfaceVariant;

  return (
    <View style={styles.wordmark}>
      <Animated.Text style={[styles.brand, { color }]}>HydroLink</Animated.Text>
      <Animated.Text style={[styles.tagline, { color: subColor }]}>
        Smart Water Management
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ripple: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  wordmark: {
    alignItems: 'center',
    marginTop: 16,
  },
  brand: {
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 4,
    letterSpacing: 0.5,
  },
});

export function HydroLogoCompact() {
  return (
    <View style={compactStyles.row}>
      <View style={compactStyles.icon}>
        <Ionicons name="water" size={22} color={HydroColors.primary} />
      </View>
      <Animated.Text style={compactStyles.text}>HydroLink</Animated.Text>
    </View>
  );
}

const compactStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  icon: {
    width: 36,
    height: 36,
    borderRadius: HydroRadius.sm,
    backgroundColor: HydroColors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: '700',
    color: HydroColors.primary,
    letterSpacing: -0.25,
  },
});
