import { apiRequest } from './api';

export type AppNotification = {
  id: string;
  userId?: string;
  type: string;
  title: string;
  body: string;
  isRead: boolean;
  createdAt: string;
};

export const listNotifications = () => apiRequest<AppNotification[]>('/notifications');

export const markAllNotificationsRead = () =>
  apiRequest<unknown>('/notifications/read-all', {
    method: 'PUT',
  });

export const markNotificationRead = (id: string) =>
  apiRequest<AppNotification>(`/notifications/${id}/read`, {
    method: 'PUT',
  });

export const registerNotificationDevice = (token: string, platform?: string) =>
  apiRequest<unknown>('/notifications/devices', {
    method: 'POST',
    body: { token, platform },
  });