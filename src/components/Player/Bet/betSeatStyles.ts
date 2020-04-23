import { PlayerPosition } from '../helpers';
import { getKeys } from '../../../utils/object';

type StyleProps = {
  top?: number | string;
  left?: number | string;
  bottom?: number | string;
  right?: number | string;
  translateX?: number;
  translateY?: number;
  rotate?: number;
  origin?: string;
};
const betSeatAll: { [key in PlayerPosition]: StyleProps } = {
  [PlayerPosition.LT]: {
    top: '15%',
    left: '15%',
    rotate: -45,
    translateX: -50,
    origin: '0 0',
  },
  [PlayerPosition.LC]: {
    top: '50%',
    left: 10,
    translateX: -50,
    rotate: -90,
    origin: 'left top',
  },
  [PlayerPosition.LB]: {
    bottom: '15%',
    left: '15%',
    rotate: -150,
    translateX: -50,
    origin: 'left center',
  },
  [PlayerPosition.CT]: {
    top: 10,
    left: '50%',
    translateX: 50,
    origin: 'center',
  },
  [PlayerPosition.CTL]: {
    top: 15,
    left: '35%',
    translateX: -50,
  },
  [PlayerPosition.CTR]: {
    top: 15,
    left: '65%',
    translateX: -50,
  },
  [PlayerPosition.CB]: {
    bottom: 10,
    left: '50%',
    translateX: 50,
    rotate: 180,
    origin: 'center',
  },
  [PlayerPosition.RT]: {
    top: '15%',
    right: '15%',
    rotate: 45,
    translateX: 50,
    origin: 'top right',
  },
  [PlayerPosition.RC]: {
    top: '50%',
    right: 10,
    translateX: 50,
    rotate: 90,
    origin: 'right top',
  },
  [PlayerPosition.RB]: {
    bottom: '15%',
    right: '15%',
    rotate: 150,
    translateX: 50,
    origin: 'right center',
  },
};
export const betSeatStyle = getKeys(betSeatAll).reduce(
  (acc: { [key: string]: React.CSSProperties }, key) => {
    const style = betSeatAll[key];
    acc[`seat${key}`] = getKeys(style).reduce(
      (acc: React.CSSProperties, key) => {
        const value = style[key];
        if (key === 'translateX') {
          acc.transform += ` translateX(${value}%)`;
        } else if (key === 'translateY') {
          acc.transform += ` translateY(${value}%)`;
        } else if (key === 'rotate') {
          acc.transform = `rotate(${value}deg)${acc.transform}`;
        } else if (key === 'origin') {
          acc.transformOrigin = value;
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
