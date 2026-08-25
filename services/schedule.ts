import { apiRequest } from './api';

export type ScheduleStatus = 'AVAILABLE' | 'SCHEDULED_OFF' | 'UNSCHEDULED_OFF' | 'LOW_PRESSURE';

export type ScheduleSlot = {
  id: string;
  kebele: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  status: ScheduleStatus;
  note?: string | null;
};

export type WaterStatus = {
  kebele: string;
  status: ScheduleStatus;
  activeSlot: ScheduleSlot | null;
  checkedAt: string;
};

export const getTodaySchedule = () => apiRequest<ScheduleSlot[]>('/schedule/today');

export const getWeeklySchedule = () => apiRequest<ScheduleSlot[]>('/schedule/weekly');

export const getWaterStatus = () => apiRequest<WaterStatus>('/schedule/status');