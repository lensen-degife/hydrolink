import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import { FadeInView, HydroLogo, HydroWordmark, WaveDecoration } from '@/components/auth';
import { HydroColors } from '@/constants/auth-theme';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function SplashScreenRoute() {
  const router = useRouter();
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.8);
  const progressWidth = useSharedValue(0);

  useEffect(() => {
    SplashScreen.hideAsync().catch(() => {});

    logoOpacity.value = withTiming(1, { duration: 800, easing: Easing.out(Easing.cubic) });
    logoScale.value = withTiming(1, { duration: 800, easing: Easing.out(Easing.back(1.2)) });
    progressWidth.value = withDelay(
      400,
      withTiming(1, { duration: 1800, easing: Easing.inOut(Easing.quad) }),
    );

    const timer = setTimeout(() => {
      router.replace('/(auth)/welcome');
    }, 2800);

    return () => clearTimeout(timer);
  }, [logoOpacity, logoScale, progressWidth, router]);

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value * 100}%`,
  }));

  return (
    <LinearGradient
      colors={[HydroColors.gradientStart, HydroColors.gradientMid, HydroColors.gradientEnd]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}>
      <WaveDecoration />

      <Animated.View style={[styles.center, logoStyle]}>
        <HydroLogo size="lg" animated variant="light" />
        <HydroWordmark variant="light" />
      </Animated.View>

      <FadeInView delay={600} style={styles.footer}>
        <View style={styles.progressTrack}>
          <Animated.View style={[styles.progressBar, progressStyle]} />
        </View>
      </FadeInView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    alignItems: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 80,
    width: '60%',
  },
  progressTrack: {
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 2,
  },
});
