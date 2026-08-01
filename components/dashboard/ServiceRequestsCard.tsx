import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDashboardTheme } from './ThemeContext';
import { DashboardLayout, DashboardShadows } from '@/constants/dashboard-theme';

type ServiceRequestsProps = {
  onPressRequestDetails?: () => void;
};

export function ServiceRequestsCard({ onPressRequestDetails }: ServiceRequestsProps) {
  const { colors } = useDashboardTheme();

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Service Requests</Text>
        <View style={[styles.activeCountBadge, { backgroundColor: colors.primaryContainer }]}>
          <Text style={[styles.activeCountText, { color: colors.primary }]}>1 Active</Text>
        </View>
      </View>

      <View
        style={[
          styles.card,
          { backgroundColor: colors.surface, borderColor: colors.borderLight },
          DashboardShadows.soft,
        ]}
      >
        <View style={styles.topBar}>
          <View style={styles.titleArea}>
            <View style={[styles.iconWrapper, { backgroundColor: colors.warningContainer }]}>
              <Ionicons name="construct-outline" size={20} color={colors.warning} />
            </View>
            <View>
              <Text style={[styles.requestTitle, { color: colors.textPrimary }]}>Leak Report</Text>
              <Text style={[styles.ticketId, { color: colors.textMuted }]}>Ticket #REQ-4092</Text>
            </View>
          </View>

          <View style={[styles.statusPill, { backgroundColor: colors.warningContainer }]}>
            <View style={[styles.statusDot, { backgroundColor: colors.warning }]} />
            <Text style={[styles.statusText, { color: colors.onWarningContainer }]}>In Progress</Text>
          </View>
        </View>

        {/* Details Grid */}
        <View style={[styles.detailsBox, { backgroundColor: colors.surfaceVariant }]}>
          <View style={styles.detailRow}>
            <Ionicons name="person-outline" size={16} color={colors.primary} />
            <Text style={[styles.detailLabel, { color: colors.textMuted }]}>Technician Assigned:</Text>
            <Text style={[styles.detailValue, { color: colors.textPrimary }]}>
              Dawit Alemu (Senior Tech)
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="time-outline" size={16} color={colors.primary} />
            <Text style={[styles.detailLabel, { color: colors.textMuted }]}>Estimated Completion:</Text>
            <Text style={[styles.detailValue, { color: colors.textPrimary }]}>
              Tomorrow, 11:00 AM
            </Text>
          </View>
        </View>

        {/* Progress Tracker Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressLabels}>
            <Text style={[styles.progressStep, { color: colors.primary }]}>Submitted</Text>
            <Text style={[styles.progressStep, { color: colors.primary }]}>Dispatched</Text>
            <Text style={[styles.progressStep, { color: colors.textMuted }]}>Resolving</Text>
            <Text style={[styles.progressStep, { color: colors.textMuted }]}>Done</Text>
          </View>
          <View style={[styles.progressTrack, { backgroundColor: colors.border }]}>
            <View style={[styles.progressFill, { width: '60%', backgroundColor: colors.primary }]} />
          </View>
        </View>

        <Pressable
          onPress={onPressRequestDetails}
          style={({ pressed }) => [
            styles.actionButton,
            { borderColor: colors.primary },
            pressed && styles.pressed,
          ]}
        >
          <Text style={[styles.actionButtonText, { color: colors.primary }]}>Track Request Live</Text>
          <Ionicons name="location-outline" size={16} color={colors.primary} />
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  activeCountBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeCountText: {
    fontSize: 12,
    fontWeight: '700',
  },
  card: {
    borderRadius: DashboardLayout.cardRadius,
    padding: 20,
    borderWidth: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  titleArea: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  requestTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  ticketId: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  detailsBox: {
    padding: 12,
    borderRadius: 12,
    gap: 8,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 12,
    fontWeight: '700',
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressStep: {
    fontSize: 10,
    fontWeight: '600',
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  actionButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    gap: 6,
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
});
