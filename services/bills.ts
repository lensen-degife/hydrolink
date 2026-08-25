import { apiRequest } from './api';

export type Bill = {
  id: string;
  periodMonth: number;
  periodYear: number;
  usageM3: number;
  amountEtb: string | number;
  dueDate: string;
  status: 'UNPAID' | 'PAID' | 'OVERDUE' | 'PARTIAL';
};

export const getCurrentBill = () => apiRequest<Bill | null>('/bills/current');
export const getBillHistory = (page = 1, limit = 10) =>
  apiRequest<{ items: Bill[]; pagination: { page: number; limit: number; total: number } }>(
    `/bills/history?page=${page}&limit=${limit}`,
  );