import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { HydroColors, HydroSpacing, HydroTypography } from '@/constants/auth-theme';

type AuthHeaderProps = {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
};

export function AuthHeader({ title, subtitle, showBack = true, onBack }: AuthHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      {showBack && (
        <Pressable onPress={handleBack} style={styles.backButton} hitSlop={12}>
          <Ionicons name="arrow-back" size={22} color={HydroColors.onSurface} />
        </Pressable>
      )}
      <View style={[styles.textContainer, !showBack && styles.textCentered]}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {showBack && <View style={styles.spacer} />}
    </View>
  );
}

export function AuthFooterLink({
  text,
  linkText,
  onPress,
}: {
  text: string;
  linkText: string;
  onPress: () => void;
}) {
  return (
    <View style={footerStyles.container}>
      <Text style={footerStyles.text}>{text} </Text>
      <Pressable onPress={onPress} hitSlop={8}>
        <Text style={footerStyles.link}>{linkText}</Text>
      </Pressable>
    </View>
  );
}

export function AuthDivider({ label = 'or' }: { label?: string }) {
  return (
    <View style={dividerStyles.container}>
      <View style={dividerStyles.line} />
      <Text style={dividerStyles.label}>{label}</Text>
      <View style={dividerStyles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: HydroSpacing.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: HydroColors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  textCentered: {
    alignItems: 'center',
  },
  title: {
    ...HydroTypography.headlineLarge,
    color: HydroColors.onSurface,
  },
  subtitle: {
    ...HydroTypography.bodyMedium,
    color: HydroColors.onSurfaceVariant,
    marginTop: 4,
  },
  spacer: {
    width: 40,
  },
});

const footerStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: HydroSpacing.lg,
  },
  text: {
    ...HydroTypography.bodyMedium,
    color: HydroColors.onSurfaceVariant,
  },
  link: {
    ...HydroTypography.labelLarge,
    color: HydroColors.primary,
  },
});

const dividerStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: HydroSpacing.lg,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: HydroColors.outlineVariant,
  },
  label: {
    ...HydroTypography.labelMedium,
    color: HydroColors.onSurfaceVariant,
    marginHorizontal: 16,
    textTransform: 'uppercase',
  },
});
