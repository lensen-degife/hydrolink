import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useDashboardTheme } from './ThemeContext';
import { DashboardLayout, DashboardShadows } from '@/constants/dashboard-theme';

type SummaryGridProps = {
  onPressCard?: (type: string) => void;
};

export function TodaySummaryGrid({ onPressCard }: SummaryGridProps) {
  const { colors } = useDashboardTheme();

  const summaryItems = [
    {
      id: 'water_status',
      title: 'Water Status',
      value: 'Available',
      subtitle: 'Normal Supply',
      icon: (color: string) => <MaterialCommunityIcons name="water-check" size={24} color={color} />,
      badgeColor: colors.success,
      badgeBg: colors.successContainer,
      accentColor: '#1976D2',
    },
    {
      id: 'pending_bill',
      title: 'Pending Bill',
      value: '450 ETB',
      subtitle: 'Due Aug 10',
      icon: (color: string) => <Ionicons name="card-outline" size={24} color={color} />,
      badgeColor: colors.warning,
      badgeBg: colors.warningContainer,
      accentColor: '#F59E0B',
    },
    {
      id: 'announcements',
      title: 'Announcements',
      value: '3 New',
      subtitle: 'Community News',
      icon: (color: string) => <Ionicons name="megaphone-outline" size={24} color={color} />,
      badgeColor: colors.primary,
      badgeBg: colors.primaryContainer,
      accentColor: '#26A69A',
    },
    {
      id: 'active_reports',
      title: 'Active Reports',
      value: '1 Active',
      subtitle: 'Leak Ticket',
      icon: (color: string) => <Ionicons name="alert-circle-outline" size={24} color={color} />,
      badgeColor: colors.error,
      badgeBg: colors.errorContainer,
      accentColor: '#EF4444',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Today's Summary</Text>

      <View style={styles.grid}>
        {summaryItems.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => onPressCard?.(item.id)}
            style={({ pressed }) => [
              styles.card,
              { backgroundColor: colors.surface, borderColor: colors.borderLight },
              DashboardShadows.soft,
              pressed && styles.pressed,
            ]}
          >
            <View style={styles.cardHeader}>
              <View style={[styles.iconContainer, { backgroundColor: item.badgeBg }]}>
                {item.icon(item.badgeColor)}
              </View>
              <View style={[styles.indicatorPill, { backgroundColor: item.badgeBg }]}>
                <Text style={[styles.indicatorText, { color: item.badgeColor }]}>
                  {item.id === 'water_status' ? '🟢' : '•'}
                </Text>
              </View>
            </View>

            <Text style={[styles.itemTitle, { color: colors.textMuted }]}>{item.title}</Text>
            <Text style={[styles.itemValue, { color: colors.textPrimary }]}>{item.value}</Text>
            <Text style={[styles.itemSubtitle, { color: colors.textSecondary }]}>
              {item.subtitle}
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
  card: {
    width: '48%',
    borderRadius: DashboardLayout.cardRadius,
    padding: 16,
    borderWidth: 1,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.97 }],
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorPill: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  indicatorText: {
    fontSize: 10,
    fontWeight: '700',
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemValue: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  itemSubtitle: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 2,
  },
});
