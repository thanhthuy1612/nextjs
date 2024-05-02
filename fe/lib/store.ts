import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/userSlice';
import notificationSlice from './features/notification';
import loginSlice from './features/login';

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userSlice,
      notification: notificationSlice,
      login: loginSlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
