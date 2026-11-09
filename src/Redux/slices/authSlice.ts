import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { tokenStorage } from '@/Storage/tokenStorage';
import { RequestStatus } from '@/types/Enums/RequestStatus';
import type { LoginCredentials } from '@/types/auth';
import { serializeApiError, type SerializedApiError } from '@/Utils/api/ApiError';
import * as authService from '@/Utils/services/auth';

interface AuthState {
  token: string | null;
  status: RequestStatus;
  error: SerializedApiError | null;
}

const initialState: AuthState = {
  token: tokenStorage.get(),
  status: RequestStatus.Idle,
  error: null,
};

export const login = createAsyncThunk<
  string,
  LoginCredentials,
  { rejectValue: SerializedApiError }
>('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    return await authService.login(credentials);
  } catch (error) {
    return rejectWithValue(serializeApiError(error));
  }
});

// Token persistence happens in Redux/listeners.ts, keeping reducers pure.
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.status = RequestStatus.Idle;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = RequestStatus.Loading;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = RequestStatus.Succeeded;
        state.token = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.error = action.payload ?? null;
      });
  },
});

export const { logout } = authSlice.actions;
export const selectIsAuthenticated = (state: { auth: AuthState }) => Boolean(state.auth.token);
export default authSlice.reducer;
