import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
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
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
        keyboardShouldPersistTaps="handled">
        {/* Hero / gradient section */}
        <LinearGradient
          colors={[HydroColors.gradientStart, HydroColors.gradientMid, HydroColors.gradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.hero,
            {
              paddingTop: insets.top + (isCompact ? 20 : 40),
              minHeight: isCompact ? 180 : 220,
            },
          ]}>
          <FadeInView delay={100}>
            <HydroLogo size={isCompact ? 'md' : 'lg'} variant="light" />
          </FadeInView>
          <FadeInView delay={200}>
            <HydroWordmark variant="light" />
          </FadeInView>
          <WaveDecoration />
        </LinearGradient>

        {/* Body card that sits over the wave */}
        <AnimatedScreen delay={300} style={styles.body}>
          <Text style={[styles.heading, isCompact && styles.headingCompact]}>
            Your water account, simplified
          </Text>
          <Text style={styles.description}>
            Manage bills, track usage, and report issues — all from one secure platform built for
            modern utility customers.
          </Text>

          <View style={[styles.features, isCompact && styles.featuresCompact]}>
            {FEATURES.map((feature, index) => (
              <FadeInView key={feature.title} delay={400 + index * 100}>
                <View style={[styles.featureRow, isCompact && styles.featureRowCompact]}>
                  <View style={[styles.featureIcon, isCompact && styles.featureIconCompact]}>
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

          <View
            style={[
              styles.actions,
              { paddingBottom: Math.max(insets.bottom, 16) + 8 },
            ]}>
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: HydroColors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  hero: {
    alignItems: 'center',
    paddingBottom: 48,
    position: 'relative',
    overflow: 'hidden',
  },
  body: {
    flexGrow: 1,
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
  headingCompact: {
    fontSize: 20,
    lineHeight: 28,
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
  featuresCompact: {
    marginTop: HydroSpacing.md,
    gap: 8,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: HydroColors.surfaceContainer,
    borderRadius: 16,
    padding: 14,
  },
  featureRowCompact: {
    padding: 10,
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
  featureIconCompact: {
    width: 40,
    height: 40,
    marginRight: 12,
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