import { configureStore } from '@reduxjs/toolkit';
import { listenerMiddleware } from './listeners';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
  },
  middleware: (getDefault) => getDefault().prepend(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
