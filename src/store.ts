import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { gameSlice } from './features/game';
import { authSlice } from './features/auth';
import { lobbySlice } from './features/lobby';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    game: gameSlice.reducer,
    lobby: lobbySlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
