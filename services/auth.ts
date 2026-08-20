import * as SecureStore from 'expo-secure-store';
import { apiRequest } from './api';

const ACCESS_TOKEN_KEY = 'hydrolink_access_token';
const REFRESH_TOKEN_KEY = 'hydrolink_refresh_token';
const USER_KEY = 'hydrolink_user';

export type AuthUser = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  accountNumber: string;
  isVerified: boolean;
};

export type LoginResult = {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
};

export async function login(email: string, password: string): Promise<LoginResult> {
  const data = await apiRequest<LoginResult>('/auth/login', {
    method: 'POST',
    body: { email, password },
  });

  await saveSession(data);
  return data;
}

export async function saveSession(data: LoginResult) {
  await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, data.accessToken);
  await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, data.refreshToken);
  await SecureStore.setItemAsync(USER_KEY, JSON.stringify(data.user));
}

export async function getAccessToken(): Promise<string | null> {
  return SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
}

export async function getRefreshToken(): Promise<string | null> {
  return SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
}

export async function getStoredUser(): Promise<AuthUser | null> {
  const raw = await SecureStore.getItemAsync(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export async function clearSession() {
  await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
  await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
  await SecureStore.deleteItemAsync(USER_KEY);
}
// ... existing imports and code ...

export type RegisterInput = {
  fullName: string;
  email: string;
  phone: string;
  accountNumber: string;
  password: string;
};

export type RegisterResult = {
  id: string;
  email: string;
  fullName: string;
};

export async function register(input: RegisterInput): Promise<RegisterResult> {
  return apiRequest<RegisterResult>('/auth/register', {
    method: 'POST',
    body: {
      fullName: input.fullName,
      email: input.email,
      phone: input.phone,
      accountNumber: input.accountNumber,
      password: input.password,
    },
  });
}

export async function sendOtp(
  email: string,
  purpose: 'register' | 'reset',
): Promise<{ expiresInMinutes?: number } | null> {
  return apiRequest<{ expiresInMinutes?: number } | null>('/auth/otp/send', {
    method: 'POST',
    body: { email, purpose },
  });
}

export async function verifyOtp(
  email: string,
  otp: string,
  purpose: 'register' | 'reset',
): Promise<null> {
  return apiRequest<null>('/auth/otp/verify', {
    method: 'POST',
    body: { email, otp, purpose },
  });
}