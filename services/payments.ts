import { apiRequest } from './api';

export type Payment = {
  id: string;
  amountEtb: string | number;
  method: string;
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
  paidAt: string | null;
  createdAt: string;
  bill?: { periodMonth: number; periodYear: number };
};

export const getPaymentHistory = () => apiRequest<Payment[]>('/payments/history');