import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { AnimatedWaterWave } from './AnimatedWaterWave';
import { DashboardLayout, DashboardShadows } from '@/constants/dashboard-theme';
import { useDashboardTheme } from './ThemeContext';

import type { ScheduleSlot, WaterStatus } from '@/services/schedule';
import { supplyStatusLabel, formatTime12 } from '@/utils/format';

type HeroStatusCardProps = {
  waterStatus?: WaterStatus | null;
  nextSlot?: ScheduleSlot | null;
  onPressSchedule?: () => void;
};

export function HeroStatusCard({ waterStatus, nextSlot, onPressSchedule }: HeroStatusCardProps) {
  const { isDark } = useDashboardTheme();

  const statusLabel = waterStatus ? supplyStatusLabel(waterStatus.status) : waterStatus === null ? 'Status unavailable' : 'Water Available';
  const kebeleLabel = waterStatus?.kebele ?? 'Kebele 01';
  const nextDistLabel = nextSlot
    ? `${formatTime12(nextSlot.startTime)} - ${formatTime12(nextSlot.endTime)}`
    : nextSlot === null
      ? 'No schedule returned'
    : 'Tomorrow • 08:00 AM';

  // Vibrant water-themed gradient colors
  const gradientColors = isDark
    ? ['#0F3860', '#1976D2', '#0D47A1']
    : ['#1976D2', '#1565C0', '#0D47A1'];

  return (
    <View style={styles.outerContainer}>
      <LinearGradient
        colors={gradientColors as [string, string, ...string[]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.cardGradient}
      >
        {/* Decorative background glow circle */}
        <View style={styles.glowCircle} />
        
        {/* Header Row */}
        <View style={styles.cardHeader}>
          <View style={styles.titleRow}>
            <View style={styles.dropBadge}>
              <MaterialCommunityIcons name="water" size={20} color="#FFFFFF" />
            </View>
            <Text style={styles.cardTitle}>{waterStatus?.kebele ? `${waterStatus.kebele} Status` : 'Community Status'}</Text>
          </View>
          <View style={styles.statusPill}>
            <View style={styles.greenDot} />
            <Text style={styles.statusText}>{statusLabel}</Text>
          </View>
        </View>

        {/* Key Metrics Info Grid */}
        <View style={styles.detailsGrid}>
          {/* Item 1: Water Source */}
          <View style={styles.detailBox}>
            <Text style={styles.detailLabel}>Water Source</Text>
            <View style={styles.valueRow}>
              <Ionicons name="water-outline" size={15} color="#90CAF9" />
              <Text style={styles.detailValue} numberOfLines={1}>
                Chilashe Source
              </Text>
            </View>
          </View>

          {/* Item 2: Service Area */}
          <View style={styles.detailBox}>
            <Text style={styles.detailLabel}>Service Area</Text>
            <View style={styles.valueRow}>
              <Ionicons name="location-outline" size={15} color="#90CAF9" />
              <Text style={styles.detailValue}>{kebeleLabel}</Text>
            </View>
          </View>

          {/* Item 3: Pressure */}
          <View style={styles.detailBox}>
            <Text style={styles.detailLabel}>Water Pressure</Text>
            <View style={styles.valueRow}>
              <Ionicons name="speedometer-outline" size={15} color="#81C784" />
              <Text style={[styles.detailValue, { color: '#E8F5E9' }]}>Normal (3.2 Bar)</Text>
            </View>
          </View>

          {/* Item 4: Last Updated */}
          <View style={styles.detailBox}>
            <Text style={styles.detailLabel}>Last Updated</Text>
            <View style={styles.valueRow}>
              <Ionicons name="time-outline" size={15} color="#90CAF9" />
              <Text style={styles.detailValue}>10 mins ago</Text>
            </View>
          </View>
        </View>

        {/* Divider / Distribution Banner */}
        <View style={styles.distributionBanner}>
          <View style={styles.distributionLeft}>
            <Ionicons name="calendar-outline" size={18} color="#E3F2FD" />
            <View style={{ marginLeft: 8 }}>
              <Text style={styles.distLabel}>Next Distribution</Text>
              <Text style={styles.distValue}>{nextDistLabel}</Text>
            </View>
          </View>
          <View style={styles.activeTag}>
            <Text style={styles.activeTagText}>Scheduled</Text>
          </View>
        </View>

        {/* Animated Water Wave Component */}
        <AnimatedWaterWave height={65} />

        {/* Button */}
        <View style={styles.buttonContainer}>
          <Pressable
            onPress={onPressSchedule}
            style={({ pressed }) => [
              styles.scheduleButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.buttonText}>View Full Schedule</Text>
            <Ionicons name="arrow-forward-outline" size={18} color="#1976D2" />
          </Pressable>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    marginHorizontal: DashboardLayout.containerPadding,
    borderRadius: DashboardLayout.cardRadius,
    ...DashboardShadows.hero,
  },
  cardGradient: {
    borderRadius: DashboardLayout.cardRadius,
    padding: 22,
    paddingBottom: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  glowCircle: {
    position: 'absolute',
    top: -50,
    right: -40,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dropBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(34, 197, 94, 0.25)',
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22C55E',
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
    marginBottom: 16,
  },
  detailBox: {
    width: '50%',
    paddingHorizontal: 6,
    marginBottom: 14,
  },
  detailLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.75)',
    fontWeight: '500',
    marginBottom: 4,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  distributionBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.18)',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  distributionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distLabel: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  distValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  activeTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  activeTagText: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  buttonContainer: {
    marginTop: 10,
    zIndex: 10,
  },
  scheduleButton: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: '#1976D2',
    fontSize: 15,
    fontWeight: '700',
  },
});
