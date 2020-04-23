import { PlayerPosition } from './helpers';
import { getKeys } from '../../utils/object';
import { tableOptions } from '../../constants';

type StyleProps = {
  top?: number | string;
  left?: number | string;
  bottom?: number | string;
  right?: number | string;
  translateX?: number;
  translateY?: number;
  rotate?: number;
};
const playerSeatAll: { [key in PlayerPosition]: StyleProps } = {
  [PlayerPosition.LT]: {
    translateX: -50,
    translateY: -50,
  },
  [PlayerPosition.LC]: {
    top: '50%',
    left: -tableOptions.border,
    translateX: -100,
    translateY: -50,
  },
  [PlayerPosition.LB]: {
    bottom: 0,
    translateX: -50,
    translateY: 50,
  },
  [PlayerPosition.CT]: {
    top: 10,
    left: '50%',
    translateX: -50,
  },
  [PlayerPosition.CTL]: {
    left: '35%',
    top: -tableOptions.border,
    translateX: -50,
    translateY: -100,
  },
  [PlayerPosition.CTR]: {
    left: '65%',
    top: -tableOptions.border,
    translateX: -50,
    translateY: -100,
  },
  [PlayerPosition.CB]: {
    bottom: -tableOptions.border,
    left: '50%',
    translateX: -50,
    translateY: 100,
  },
  [PlayerPosition.RT]: {
    right: 0,
    translateX: 50,
    translateY: -50,
  },
  [PlayerPosition.RC]: {
    top: '50%',
    right: -tableOptions.border,
    translateX: 100,
    translateY: -50,
  },
  [PlayerPosition.RB]: {
    bottom: 0,
    right: 0,
    translateX: 50,
    translateY: 50,
  },
};
export const playerSeatStyles = getKeys(playerSeatAll).reduce(
  (acc: { [key: string]: React.CSSProperties }, key) => {
    const style = playerSeatAll[key];
    acc[`seat${key}`] = getKeys(style).reduce(
      (acc: React.CSSProperties, key) => {
        const value = style[key];
        if (key === 'translateX') {
          acc.transform += ` translateX(${value}%)`;
        } else if (key === 'translateY') {
          acc.transform += ` translateY(${value}%)`;
        } else if (key === 'rotate') {
          return acc;
        } else {
          acc[key] = value;
        }
        return acc;
      },
      { transform: '' }
    );
    return acc;
  },
  {}
);
