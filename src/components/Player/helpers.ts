/**
 * L left
 * T top
 * B bottom
 * R right
 * first letter X position
 * second letter Y position
 * third lefter? float in position
 */
import {
  IPlayer,
  PlayerActionType,
  PlayerState,
} from '../../socket/types/player';

export enum PlayerPosition {
  LT,
  LC,
  LB,
  CT,
  CTL,
  CTR,
  CB,
  RT,
  RC,
  RB,
}
// first user
const positions: PlayerPosition[][] = [
  // 1
  [PlayerPosition.LC],
  // 2
  [PlayerPosition.LC, PlayerPosition.RC],
  // 3
  [PlayerPosition.LC, PlayerPosition.RT, PlayerPosition.RB],
  // 4
  [PlayerPosition.LT, PlayerPosition.RT, PlayerPosition.RB, PlayerPosition.LB],
  // 5
  [
    PlayerPosition.LT,
    PlayerPosition.RT,
    PlayerPosition.RB,
    PlayerPosition.LB,
    PlayerPosition.RC,
  ],
  // 6
  [
    PlayerPosition.LT,
    PlayerPosition.RT,
    PlayerPosition.RB,
    PlayerPosition.LB,
    PlayerPosition.RC,
    PlayerPosition.LC,
  ],
  // 7
  [
    PlayerPosition.LT,
    PlayerPosition.RT,
    PlayerPosition.RB,
    PlayerPosition.LB,
    PlayerPosition.RC,
    PlayerPosition.LC,
    PlayerPosition.CT,
  ],
  // 8
  [
    PlayerPosition.LT,
    PlayerPosition.RT,
    PlayerPosition.RB,
    PlayerPosition.LB,
    PlayerPosition.RC,
    PlayerPosition.LC,
    PlayerPosition.CT,
    PlayerPosition.CB,
  ],
  // 9
  [
    PlayerPosition.LT,
    PlayerPosition.RT,
    PlayerPosition.RB,
    PlayerPosition.LB,
    PlayerPosition.RC,
    PlayerPosition.LC,
    PlayerPosition.CTL,
    PlayerPosition.CB,
    PlayerPosition.CTR,
  ],
];

export const getSeatPosition = (index: number, max: number) => {
  if (max > 9) {
    throw new Error('Allowed only 9 users maximum');
  }
  return positions[max - 1][index];
};
export const isRightPosition = (position: PlayerPosition) =>
  position === PlayerPosition.RT ||
  position === PlayerPosition.RC ||
  position === PlayerPosition.RB;

export const isCenterPosition = (position: PlayerPosition) =>
  position === PlayerPosition.CT ||
  position === PlayerPosition.CTL ||
  position === PlayerPosition.CTR ||
  position === PlayerPosition.CB;
