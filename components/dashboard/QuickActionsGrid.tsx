import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useDashboardTheme } from './ThemeContext';
import { DashboardLayout, DashboardShadows } from '@/constants/dashboard-theme';

type ActionItem = {
  id: string;
  label: string;
  iconName: string;
  iconType: 'ionicons' | 'material';
  color?: string;
};

type QuickActionsProps = {
  onActionPress?: (actionId: string) => void;
};

export function QuickActionsGrid({ onActionPress }: QuickActionsProps) {
  const { colors } = useDashboardTheme();

  const actions: ActionItem[] = [
    { id: 'pay_bill', label: 'Pay Bill', iconName: 'card-outline', iconType: 'ionicons' },
    { id: 'schedule', label: 'Schedule', iconName: 'calendar-outline', iconType: 'ionicons' },
    { id: 'report_issue', label: 'Report Issue', iconName: 'alert-triangle-outline', iconType: 'ionicons' },
    { id: 'announcements', label: 'Announcements', iconName: 'megaphone-outline', iconType: 'ionicons' },
    { id: 'scan_meter', label: 'Scan Meter', iconName: 'qrcode-scan', iconType: 'material' },
    { id: 'payment_history', label: 'Payment History', iconName: 'receipt-outline', iconType: 'ionicons' },
  ];

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Quick Actions</Text>

      <View style={styles.grid}>
        {actions.map((action) => (
          <Pressable
            key={action.id}
            onPress={() => onActionPress?.(action.id)}
            style={({ pressed }) => [
              styles.actionCard,
              { backgroundColor: colors.surface, borderColor: colors.borderLight },
              DashboardShadows.soft,
              pressed && styles.pressed,
            ]}
          >
            {/* Circular blue background icon container */}
            <View style={styles.circleIconBackground}>
              {action.iconType === 'ionicons' ? (
                <Ionicons name={action.iconName as any} size={24} color="#FFFFFF" />
              ) : (
                <MaterialCommunityIcons name={action.iconName as any} size={24} color="#FFFFFF" />
              )}
            </View>
            <Text style={[styles.actionLabel, { color: colors.textPrimary }]} numberOfLines={1}>
              {action.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: DashboardLayout.containerPadding,
    marginTop: DashboardLayout.sectionSpacing,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 14,
    letterSpacing: -0.2,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionCard: {
    width: '31%',
    aspectRatio: 1,
    borderRadius: DashboardLayout.cardRadius,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.94 }],
  },
  circleIconBackground: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1976D2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#1976D2',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  actionLabel: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
});
