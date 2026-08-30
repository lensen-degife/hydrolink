import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDashboardTheme } from './ThemeContext';
import { DashboardLayout, DashboardShadows } from '@/constants/dashboard-theme';
import type { Payment } from '@/services/payments';
import { formatEtb, formatDate, formatMonthYear, paymentMethodLabel, paymentStatusLabel } from '@/utils/format';

export type PaymentTransaction = {
  id: string;
  month: string;
  amount: string;
  method: string;
  status: 'Paid' | 'Pending' | 'Failed';
  date: string;
};

type RecentPaymentsProps = {
  payments?: Payment[] | null;
  onViewAll?: () => void;
  onSelectReceipt?: (item: PaymentTransaction) => void;
};

export function RecentPaymentsCard({ payments, onViewAll, onSelectReceipt }: RecentPaymentsProps) {
  const { colors } = useDashboardTheme();

  const defaultTransactions: PaymentTransaction[] = [
    {
      id: 'tx_1',
      month: 'July 2026',
      amount: '420 ETB',
      method: 'Telebirr',
      status: 'Paid',
      date: '12 Jul 2026',
    },
    {
      id: 'tx_2',
      month: 'June 2026',
      amount: '390 ETB',
      method: 'CBE Birr',
      status: 'Paid',
      date: '10 Jun 2026',
    },
    {
      id: 'tx_3',
      month: 'May 2026',
      amount: '410 ETB',
      method: 'Chapa Pay',
      status: 'Paid',
      date: '08 May 2026',
    },
  ];

  const mappedTx: PaymentTransaction[] = (payments ?? []).slice(0, 5).map((p) => ({
    id: p.id,
    month: p.bill ? formatMonthYear(p.bill.periodMonth, p.bill.periodYear) : formatDate(p.createdAt),
    amount: `${formatEtb(p.amountEtb)} ETB`,
    method: paymentMethodLabel(p.method),
    status: paymentStatusLabel(p.status),
    date: formatDate(p.paidAt ?? p.createdAt),
  }));

  const transactions: PaymentTransaction[] = payments === undefined ? defaultTransactions : mappedTx;

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Recent Payments</Text>
        <Pressable onPress={onViewAll}>
          <Text style={[styles.viewAllText, { color: colors.primary }]}>View All</Text>
        </Pressable>
      </View>

      <View
        style={[
          styles.card,
          { backgroundColor: colors.surface, borderColor: colors.borderLight },
          DashboardShadows.soft,
        ]}
      >
        {transactions.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="receipt-outline" size={22} color={colors.textMuted} />
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              No payment history was returned for this account.
            </Text>
          </View>
        ) : (
          transactions.map((tx, index) => (
          <View
            key={tx.id}
            style={[
              styles.txRow,
              index < transactions.length - 1 && {
                borderBottomWidth: 1,
                borderBottomColor: colors.borderLight,
              },
            ]}
          >
            {/* Payment Method Icon Circle */}
            <View style={[styles.methodIcon, { backgroundColor: colors.primaryContainer }]}>
              <Ionicons name="receipt" size={20} color={colors.primary} />
            </View>

            {/* Middle Details */}
            <View style={styles.txDetails}>
              <Text style={[styles.txMonth, { color: colors.textPrimary }]}>{tx.month}</Text>
              <View style={styles.subRow}>
                <Text style={[styles.txMethod, { color: colors.textSecondary }]}>
                  {tx.method} • {tx.date}
                </Text>
              </View>
            </View>

            {/* Amount & Status Badge */}
            <View style={styles.txRight}>
              <Text style={[styles.txAmount, { color: colors.textPrimary }]}>{tx.amount}</Text>
              <View style={[styles.statusBadge, { backgroundColor: colors.successContainer }]}>
                <Ionicons name="checkmark-circle" size={12} color={colors.success} />
                <Text style={[styles.statusText, { color: colors.onSuccessContainer }]}>
                  {tx.status}
                </Text>
              </View>
            </View>

            {/* Receipt Action Button */}
            <Pressable
              onPress={() => onSelectReceipt?.(tx)}
              style={({ pressed }) => [styles.receiptBtn, pressed && styles.pressed]}
              accessibilityLabel="View Receipt"
            >
              <Ionicons name="document-text-outline" size={20} color={colors.primary} />
            </Pressable>
          </View>
          ))
        )}

        {/* View All Button Footer */}
        <Pressable
          onPress={onViewAll}
          style={({ pressed }) => [
            styles.footerBtn,
            { borderColor: colors.primary },
            pressed && styles.pressed,
          ]}
        >
          <Text style={[styles.footerBtnText, { color: colors.primary }]}>
            View All Payment History
          </Text>
          <Ionicons name="arrow-forward" size={16} color={colors.primary} />
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
  viewAllText: {
    fontSize: 13,
    fontWeight: '600',
  },
  card: {
    borderRadius: DashboardLayout.cardRadius,
    padding: 16,
    borderWidth: 1,
  },
  txRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  methodIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txDetails: {
    flex: 1,
  },
  txMonth: {
    fontSize: 15,
    fontWeight: '700',
  },
  subRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  txMethod: {
    fontSize: 12,
    fontWeight: '500',
  },
  txRight: {
    alignItems: 'flex-end',
    marginRight: 4,
  },
  txAmount: {
    fontSize: 15,
    fontWeight: '700',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginTop: 3,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
  },
  receiptBtn: {
    padding: 6,
  },
  pressed: {
    opacity: 0.75,
  },
  emptyState: {
    alignItems: 'center',
    gap: 8,
    paddingVertical: 18,
  },
  emptyText: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  footerBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 11,
    borderRadius: 12,
    borderWidth: 1.5,
    gap: 6,
    marginTop: 10,
  },
  footerBtnText: {
    fontSize: 13,
    fontWeight: '700',
  },
});
