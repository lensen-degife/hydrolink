import { apiRequest } from './api';

export type Announcement = {
  id: string;
  title: string;
  body: string;
  kebele?: string | null;
  createdAt: string;
};

export const listAnnouncements = () => apiRequest<Announcement[]>('/announcements');
export const latestAnnouncement = () => apiRequest<Announcement | null>('/announcements/latest');