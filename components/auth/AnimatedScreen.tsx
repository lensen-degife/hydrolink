import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import { HydroColors } from '@/constants/auth-theme';

type AnimatedScreenProps = {
  children: React.ReactNode;
  delay?: number;
  style?: object;
};

export function AnimatedScreen({ children, delay = 0, style }: AnimatedScreenProps) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(24);

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withTiming(1, { duration: 500, easing: Easing.out(Easing.cubic) }),
    );
    translateY.value = withDelay(
      delay,
      withTiming(0, { duration: 500, easing: Easing.out(Easing.cubic) }),
    );
  }, [delay, opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle, style]}>
      {children}
    </Animated.View>
  );
}

export function FadeInView({
  children,
  delay = 0,
  duration = 400,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  style?: object;
}) {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withTiming(1, { duration, easing: Easing.out(Easing.quad) }),
    );
  }, [delay, duration, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return <Animated.View style={[animatedStyle, style]}>{children}</Animated.View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export function WaveDecoration() {
  const wave1 = useSharedValue(0);
  const wave2 = useSharedValue(0);

  useEffect(() => {
    wave1.value = withTiming(1, { duration: 3000, easing: Easing.inOut(Easing.sin) });
    wave2.value = withDelay(
      500,
      withTiming(1, { duration: 3500, easing: Easing.inOut(Easing.sin) }),
    );
  }, [wave1, wave2]);

  const wave1Style = useAnimatedStyle(() => ({
    transform: [{ translateX: wave1.value * 20 - 10 }],
  }));

  const wave2Style = useAnimatedStyle(() => ({
    transform: [{ translateX: wave2.value * -15 + 7 }],
  }));

  return (
    <View style={waveStyles.container} pointerEvents="none">
      <Animated.View style={[waveStyles.wave, waveStyles.wave1, wave1Style]} />
      <Animated.View style={[waveStyles.wave, waveStyles.wave2, wave2Style]} />
    </View>
  );
}

const waveStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    overflow: 'hidden',
  },
  wave: {
    position: 'absolute',
    bottom: -40,
    left: -50,
    right: -50,
    height: 100,
    borderRadius: 100,
  },
  wave1: {
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  wave2: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    bottom: -20,
  },
});
