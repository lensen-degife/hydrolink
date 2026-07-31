import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  AnimatedScreen,
  AuthButton,
  FadeInView,
  HydroLogo,
  HydroWordmark,
  WaveDecoration,
} from '@/components/auth';
import { HydroColors, HydroSpacing, HydroTypography } from '@/constants/auth-theme';

const FEATURES = [
  { icon: '💧', title: 'Track Usage', desc: 'Monitor consumption in real-time' },
  { icon: '📊', title: 'Smart Billing', desc: 'Transparent, automated invoicing' },
  { icon: '🔔', title: 'Instant Alerts', desc: 'Leak detection & outage updates' },
] as const;

export default function WelcomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const isCompact = height < 700;

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={[HydroColors.gradientStart, HydroColors.gradientMid, HydroColors.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.hero, { paddingTop: insets.top + (isCompact ? 24 : 48) }]}>
        <FadeInView delay={100}>
          <HydroLogo size={isCompact ? 'md' : 'lg'} variant="light" />
        </FadeInView>
        <FadeInView delay={200}>
          <HydroWordmark variant="light" />
        </FadeInView>
        <WaveDecoration />
      </LinearGradient>

      <AnimatedScreen delay={300} style={styles.body}>
        <Text style={styles.heading}>Your water account, simplified</Text>
        <Text style={styles.description}>
          Manage bills, track usage, and report issues — all from one secure platform built for
          modern utility customers.
        </Text>

        <View style={styles.features}>
          {FEATURES.map((feature, index) => (
            <FadeInView key={feature.title} delay={400 + index * 100}>
              <View style={styles.featureRow}>
                <View style={styles.featureIcon}>
                  <Text style={styles.featureEmoji}>{feature.icon}</Text>
                </View>
                <View style={styles.featureText}>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDesc}>{feature.desc}</Text>
                </View>
              </View>
            </FadeInView>
          ))}
        </View>

        <View style={[styles.actions, { paddingBottom: insets.bottom + 16 }]}>
          <AuthButton
            label="Get Started"
            icon="arrow-forward"
            iconPosition="right"
            onPress={() => router.push('/(auth)/register')}
          />
          <AuthButton
            label="I already have an account"
            variant="outlined"
            onPress={() => router.push('/(auth)/login')}
            style={styles.secondaryButton}
          />
        </View>
      </AnimatedScreen>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: HydroColors.background,
  },
  hero: {
    alignItems: 'center',
    paddingBottom: 56,
    position: 'relative',
    overflow: 'hidden',
  },
  body: {
    flex: 1,
    marginTop: -32,
    backgroundColor: HydroColors.surface,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: HydroSpacing.lg,
    paddingTop: HydroSpacing.xl,
  },
  heading: {
    ...HydroTypography.headlineLarge,
    color: HydroColors.onSurface,
    textAlign: 'center',
  },
  description: {
    ...HydroTypography.bodyMedium,
    color: HydroColors.onSurfaceVariant,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
    paddingHorizontal: 8,
  },
  features: {
    marginTop: HydroSpacing.lg,
    gap: 12,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: HydroColors.surfaceContainer,
    borderRadius: 16,
    padding: 14,
  },
  featureIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: HydroColors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  featureEmoji: {
    fontSize: 22,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    ...HydroTypography.titleMedium,
    color: HydroColors.onSurface,
  },
  featureDesc: {
    ...HydroTypography.bodyMedium,
    color: HydroColors.onSurfaceVariant,
    marginTop: 2,
  },
  actions: {
    marginTop: 'auto',
    paddingTop: HydroSpacing.lg,
    gap: 12,
  },
  secondaryButton: {
    marginTop: 0,
  },
});
