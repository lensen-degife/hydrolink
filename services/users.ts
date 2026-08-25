import { apiRequest } from './api';

export type UserProfile = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  accountNumber: string;
  kebele?: string | null;
  isVerified: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export const getMe = () => apiRequest<UserProfile>('/users/me');

export const updateMe = (data: Partial<UserProfile>) =>
  apiRequest<UserProfile>('/users/me', {
    method: 'PUT',
    body: data,
  });

export const getAccount = () => apiRequest<unknown>('/users/me/account');