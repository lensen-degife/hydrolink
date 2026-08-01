import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
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
  const [activeModal, setActiveModal] = useState<ActiveModalState>(null);

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
        >
          {/* Top App Bar */}
          <TopAppBar
            onPressNotifications={() => setActiveModal({ type: 'notifications' })}
            onPressProfile={() => setActiveModal({ type: 'profile' })}
            unreadCount={3}
          />

          {/* Hero Card (Community Status) */}
          <HeroStatusCard
            onPressSchedule={() => setActiveModal({ type: 'schedule' })}
          />

          {/* Today's Summary Grid */}
          <TodaySummaryGrid
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
            onPayNow={() => setActiveModal({ type: 'pay_bill' })}
            onViewDetails={() => setActiveModal({ type: 'pay_bill' })}
          />

          {/* Today's Water Schedule Timeline Card */}
          <WaterScheduleCard
            onViewWeeklySchedule={() => setActiveModal({ type: 'schedule' })}
          />

          {/* Latest Community News Horizontal List */}
          <CommunityNewsSection
            onSelectNews={(item) => setActiveModal({ type: 'news', item })}
          />

          {/* Water Usage Analytics Card */}
          <WaterUsageCard />

          {/* Recent Payments Transaction Card */}
          <RecentPaymentsCard
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
            onPressRequestDetails={() => setActiveModal({ type: 'report_issue' })}
          />

          {/* Emergency Support Card */}
          <EmergencySupportCard
            onReportNow={() => setActiveModal({ type: 'report_issue' })}
          />

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
});
