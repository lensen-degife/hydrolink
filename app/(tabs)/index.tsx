import React, { useState } from 'react';
import { Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  CommunityNewsSection,
  CurrentBillCard,
  DashboardModals,
  EmergencySupportCard,
  FloatingActionButton,
  HeroStatusCard,
  NewsItem,
  PaymentTransaction,
  QuickActionsGrid,
  RecentPaymentsCard,
  ServiceRequestsCard,
  TodaySummaryGrid,
  TopAppBar,
  WaterScheduleCard,
  WaterUsageCard,
  useDashboardTheme,
} from '@/components/dashboard';
import { AnimatedScreen } from '@/components/auth';
import { useRouter } from 'expo-router';
import { useDashboard } from '@/contexts/DashboardDataContext';
import { greetingForNow, formatEtb, formatDate, supplyStatusLabel } from '@/utils/format';

type ActiveModalState =
  | { type: 'pay_bill' }
  | { type: 'schedule' }
  | { type: 'report_issue' }
  | { type: 'notifications' }
  | { type: 'news'; item: NewsItem }
  | { type: 'receipt'; month: string; amount: string; method: string }
  | { type: 'scan_meter' }
  | { type: 'profile' }
  | null;

export default function HomeScreen() {
  const { colors } = useDashboardTheme();
  const router = useRouter();
  const [activeModal, setActiveModal] = useState<ActiveModalState>(null);
  const { data, loading, error, refresh } = useDashboard();

  const unread = data.notifications.filter((n) => !n.isRead).length;
  const activeRequests = data.requests.filter(
    (r) => r.status === 'OPEN' || r.status === 'IN_PROGRESS',
  ).length;

  const billAmount = data.bill ? `${formatEtb(data.bill.amountEtb)} ETB` : '450 ETB';
  const billDue = data.bill ? `Due ${formatDate(data.bill.dueDate)}` : 'Due Aug 10';
  const waterLabelStr = data.waterStatus ? supplyStatusLabel(data.waterStatus.status) : 'Available';

  // Handle Quick Action clicks
  const handleQuickAction = (actionId: string) => {
    switch (actionId) {
      case 'pay_bill':
        setActiveModal({ type: 'pay_bill' });
        break;
      case 'schedule':
        setActiveModal({ type: 'schedule' });
        break;
      case 'report_issue':
        setActiveModal({ type: 'report_issue' });
        break;
      case 'announcements':
        setActiveModal({
          type: 'news',
          item: {
            id: 'news_main',
            category: 'Water Maintenance',
            title: 'Scheduled Pipeline Upgrades in Kebele 01',
            description:
              'Routine maintenance and filter replacement scheduled on Thursday from 2:00 PM to 5:00 PM.',
            date: 'Aug 02, 2026',
            badgeBg: colors.primaryContainer,
            badgeText: colors.primary,
          },
        });
        break;
      case 'scan_meter':
        setActiveModal({ type: 'scan_meter' });
        break;
      case 'payment_history':
        setActiveModal({
          type: 'receipt',
          month: 'July 2026',
          amount: '420 ETB',
          method: 'Telebirr',
        });
        break;
      default:
        break;
    }
  };

  // Handle Floating Action Button menu clicks
  const handleFabAction = (actionId: string) => {
    if (actionId === 'report_leak' || actionId === 'emergency_call') {
      setActiveModal({ type: 'report_issue' });
    } else if (actionId === 'new_request') {
      setActiveModal({ type: 'schedule' });
    } else if (actionId === 'contact_office') {
      setActiveModal({ type: 'notifications' });
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={['top']}>
      <AnimatedScreen delay={100}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={refresh} tintColor={colors.primary} />
          }
        >
          {error ? (
            <Text style={{ color: colors.error, paddingHorizontal: 16, paddingTop: 12, textAlign: 'center', fontSize: 13 }}>
              {error}
            </Text>
          ) : null}

          {/* Top App Bar */}
          <TopAppBar
            greeting={greetingForNow()}
            userName={data.user?.fullName}
            accountNumber={data.user?.accountNumber}
            kebele={data.user?.kebele ?? undefined}
            onPressNotifications={() => setActiveModal({ type: 'notifications' })}
            onPressProfile={() => setActiveModal({ type: 'profile' })}
            unreadCount={unread || 3}
          />

          {/* Hero Card (Community Status) */}
          <HeroStatusCard
            waterStatus={data.waterStatus}
            nextSlot={data.todaySlots[0] ?? null}
            onPressSchedule={() => setActiveModal({ type: 'schedule' })}
          />

          {/* Today's Summary Grid */}
          <TodaySummaryGrid
            waterLabel={waterLabelStr}
            billLabel={billAmount}
            billSubtitle={billDue}
            announcementsCount={data.announcements.length || 3}
            activeReportsCount={activeRequests || 1}
            onPressCard={(type) => {
              if (type === 'pending_bill') setActiveModal({ type: 'pay_bill' });
              else if (type === 'active_reports') setActiveModal({ type: 'report_issue' });
              else if (type === 'announcements')
                setActiveModal({
                  type: 'news',
                  item: {
                    id: 'news_1',
                    category: 'Water Maintenance',
                    title: 'Scheduled Pipeline Upgrades in Kebele 01',
                    description:
                      'Routine maintenance and filter replacement scheduled on Thursday from 2:00 PM to 5:00 PM.',
                    date: 'Aug 02, 2026',
                    badgeBg: colors.primaryContainer,
                    badgeText: colors.primary,
                  },
                });
              else setActiveModal({ type: 'schedule' });
            }}
          />

          {/* Quick Actions Grid */}
          <QuickActionsGrid onActionPress={handleQuickAction} />

          {/* Current Bill Card */}
          <CurrentBillCard
            bill={data.bill}
            loading={loading}
            onPayNow={() => setActiveModal({ type: 'pay_bill' })}
            onViewDetails={() => setActiveModal({ type: 'pay_bill' })}
          />

          {/* Today's Water Schedule Timeline Card */}
          <WaterScheduleCard
            slots={data.todaySlots}
            waterStatus={data.waterStatus}
            onViewWeeklySchedule={() => setActiveModal({ type: 'schedule' })}
          />

          {/* Latest Community News Horizontal List */}
          <CommunityNewsSection
            announcements={data.announcements}
            onSelectNews={(item) => setActiveModal({ type: 'news', item })}
          />

          {/* Water Usage Analytics Card */}
          <WaterUsageCard usage={data.usage} />

          {/* Recent Payments Transaction Card */}
          <RecentPaymentsCard
            payments={data.payments}
            onViewAll={() =>
              setActiveModal({
                type: 'receipt',
                month: 'July 2026',
                amount: '420 ETB',
                method: 'Telebirr',
              })
            }
            onSelectReceipt={(tx: PaymentTransaction) =>
              setActiveModal({
                type: 'receipt',
                month: tx.month,
                amount: tx.amount,
                method: tx.method,
              })
            }
          />

          {/* Service Requests Tracker Card */}
          <ServiceRequestsCard
            requests={data.requests}
            onPressRequestDetails={() => setActiveModal({ type: 'report_issue' })}
          />

          {/* Emergency Support Card */}
          <EmergencySupportCard
            onReportNow={() => setActiveModal({ type: 'report_issue' })}
          />

          <Pressable
            accessibilityRole="button"
            android_ripple={{ color: colors.primaryContainer }}
            onPress={() => router.push('/about-developer')}
            style={({ pressed }) => [styles.developerFooter, { opacity: pressed ? 0.78 : 1 }]}
          >
            <Text style={[styles.developerFooterText, { color: colors.textMuted }]}>Made with ❤️ by Lensen</Text>
          </Pressable>

          <View style={styles.bottomSpacer} />
        </ScrollView>
      </AnimatedScreen>

      {/* Floating Action Button (FAB) */}
      <FloatingActionButton onSelectAction={handleFabAction} />

      {/* Interactive Sheet / Modals */}
      <DashboardModals
        activeModal={activeModal}
        onClose={() => setActiveModal(null)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  bottomSpacer: {
    height: 60,
  },
  developerFooter: {
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 14,
    marginTop: 8,
    overflow: 'hidden',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  developerFooterText: {
    fontSize: 13,
    fontWeight: '700',
  },
});
