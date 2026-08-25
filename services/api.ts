import * as SecureStore from 'expo-secure-store';

const API_BASE_URL = 'https://hydrolink-backend.onrender.com/api/v1';
const ACCESS_TOKEN_KEY = 'hydrolink_access_token';
const REFRESH_TOKEN_KEY = 'hydrolink_refresh_token';
const USER_KEY = 'hydrolink_user';

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  error: string | null;
};

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
  token?: string | null;
  skipAuth?: boolean;
  _isRetry?: boolean;
};

export async function apiRequest<T>(
  path: string,
  { method = 'GET', body, token, skipAuth = false, _isRetry = false }: RequestOptions = {},
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  let authToken = token;
  if (!authToken && !skipAuth) {
    authToken = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
  }

  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  let json: ApiResponse<T> | null = null;
  try {
    json = await res.json();
  } catch {
    // non-JSON response
  }

  // Handle 401 Unauthorized with token refresh (once per request)
  if (res.status === 401 && !skipAuth && !_isRetry && path !== '/auth/refresh') {
    const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
    if (refreshToken) {
      try {
        const refreshRes = await fetch(`${API_BASE_URL}/auth/refresh`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({ refreshToken }),
        });

        const refreshJson: ApiResponse<{ accessToken: string; refreshToken: string }> | null =
          await refreshRes.json().catch(() => null);

        if (refreshRes.ok && refreshJson?.success && refreshJson.data) {
          const { accessToken: newAccess, refreshToken: newRefresh } = refreshJson.data;
          await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, newAccess);
          if (newRefresh) {
            await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, newRefresh);
          }

          // Retry original request with new token
          return apiRequest<T>(path, {
            method,
            body,
            token: newAccess,
            skipAuth,
            _isRetry: true,
          });
        }
      } catch {
        // Refresh request failed
      }
    }

    // Clear session if refresh failed or no refresh token is present
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY).catch(() => {});
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY).catch(() => {});
    await SecureStore.deleteItemAsync(USER_KEY).catch(() => {});
  }

  if (!res.ok || !json?.success) {
    const message =
      json?.message || json?.error || `Request failed (${res.status})`;
    throw new ApiError(message, res.status);
  }

  return json.data;
}