import axios from 'axios';
import { LS, LSKeys } from '../../utils/LS';
import { socketSendAuth } from '../../socket';

export enum AuthType {
  login = 'login',
  register = 'register',
}

if (!process.env.REACT_APP_API) {
  throw new Error('API url should be defined in environment');
}

type AuthRegister = {
  newUsername: string;
  newUserEmail: string;
  newUserPassword: string;
};
type AuthLogin = {
  loginUsername: string;
  loginPassword: string;
};
export type AuthPayload = { login: string; pwd: string; email: string };
export function makeRequest(
  type: AuthType,
  payload: AuthPayload
): Promise<boolean> {
  const data: AuthRegister | AuthLogin =
    type === AuthType.login
      ? {
          loginUsername: payload.login,
          loginPassword: payload.pwd,
        }
      : {
          newUsername: payload.login,
          newUserEmail: payload.email,
          newUserPassword: payload.pwd,
        };

  return new Promise((res, rej) => {
    axios
      .post(`${process.env.REACT_APP_API}/${type}`, data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then(({ data }) => {
        LS.set(LSKeys.token, {
          ...data,
          username: payload.login,
        });
        socketSendAuth();
        res(true);
      })
      .catch(e => {
        rej(e);
      });
  });
}
