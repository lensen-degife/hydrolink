const API_BASE_URL = 'https://hydrolink-backend.onrender.com/api/v1';

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
};

export async function apiRequest<T>(
    path: string,
    { method = 'GET', body, token }: RequestOptions = {},
): Promise<T> {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
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

    if (!res.ok || !json?.success) {
        const message =
            json?.message || json?.error || `Request failed (${res.status})`;
        throw new ApiError(message, res.status);
    }

    return json.data;
}