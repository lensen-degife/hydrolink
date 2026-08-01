import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EmergencySupportCard, ServiceRequestsCard, useDashboardTheme } from '@/components/dashboard';

export default function ReportsScreen() {
  const { colors } = useDashboardTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>Reports & Issues</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Track pipe leak reports and emergency service requests
          </Text>
        </View>
        <EmergencySupportCard />
        <ServiceRequestsCard />
      </ScrollView>
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
});
