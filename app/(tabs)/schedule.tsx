import React, { useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  DashboardModals,
  HeroStatusCard,
  WaterScheduleCard,
  type ActiveModal,
  useDashboardTheme,
} from '@/components/dashboard';
import { useDashboard } from '@/contexts/DashboardDataContext';

export default function ScheduleScreen() {
  const { colors } = useDashboardTheme();
  const { data, loading, error, refresh } = useDashboard();
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refresh} tintColor={colors.primary} />
        }
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>Distribution Schedule</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Real-time water pressure and neighborhood supply timelines
          </Text>
        </View>
        {error ? <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text> : null}
        <HeroStatusCard
          waterStatus={data.waterStatus}
          nextSlot={data.todaySlots[0] ?? null}
          onPressSchedule={() => setActiveModal({ type: 'schedule' })}
        />
        <WaterScheduleCard
          slots={data.todaySlots}
          waterStatus={data.waterStatus}
          onViewWeeklySchedule={() => setActiveModal({ type: 'schedule' })}
        />
      </ScrollView>
      <DashboardModals activeModal={activeModal} onClose={() => setActiveModal(null)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 13,
    marginTop: 4,
  },
  errorText: {
    paddingHorizontal: 20,
    paddingTop: 8,
    fontSize: 13,
    textAlign: 'center',
  },
});
