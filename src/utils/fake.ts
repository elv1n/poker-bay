import { isEqual, random, range, unionWith } from 'lodash-es';
import { ICard, Rank, Suit } from '../socket/types/card';

export const getFakeCards = (count: number, join?: ICard[]): ICard[] => {
  const res = unionWith(
    range(count)
      .map(() => ({
        rank: Object.values(Rank)[random(0, Object.keys(Rank).length - 1)],
        suit: Object.values(Suit)[random(0, Object.keys(Suit).length - 1)],
      }))
      .concat(join || []),
    isEqual
  );
  if (res.length < count) {
    return getFakeCards(res.length - count, res);
  }
  return res;
};
