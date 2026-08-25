import { apiRequest } from './api';

export type PaymentMethod = 'TELEBIRR' | 'CBE' | 'AWASH' | 'CASH' | 'OTHER';
export type PaymentStatus = 'PENDING' | 'SUCCESS' | 'FAILED';

export type Payment = {
  id: string;
  billId?: string;
  amountEtb: string | number;
  method: PaymentMethod | string;
  status: PaymentStatus;
  paidAt: string | null;
  createdAt: string;
  bill?: { periodMonth: number; periodYear: number };
};

export const createPayment = (billId: string, amount: string | number, method: PaymentMethod | string) =>
  apiRequest<Payment>('/payments', {
    method: 'POST',
    body: { billId, amount, method },
  });

export const getPaymentHistory = () => apiRequest<Payment[]>('/payments/history');

export const getPaymentById = (id: string) => apiRequest<Payment>(`/payments/${id}`);

export const confirmPayment = (id: string) =>
  apiRequest<Payment>(`/payments/${id}/confirm`, {
    method: 'POST',
  });