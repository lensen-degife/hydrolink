import { useCallback, useEffect, useState } from 'react';
import { getCurrentBill, type Bill } from '@/services/bills';
import { getPaymentHistory, type Payment } from '@/services/payments';
import {
  getTodaySchedule,
  getWaterStatus,
  type ScheduleSlot,
  type WaterStatus,
} from '@/services/schedule';
import { getUsageSummary, type UsageSummary } from '@/services/usage';
import { myRequests, type ServiceRequest } from '@/services/requests';
import { listAnnouncements, type Announcement } from '@/services/announcements';
import { listNotifications, type AppNotification } from '@/services/notifications';
import { getMe, type UserProfile } from '@/services/users';
import { ApiError } from '@/services/api';

export type DashboardData = {
  user: UserProfile | null;
  bill: Bill | null;
  payments: Payment[];
  todaySlots: ScheduleSlot[];
  waterStatus: WaterStatus | null;
  usage: UsageSummary | null;
  requests: ServiceRequest[];
  announcements: Announcement[];
  notifications: AppNotification[];
};

const empty: DashboardData = {
  user: null,
  bill: null,
  payments: [],
  todaySlots: [],
  waterStatus: null,
  usage: null,
  requests: [],
  announcements: [],
  notifications: [],
};

export function useDashboardData() {
  const [data, setData] = useState<DashboardData>(empty);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const results = await Promise.allSettled([
        getMe(),
        getCurrentBill(),
        getPaymentHistory(),
        getTodaySchedule(),
        getWaterStatus(),
        getUsageSummary(),
        myRequests(),
        listAnnouncements(),
        listNotifications(),
      ]);

      const val = <T,>(i: number, fallback: T): T => {
        const r = results[i];
        return r.status === 'fulfilled' ? (r.value as T) : fallback;
      };

      setData({
        user: val(0, null),
        bill: val(1, null),
        payments: val(2, []),
        todaySlots: val(3, []),
        waterStatus: val(4, null),
        usage: val(5, null),
        requests: val(6, []),
        announcements: val(7, []),
        notifications: val(8, []),
      });

      const failed = results.filter((r) => r.status === 'rejected');
      if (failed.length === results.length) {
        const first = failed[0] as PromiseRejectedResult;
        const msg =
          first.reason instanceof ApiError
            ? first.reason.message
            : 'Could not load dashboard data';
        setError(msg);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}