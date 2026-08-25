import { apiRequest } from './api';

export type ServiceRequest = {
  id: string;
  type: string;
  description: string;
  location?: string | null;
  urgency: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'REJECTED';
  createdAt: string;
  updatedAt: string;
};

export const myRequests = () => apiRequest<ServiceRequest[]>('/requests/my');