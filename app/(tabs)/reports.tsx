import React, { useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  DashboardModals,
  EmergencySupportCard,
  ServiceRequestsCard,
  type ActiveModal,
  useDashboardTheme,
} from '@/components/dashboard';
import { useDashboard } from '@/contexts/DashboardDataContext';

export default function ReportsScreen() {
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
          <Text style={[styles.title, { color: colors.textPrimary }]}>Reports & Issues</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Track pipe leak reports and emergency service requests
          </Text>
        </View>
        {error ? <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text> : null}
        <EmergencySupportCard onReportNow={() => setActiveModal({ type: 'report_issue' })} />
        <ServiceRequestsCard
          requests={data.requests}
          onPressRequestDetails={() => setActiveModal({ type: 'report_issue' })}
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
