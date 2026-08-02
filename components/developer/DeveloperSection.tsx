import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { DashboardLayout, DashboardShadows } from '@/constants/dashboard-theme';
import { ThemePalette } from '@/components/dashboard/ThemeContext';

type DeveloperSectionProps = {
  colors: ThemePalette;
  icon: React.ComponentProps<typeof Ionicons>['name'];
  title: string;
  children: React.ReactNode;
};

export function DeveloperSection({ colors, icon, title, children }: DeveloperSectionProps) {
  return (
    <View style={[styles.card, DashboardShadows.soft, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={styles.heading}>
        <View style={[styles.iconContainer, { backgroundColor: colors.primaryContainer }]}>
          <Ionicons name={icon} size={20} color={colors.primary} />
        </View>
        <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

type ActionButtonProps = {
  colors: ThemePalette;
  icon: React.ComponentProps<typeof Ionicons>['name'];
  label: string;
  onPress: () => void;
  variant?: 'filled' | 'outlined';
};

export function DeveloperActionButton({
  colors,
  icon,
  label,
  onPress,
  variant = 'outlined',
}: ActionButtonProps) {
  const filled = variant === 'filled';

  return (
    <Pressable
      accessibilityRole="button"
      android_ripple={{ color: filled ? 'rgba(255,255,255,0.2)' : colors.primaryContainer }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.actionButton,
        {
          backgroundColor: filled ? colors.primary : colors.surface,
          borderColor: colors.primary,
          opacity: pressed ? 0.88 : 1,
        },
      ]}
    >
      <Ionicons name={icon} size={18} color={filled ? colors.textOnPrimary : colors.primary} />
      <Text style={[styles.actionLabel, { color: filled ? colors.textOnPrimary : colors.primary }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: DashboardLayout.cardRadius,
    borderWidth: 1,
    marginBottom: 16,
    padding: 18,
  },
  heading: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  iconContainer: {
    alignItems: 'center',
    borderRadius: 12,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  title: {
    fontSize: 17,
    fontWeight: '800',
  },
  actionButton: {
    alignItems: 'center',
    borderRadius: DashboardLayout.buttonRadius,
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    minHeight: 48,
    overflow: 'hidden',
    paddingHorizontal: 12,
  },
  actionLabel: {
    fontSize: 14,
    fontWeight: '700',
  },
});
