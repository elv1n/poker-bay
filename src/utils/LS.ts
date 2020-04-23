import { isString } from 'lodash-es';

export enum LSKeys {
  token = 'token',
  redirect = 'redirect',
}
export const LS = {
  set: (key: LSKeys, value: string | boolean | number) => {
    localStorage.setItem(key, isString(value) ? value : JSON.stringify(value));
  },
  remove: (key: LSKeys) => {
    localStorage.removeItem(key);
  },
  get: (key: LSKeys, isString?: boolean) => {
    const value = localStorage.getItem(key);
    if (isString) {
      return value;
    }
    if (value) {
      try {
        return JSON.parse(value);
      } catch (e) {
        // do nothing
      }
    }
    return undefined;
  },
  getUsername: () => {
    const user = LS.get(LSKeys.token);
    return user?.username || '';
  },
};
