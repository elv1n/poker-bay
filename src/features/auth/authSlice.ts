/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

enum AuthStatus {
  Mounted,
  Pending,
  Error,
  Success,
  LoggedOut,
}
export enum SocketStatus {
  NotDefined,
  Connected,
  Disconnected,
}

type AuthedUser = {
  status: AuthStatus.Success;
  username: string;
};

interface BaseAuthState {
  status: Exclude<AuthStatus, AuthStatus.Success>;
  socket: SocketStatus;
  error?: {
    type: string;
    message: string;
  };
}

interface LoggedAuthState extends Omit<BaseAuthState, 'status'> {
  status: AuthStatus.Success;
  username: string;
}
//
// type AuthState =
//   | { status: AuthStatus.Mounted }
//   | { status: AuthStatus.Pending }
//   | { status: AuthStatus.LoggedOut }
//   | { status: AuthStatus.Error; message: string }
//   | AuthedUser;

type AuthState = BaseAuthState | LoggedAuthState;

const initialState: AuthState = {
  status: AuthStatus.Mounted,
  socket: SocketStatus.NotDefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState as AuthState,
  reducers: {
    set: (state, action: PayloadAction<string>) => ({
      ...state,
      status: AuthStatus.Success,
      username: action.payload,
    }),
    error: (state, action: PayloadAction<string>) => {
      state.status = AuthStatus.Error;
      state.error = {
        type: action.payload,
        message: action.payload,
      };
    },
    logout: state => {
      state.status = AuthStatus.LoggedOut;
    },
    socket: (state, action: PayloadAction<SocketStatus>) => {
      state.socket = action.payload;
    },
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
  isSocket: (status: SocketStatus) => ({ auth }: RootState) =>
    auth.socket === status,
};
