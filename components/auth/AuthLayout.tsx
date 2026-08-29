import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { WaveDecoration } from '@/components/auth/AnimatedScreen';
import { HydroColors } from '@/constants/auth-theme';

type AuthLayoutProps = {
  children: React.ReactNode;
  header?: React.ReactNode;
  showGradient?: boolean;
  scrollable?: boolean;
};
export function AuthLayout({
  children,
  header,
  showGradient = true,
  scrollable = true,
}: AuthLayoutProps) {
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const isCompact = height < 700;
  // Adaptive gradient height so it doesn't eat too much space on short screens
  const gradientHeight = isCompact ? 140 : 180;

  const content = (
    <View
      style={[
        styles.content,
        showGradient && styles.contentWithGradient,
        !showGradient && { paddingTop: insets.top + 16 },
        { paddingBottom: Math.max(insets.bottom, 16) + 16 },
      ]}>
      {header}
      <View style={[styles.formCard, isCompact && styles.formCardCompact]}>{children}</View>
    </View>
  );

  return (
    <View style={styles.root}>
      {showGradient && (
        <LinearGradient
          colors={[HydroColors.gradientStart, HydroColors.gradientMid, HydroColors.gradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.gradientHeader,
            {
              height: gradientHeight + insets.top,
              paddingTop: insets.top + 12,
            },
          ]}>
          {header ? null : <View style={styles.gradientSpacer} />}
          <WaveDecoration />
        </LinearGradient>
      )}

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
        {scrollable ? (
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            bounces={true}>
            {content}
          </ScrollView>
        ) : (
          content
        )}
      </KeyboardAvoidingView>
    </View>
  );
}
export function AuthScreenContainer({
  children,
  centered = false,
}: {
  children: React.ReactNode;
  centered?: boolean;
}) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.screenContainer,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
        centered && styles.centered,
      ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: HydroColors.background,
  },
  flex: {
    flex: 1,
  },
  gradientHeader: {
    position: 'relative',
    overflow: 'hidden',
  },
  gradientSpacer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  contentWithGradient: {
    marginTop: -36,
  },
  formCard: {
    backgroundColor: HydroColors.surface,
    borderRadius: 24,
    padding: 28,
    shadowColor: HydroColors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(0,87,168,0.06)',
  },
  formCardCompact: {
    padding: 18,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: HydroColors.background,
    paddingHorizontal: 24,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
