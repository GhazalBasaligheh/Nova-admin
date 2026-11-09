import { ApiErrorKind } from '@/types/Enums/ApiErrorKind';
import type { LoginCredentials, LoginResponse } from '@/types/auth';
import { ApiError } from '@/Utils/api/ApiError';
import { axiosInstance } from '@/Utils/api/axiosInstance';

// POST /auth/login → { token } (FakeStoreAPI docs; 400 on bad input).
export async function login(credentials: LoginCredentials): Promise<string> {
  const { data } = await axiosInstance.post<LoginResponse>('/auth/login', credentials);
  if (typeof data?.token !== 'string' || !data.token) {
    throw new ApiError(ApiErrorKind.Parse, 'Login response has no token');
  }
  return data.token;
}
