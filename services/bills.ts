import { apiRequest } from './api';

export type BillStatus = 'UNPAID' | 'PAID' | 'OVERDUE' | 'PARTIAL';

export type Bill = {
  id: string;
  userId?: string;
  periodMonth: number;
  periodYear: number;
  usageM3: number;
  amountEtb: string | number;
  dueDate: string;
  status: BillStatus;
  createdAt?: string;
  updatedAt?: string;
};

export const getCurrentBill = () => apiRequest<Bill | null>('/bills/current');

export const getBillHistory = (page = 1, limit = 10) =>
  apiRequest<{ items: Bill[]; pagination: { page: number; limit: number; total: number } }>(
    `/bills/history?page=${page}&limit=${limit}`,
  );

export const getBillById = (id: string) => apiRequest<Bill>(`/bills/${id}`);

export const getBillReceipt = (id: string) => apiRequest<unknown>(`/bills/${id}/receipt`);