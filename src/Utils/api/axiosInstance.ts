import axios, { AxiosError, type AxiosResponse } from 'axios';
import { tokenStorage } from '@/Storage/tokenStorage';
import { ApiErrorKind } from '@/types/Enums/ApiErrorKind';
import { ApiError } from './ApiError';

const TIMEOUT_MS = 10_000;

const baseURL = import.meta.env.VITE_API_BASE_URL;
if (!baseURL) throw new Error('Missing VITE_API_BASE_URL. See .env.example.');

export const axiosInstance = axios.create({
  baseURL,
  timeout: TIMEOUT_MS,
  headers: { Accept: 'application/json' },
});

// Standard bearer pattern . FakeStoreAPI doesn't validate the token
axiosInstance.interceptors.request.use((config) => {
  const token = tokenStorage.get();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Lets the app react to 401/403 (log out) without this module importing the Redux store.
let onUnauthorized: (() => void) | null = null;
export function setUnauthorizedHandler(handler: () => void): void {
  onUnauthorized = handler;
}

function isJson(response: AxiosResponse): boolean {
  return String(response.headers['content-type'] ?? '').includes('application/json');
}

function toApiError(error: unknown): ApiError {
  if (error instanceof ApiError) return error;
  if (axios.isCancel(error)) return new ApiError(ApiErrorKind.Canceled, 'Request canceled');

  if (error instanceof AxiosError) {
    const { response } = error;
    if (!response) return new ApiError(ApiErrorKind.Network, error.message);

    const { status } = response;
    if (status === 401 || status === 403) {
      return new ApiError(ApiErrorKind.Unauthorized, `Unauthorized (${status})`, status);
    }
    if (status >= 500) return new ApiError(ApiErrorKind.Server, `Server error (${status})`, status);

    return new ApiError(ApiErrorKind.Client, `Request failed (${status})`, status);
  }

  return new ApiError(ApiErrorKind.Network, error instanceof Error ? error.message : 'Unknown');
}

// Central error handling: every failure leaves this instance as a typed ApiError.
axiosInstance.interceptors.response.use(
  (response) => {
    if (!isJson(response)) {
      throw new ApiError(ApiErrorKind.Parse, 'Non-JSON response', response.status);
    }
    return response;
  },
  (error: unknown) => {
    const apiError = toApiError(error);
    // A login attempt's own 401 is a wrong password, not an expired session.
    const isLogin = error instanceof AxiosError && error.config?.url?.includes('/auth/login');
    if (apiError.kind === ApiErrorKind.Unauthorized && !isLogin) onUnauthorized?.();
    return Promise.reject(apiError);
  },
);
