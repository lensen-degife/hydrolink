import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { getPasswordStrength } from '@/utils/validation';
import { HydroColors, HydroRadius, HydroTypography } from '@/constants/auth-theme';

type PasswordStrengthIndicatorProps = {
  password: string;
};

export function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  if (!password) return null;

  const { score, label, color } = getPasswordStrength(password);

  return (
    <View style={styles.wrapper}>
      <View style={styles.bars}>
        {[1, 2, 3, 4].map((level) => (
          <View
            key={level}
            style={[
              styles.bar,
              {
                backgroundColor: level <= score ? color : HydroColors.outlineVariant,
              },
            ]}
          />
        ))}
      </View>
      <Text style={[styles.label, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: -8,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  bars: {
    flex: 1,
    flexDirection: 'row',
    gap: 4,
  },
  bar: {
    flex: 1,
    height: 4,
    borderRadius: HydroRadius.full,
  },
  label: {
    ...HydroTypography.labelMedium,
    minWidth: 44,
    textAlign: 'right',
  },
});
