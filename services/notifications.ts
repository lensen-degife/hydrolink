import { apiRequest } from './api';

export type AppNotification = {
  id: string;
  type: string;
  title: string;
  body: string;
  isRead: boolean;
  createdAt: string;
};

export const listNotifications = () => apiRequest<AppNotification[]>('/notifications');