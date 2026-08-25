import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDashboardTheme } from './ThemeContext';
import { DashboardLayout, DashboardShadows } from '@/constants/dashboard-theme';
import type { ScheduleSlot, WaterStatus } from '@/services/schedule';
import { supplyStatusLabel, formatTime12 } from '@/utils/format';

type WaterScheduleCardProps = {
  slots?: ScheduleSlot[];
  waterStatus?: WaterStatus | null;
  onViewWeeklySchedule?: () => void;
};

export function WaterScheduleCard({ slots, waterStatus, onViewWeeklySchedule }: WaterScheduleCardProps) {
  const { colors } = useDashboardTheme();

  const activeSlot = slots?.[0];
  const nextSlot = slots?.[1];
  const areaName = waterStatus?.kebele ?? activeSlot?.kebele ?? 'Kebele 01';
  const statusLabelText = waterStatus ? supplyStatusLabel(waterStatus.status) : 'Available';
  const startTimeText = activeSlot ? formatTime12(activeSlot.startTime) : '08:00 AM';
  const endTimeText = activeSlot ? formatTime12(activeSlot.endTime) : '01:00 PM';
  const footnoteText = nextSlot
    ? `Next Zone: ${nextSlot.kebele} scheduled at ${formatTime12(nextSlot.startTime)}`
    : 'Next Zone: Kebele 02 scheduled at 02:00 PM';

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
        Today's Water Schedule
      </Text>

      <View
        style={[
          styles.card,
          { backgroundColor: colors.surface, borderColor: colors.borderLight },
          DashboardShadows.soft,
        ]}
      >
        <View style={styles.cardHeader}>
          <View style={styles.headerLeft}>
            <View style={[styles.blueBadge, { backgroundColor: colors.primaryContainer }]}>
              <Ionicons name="time" size={18} color={colors.primary} />
            </View>
            <View>
              <Text style={[styles.title, { color: colors.textPrimary }]}>
                Today's Distribution
              </Text>
              <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                Area: {areaName}
              </Text>
            </View>
          </View>

          <View style={[styles.statusBadge, { backgroundColor: colors.successContainer }]}>
            <View style={[styles.dot, { backgroundColor: colors.success }]} />
            <Text style={[styles.statusText, { color: colors.onSuccessContainer }]}>{statusLabelText}</Text>
          </View>
        </View>

        {/* Timeline Visual Track */}
        <View style={styles.timelineContainer}>
          <View style={styles.timelineRow}>
            {/* Start Node */}
            <View style={styles.timeNode}>
              <View style={[styles.nodeCircle, { borderColor: colors.primary, backgroundColor: colors.surface }]}>
                <View style={[styles.innerDot, { backgroundColor: colors.primary }]} />
              </View>
              <Text style={[styles.timeLabel, { color: colors.textMuted }]}>Start</Text>
              <Text style={[styles.timeValue, { color: colors.textPrimary }]}>{startTimeText}</Text>
            </View>

            {/* Connecting Track Line */}
            <View style={styles.trackLineContainer}>
              <View style={[styles.trackLineBackground, { backgroundColor: colors.border }]} />
              <View style={[styles.trackLineActive, { backgroundColor: colors.primary }]} />
              <View style={[styles.progressBadge, { backgroundColor: colors.primaryContainer }]}>
                <Ionicons name="water" size={14} color={colors.primary} />
              </View>
            </View>

            {/* End Node */}
            <View style={styles.timeNode}>
              <View style={[styles.nodeCircle, { borderColor: colors.secondary, backgroundColor: colors.surface }]}>
                <View style={[styles.innerDot, { backgroundColor: colors.secondary }]} />
              </View>
              <Text style={[styles.timeLabel, { color: colors.textMuted }]}>End</Text>
              <Text style={[styles.timeValue, { color: colors.textPrimary }]}>{endTimeText}</Text>
            </View>
          </View>
        </View>

        {/* Schedule Footnote */}
        <View style={[styles.footerBanner, { backgroundColor: colors.surfaceVariant }]}>
          <Ionicons name="location" size={14} color={colors.primary} />
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>
            {footnoteText}
          </Text>
        </View>

        {/* Button */}
        <Pressable
          onPress={onViewWeeklySchedule}
          style={({ pressed }) => [
            styles.button,
            { borderColor: colors.primary },
            pressed && styles.pressed,
          ]}
        >
          <Text style={[styles.buttonText, { color: colors.primary }]}>View Weekly Schedule</Text>
          <Ionicons name="calendar-outline" size={16} color={colors.primary} />
        </Pressable>
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
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  blueBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  timelineContainer: {
    marginBottom: 18,
    paddingHorizontal: 8,
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeNode: {
    alignItems: 'center',
    width: 70,
  },
  nodeCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  innerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  timeLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  timeValue: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 2,
  },
  trackLineContainer: {
    flex: 1,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginHorizontal: 10,
    marginBottom: 24,
  },
  trackLineBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 4,
    borderRadius: 2,
  },
  trackLineActive: {
    position: 'absolute',
    left: 0,
    right: '35%',
    height: 4,
    borderRadius: 2,
  },
  progressBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1976D2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  footerBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 16,
  },
  footerText: {
    fontSize: 12,
    fontWeight: '500',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    gap: 6,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
});
