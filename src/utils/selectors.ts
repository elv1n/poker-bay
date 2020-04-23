import { isEqual } from 'lodash-es';

type MemoAll = {
  [key: string]: {
    lastArgs?: any;
    lastResult?: any;
  };
};

const memoAll: MemoAll = {};

export const simpleMemo = <G>(id: string, data: G[]): G[] => {
  if (!memoAll[id]) {
    memoAll[id] = {};
  }
  const memo = memoAll[id];
  if (!isEqual(data, memo.lastResult)) {
    memo.lastResult = data;
  }

  return memo.lastResult;
};
