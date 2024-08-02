import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './features/AuthSlice';
import NavigationSlice from './features/NavigationSlice';

export const store = configureStore({
  reducer: {
    authorization: AuthSlice,
    navigation: NavigationSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>; // type the State type https://redux-toolkit.js.org/usage/usage-with-typescript
export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch: () => AppDispatch = useDispatch // Export a hook that can be reused to resolve types
