import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDashboardTheme } from './ThemeContext';
import { DashboardLayout, DashboardShadows } from '@/constants/dashboard-theme';
import type { Bill } from '@/services/bills';
import { formatEtb, formatDate, formatMonthYear, billStatusLabel } from '@/utils/format';

type CurrentBillCardProps = {
  bill?: Bill | null;
  loading?: boolean;
  onPayNow?: () => void;
  onViewDetails?: () => void;
};

export function CurrentBillCard({ bill, loading, onPayNow, onViewDetails }: CurrentBillCardProps) {
  const { colors } = useDashboardTheme();

  const amountText = bill ? formatEtb(bill.amountEtb) : '450';
  const dueDateText = bill ? formatDate(bill.dueDate) : '10 August 2026';
  const statusLabelText = bill ? billStatusLabel(bill.status) : 'Pending';
  const infoTextStr = bill
    ? `Billing Period: ${formatMonthYear(bill.periodMonth, bill.periodYear)} • Consumption: ${bill.usageM3} m³`
    : 'Billing Period: July 01 - July 31, 2026 • Meter ID: #MTR-9021';

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Current Bill</Text>

        <View style={[styles.statusBadge, { backgroundColor: colors.warningContainer }]}>
          <View style={[styles.statusDot, { backgroundColor: colors.warning }]} />
          <Text style={[styles.statusText, { color: colors.onWarningContainer }]}>{statusLabelText}</Text>
        </View>
      </View>

      <View
        style={[
          styles.card,
          { backgroundColor: colors.surface, borderColor: colors.borderLight },
          DashboardShadows.medium,
        ]}
      >
        <View style={styles.billMainRow}>
          <View style={styles.amountContainer}>
            <Text style={[styles.billLabel, { color: colors.textMuted }]}>Amount Due</Text>
            <View style={styles.currencyRow}>
              <Text style={[styles.amountText, { color: colors.textPrimary }]}>{amountText}</Text>
              <Text style={[styles.currencyText, { color: colors.primary }]}>ETB</Text>
            </View>
          </View>

          <View style={styles.dueContainer}>
            <View style={styles.dueIconRow}>
              <Ionicons name="calendar-outline" size={15} color={colors.textMuted} />
              <Text style={[styles.dueLabel, { color: colors.textMuted }]}>Due Date</Text>
            </View>
            <Text style={[styles.dueDateText, { color: colors.textPrimary }]}>{dueDateText}</Text>
          </View>
        </View>

        <View style={[styles.infoRow, { backgroundColor: colors.surfaceVariant }]}>
          <Ionicons name="information-circle-outline" size={16} color={colors.primary} />
          <Text style={[styles.infoText, { color: colors.textSecondary }]}>
            {infoTextStr}
          </Text>
        </View>

        <View style={styles.buttonRow}>
          <Pressable
            onPress={onViewDetails}
            style={({ pressed }) => [
              styles.outlineButton,
              { borderColor: colors.primary },
              pressed && styles.pressed,
            ]}
          >
            <Text style={[styles.outlineButtonText, { color: colors.primary }]}>View Details</Text>
          </Pressable>

          <Pressable
            onPress={onPayNow}
            style={({ pressed }) => [
              styles.primaryButton,
              { backgroundColor: colors.primary },
              pressed && styles.pressed,
            ]}
          >
            <Ionicons name="card" size={18} color="#FFFFFF" />
            <Text style={styles.primaryButtonText}>Pay Now</Text>
          </Pressable>
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
  statusBadge: {
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
  card: {
    borderRadius: DashboardLayout.cardRadius,
    padding: 20,
    borderWidth: 1,
  },
  billMainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  amountContainer: {
    flex: 1,
  },
  billLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  currencyRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  amountText: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  currencyText: {
    fontSize: 16,
    fontWeight: '700',
  },
  dueContainer: {
    alignItems: 'flex-end',
  },
  dueIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  dueLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  dueDateText: {
    fontSize: 15,
    fontWeight: '700',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 18,
  },
  infoText: {
    fontSize: 11,
    fontWeight: '500',
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  outlineButton: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 12,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outlineButtonText: {
    fontSize: 14,
    fontWeight: '700',
  },
  primaryButton: {
    flex: 1.2,
    flexDirection: 'row',
    paddingVertical: 13,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#1976D2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
});
