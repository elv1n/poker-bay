import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

enum AuthStatus {
  Mounted,
  Pending,
  Error,
  Success,
  LoggedOut,
}

type AuthedUser = {
  status: AuthStatus.Success;
  username: string;
};

type AuthState =
  | { status: AuthStatus.Mounted }
  | { status: AuthStatus.Pending }
  | { status: AuthStatus.LoggedOut }
  | { status: AuthStatus.Error; message: string }
  | AuthedUser;

const initialState = {
  status: AuthStatus.Mounted,
} as AuthState;

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<string>) => ({
      status: AuthStatus.Success,
      username: action.payload,
    }),
    error: (state, action: PayloadAction<string>) => ({
      status: AuthStatus.Error,
      message: action.payload,
    }),
    logout: state => ({ status: AuthStatus.LoggedOut }),
  },
});

export const authActions = authSlice.actions;

export const authSelector = {
  user: ({ auth }: RootState) => {
    if (auth.status === AuthStatus.Success) {
      return auth.username;
    }
    throw new Error('Not authorized');
  },
  isAuthed: ({ auth }: RootState) => auth.status === AuthStatus.Success,
  isFailed: ({ auth }: RootState) =>
    auth.status === AuthStatus.Error || auth.status === AuthStatus.LoggedOut,
};
