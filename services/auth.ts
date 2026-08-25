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
  kebele?: string | null;
  isVerified: boolean;
};

export type LoginResult = {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
};

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

export async function login(email: string, password: string): Promise<LoginResult> {
  const data = await apiRequest<LoginResult>('/auth/login', {
    method: 'POST',
    body: { email, password },
    skipAuth: true,
  });

  await saveSession(data);
  return data;
}

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
    skipAuth: true,
  });
}

export async function sendOtp(
  email: string,
  purpose: 'register' | 'reset',
): Promise<{ expiresInMinutes?: number } | null> {
  return apiRequest<{ expiresInMinutes?: number } | null>('/auth/otp/send', {
    method: 'POST',
    body: { email, purpose },
    skipAuth: true,
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
    skipAuth: true,
  });
}

export async function forgotPassword(email: string): Promise<null> {
  return apiRequest<null>('/auth/forgot-password', {
    method: 'POST',
    body: { email },
    skipAuth: true,
  });
}

export async function resetPassword(
  email: string,
  otp: string,
  newPassword: string,
): Promise<null> {
  return apiRequest<null>('/auth/reset-password', {
    method: 'POST',
    body: { email, otp, newPassword },
    skipAuth: true,
  });
}

export async function refreshTokens(): Promise<{ accessToken: string; refreshToken: string } | null> {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) return null;

  try {
    const data = await apiRequest<{ accessToken: string; refreshToken: string }>('/auth/refresh', {
      method: 'POST',
      body: { refreshToken },
      skipAuth: true,
    });
    if (data?.accessToken) {
      await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, data.accessToken);
      if (data.refreshToken) {
        await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, data.refreshToken);
      }
    }
    return data;
  } catch {
    await clearSession();
    return null;
  }
}

export async function logout(): Promise<void> {
  try {
    await apiRequest<null>('/auth/logout', { method: 'POST' });
  } catch {
    // Ignore network / token errors on logout
  } finally {
    await clearSession();
  }
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
  await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY).catch(() => {});
  await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY).catch(() => {});
  await SecureStore.deleteItemAsync(USER_KEY).catch(() => {});
}