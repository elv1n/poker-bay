import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITable } from '../../socket/types/lobby';
import { RootState } from '../../store';

export const lobbySlice = createSlice({
  name: 'lobby',
  initialState: [] as ITable[],
  reducers: {
    set: (state, action: PayloadAction<ITable[]>) => action.payload,
  },
});

export const lobbyActions = lobbySlice.actions;
export const lobbySelector = {
  get: (state: RootState) => state.lobby,
};
