import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CurrentBillCard, RecentPaymentsCard, useDashboardTheme } from '@/components/dashboard';

export default function BillsScreen() {
  const { colors } = useDashboardTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>Water Billing & Payments</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Manage bills, payment options, and view receipt statements
          </Text>
        </View>
        <CurrentBillCard />
        <RecentPaymentsCard />
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
