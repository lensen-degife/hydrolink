import { apiRequest } from './api';

export type UserProfile = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  accountNumber: string;
  kebele?: string | null;
  isVerified: boolean;
};

export const getMe = () => apiRequest<UserProfile>('/users/me');