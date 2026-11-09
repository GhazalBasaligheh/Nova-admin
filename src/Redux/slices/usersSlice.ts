import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from '@/types/Enums/RequestStatus';
import type { NewUser, User } from '@/types/user';
import { serializeApiError, type SerializedApiError } from '@/Utils/api/ApiError';
import * as usersService from '@/Utils/services/users';
import { uniqueId } from '@/Utils/uniqueId';

interface UsersState {
  items: User[];
  listStatus: RequestStatus;
  listError: SerializedApiError | null;
  createStatus: RequestStatus;
  createError: SerializedApiError | null;
}

const initialState: UsersState = {
  items: [],
  listStatus: RequestStatus.Idle,
  listError: null,
  createStatus: RequestStatus.Idle,
  createError: null,
};

type ThunkConfig = { state: { users: UsersState }; rejectValue: SerializedApiError };

// Loads once; `condition` prevents a refetch from dropping locally added users.
export const fetchUsers = createAsyncThunk<User[], void, ThunkConfig>(
  'users/fetch',
  async (_arg, { rejectWithValue }) => {
    try {
      return await usersService.getUsers();
    } catch (error) {
      return rejectWithValue(serializeApiError(error));
    }
  },
  {
    condition: (_arg, { getState }) => {
      const { listStatus } = getState().users;
      return listStatus === RequestStatus.Idle || listStatus === RequestStatus.Failed;
    },
  },
);

export const createUser = createAsyncThunk<User, NewUser, ThunkConfig>(
  'users/create',
  async (input, { rejectWithValue }) => {
    try {
      return await usersService.createUser(input);
    } catch (error) {
      return rejectWithValue(serializeApiError(error));
    }
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    resetCreateStatus(state) {
      state.createStatus = RequestStatus.Idle;
      state.createError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.listStatus = RequestStatus.Loading;
        state.listError = null;
      })
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        state.listStatus = RequestStatus.Succeeded;
        state.items = payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.listStatus = RequestStatus.Failed;
        state.listError = action.payload ?? null;
      })
      .addCase(createUser.pending, (state) => {
        state.createStatus = RequestStatus.Loading;
        state.createError = null;
      })
      // Not persisted by the API: added to the local list (newest first) until a full reload.
      .addCase(createUser.fulfilled, (state, { payload }) => {
        state.createStatus = RequestStatus.Succeeded;
        state.items.unshift({ ...payload, id: uniqueId(payload.id, state.items) });
      })
      .addCase(createUser.rejected, (state, action) => {
        state.createStatus = RequestStatus.Failed;
        state.createError = action.payload ?? null;
      });
  },
});

export const { resetCreateStatus } = usersSlice.actions;
export default usersSlice.reducer;
