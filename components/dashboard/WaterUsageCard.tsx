import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDashboardTheme } from './ThemeContext';
import { DashboardLayout, DashboardShadows } from '@/constants/dashboard-theme';

export function WaterUsageCard() {
  const { colors } = useDashboardTheme();

  // Data points for past 6 months (Feb to Jul)
  const monthlyData = [
    { month: 'Mar', val: 24, label: '24 m³' },
    { month: 'Apr', val: 26, label: '26 m³' },
    { month: 'May', val: 30, label: '30 m³' },
    { month: 'Jun', val: 28, label: '28 m³' },
    { month: 'Jul', val: 32, label: '32 m³', active: true },
  ];

  const maxVal = 40;

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Water Usage Analytics</Text>

      <View
        style={[
          styles.card,
          { backgroundColor: colors.surface, borderColor: colors.borderLight },
          DashboardShadows.soft,
        ]}
      >
        {/* Main Stats Header */}
        <View style={styles.statsRow}>
          <View>
            <Text style={[styles.label, { color: colors.textMuted }]}>Current Month Usage</Text>
            <View style={styles.valueRow}>
              <Text style={[styles.mainValue, { color: colors.textPrimary }]}>32</Text>
              <Text style={[styles.unit, { color: colors.primary }]}>m³</Text>
            </View>
          </View>

          <View style={styles.rightStats}>
            <View style={[styles.trendBadge, { backgroundColor: colors.warningContainer }]}>
              <Ionicons name="trending-up" size={14} color={colors.warning} />
              <Text style={[styles.trendText, { color: colors.onWarningContainer }]}>
                +14.3%
              </Text>
            </View>
            <Text style={[styles.prevMonthText, { color: colors.textSecondary }]}>
              Prev: 28 m³
            </Text>
          </View>
        </View>

        {/* Custom Mini Bar / Line Analytics Visual Chart */}
        <View style={styles.chartContainer}>
          <View style={styles.chartBarsRow}>
            {monthlyData.map((item, index) => {
              const heightPercent = (item.val / maxVal) * 100;
              return (
                <View key={index} style={styles.barColumn}>
                  <Text style={[styles.barValueLabel, { color: item.active ? colors.primary : colors.textMuted }]}>
                    {item.val}
                  </Text>
                  <View style={[styles.barTrack, { backgroundColor: colors.surfaceVariant }]}>
                    <View
                      style={[
                        styles.barFill,
                        {
                          height: `${heightPercent}%`,
                          backgroundColor: item.active ? colors.primary : '#90CAF9',
                        },
                      ]}
                    />
                  </View>
                  <Text
                    style={[
                      styles.monthLabel,
                      { color: item.active ? colors.primary : colors.textMuted },
                      item.active && { fontWeight: '700' },
                    ]}
                  >
                    {item.month}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Water Saving Tip Banner */}
        <View style={[styles.tipBanner, { backgroundColor: colors.secondaryContainer }]}>
          <View style={styles.tipIconWrapper}>
            <Ionicons name="bulb-outline" size={18} color={colors.secondaryDark} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.tipTitle, { color: colors.onSecondaryContainer }]}>
              Water Saving Tip
            </Text>
            <Text style={[styles.tipText, { color: colors.onSecondaryContainer }]}>
              Fixing a leaky faucet can save up to 20 liters of water daily!
            </Text>
          </View>
        </View>
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
    marginBottom: 12,
    letterSpacing: -0.2,
  },
  card: {
    borderRadius: DashboardLayout.cardRadius,
    padding: 20,
    borderWidth: 1,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  mainValue: {
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  unit: {
    fontSize: 16,
    fontWeight: '700',
  },
  rightStats: {
    alignItems: 'flex-end',
    gap: 4,
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '700',
  },
  prevMonthText: {
    fontSize: 12,
    fontWeight: '500',
  },
  chartContainer: {
    marginVertical: 10,
    paddingBottom: 10,
  },
  chartBarsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    height: 120,
  },
  barColumn: {
    alignItems: 'center',
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end',
  },
  barValueLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 6,
  },
  barTrack: {
    width: 14,
    height: 75,
    borderRadius: 7,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  barFill: {
    width: '100%',
    borderRadius: 7,
  },
  monthLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 8,
  },
  tipBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 14,
    marginTop: 10,
  },
  tipIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tipTitle: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 1,
  },
  tipText: {
    fontSize: 11,
    lineHeight: 15,
  },
});
