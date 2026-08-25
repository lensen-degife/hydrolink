import { apiRequest } from './api';

export type UsageRecord = {
  id: string;
  periodMonth: number;
  periodYear: number;
  usageM3: number;
};

export type UsageSummary = {
  latest: UsageRecord | null;
  averageMonthlyM3: number;
  last12Months: UsageRecord[];
};

export const getUsageSummary = () => apiRequest<UsageSummary>('/usage/summary');