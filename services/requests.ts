import { apiRequest } from './api';

export type RequestType = 'LEAK' | 'NO_SUPPLY' | 'LOW_PRESSURE' | 'METER_ISSUE' | 'BILLING_ISSUE' | 'OTHER';
export type RequestUrgency = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type RequestStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'REJECTED';

export type ServiceRequest = {
  id: string;
  userId?: string;
  type: RequestType | string;
  description: string;
  location?: string | null;
  urgency: RequestUrgency | string;
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
};

export type CreateRequestInput = {
  type: RequestType | string;
  description: string;
  location?: string;
  urgency: RequestUrgency | string;
};

export const getAllRequests = () => apiRequest<ServiceRequest[]>('/requests');

export const myRequests = () => apiRequest<ServiceRequest[]>('/requests/my');

export const createRequest = (data: CreateRequestInput) =>
  apiRequest<ServiceRequest>('/requests', {
    method: 'POST',
    body: data,
  });

export const getRequestById = (id: string) => apiRequest<ServiceRequest>(`/requests/${id}`);