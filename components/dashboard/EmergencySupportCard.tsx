import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDashboardTheme } from './ThemeContext';
import { DashboardLayout, DashboardShadows } from '@/constants/dashboard-theme';

type EmergencyCardProps = {
  onReportNow?: () => void;
};

export function EmergencySupportCard({ onReportNow }: EmergencyCardProps) {
  const { colors, isDark } = useDashboardTheme();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: isDark ? '#2D1B1E' : '#FEF2F2',
            borderColor: colors.error,
          },
          DashboardShadows.soft,
        ]}
      >
        <View style={styles.headerRow}>
          <View style={[styles.emergencyBadge, { backgroundColor: colors.error }]}>
            <Ionicons name="warning" size={22} color="#FFFFFF" />
          </View>
          <View style={styles.titleArea}>
            <Text style={[styles.title, { color: isDark ? '#FCA5A5' : '#991B1B' }]}>
              Emergency Water Issue?
            </Text>
            <Text style={[styles.description, { color: isDark ? '#FECACA' : '#7F1D1D' }]}>
              Report leaks, pipe bursts or supply interruptions immediately to our priority response unit.
            </Text>
          </View>
        </View>

        <Pressable
          onPress={onReportNow}
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: colors.error },
            pressed && styles.pressed,
          ]}
        >
          <Ionicons name="call" size={18} color="#FFFFFF" />
          <Text style={styles.buttonText}>Report Now (Hotline 9021)</Text>
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
  card: {
    borderRadius: DashboardLayout.cardRadius,
    padding: 20,
    borderWidth: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    marginBottom: 16,
  },
  emergencyBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  titleArea: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '500',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    gap: 8,
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
});
