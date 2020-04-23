import { number } from 'prop-types';
import type { ICard } from './card';
import {
  MapToTagContents,
  Unionize,
  UnionizeToTagContents,
} from '../../utils/tsHelpers';

export enum PlayerState {
  In = 'In',
  Out = 'SatOut',
  Folded = 'Folded',
}
export enum Blind {
  Small = 'Small',
  Big = 'Big',
  No = 'NoBlind',
}

export enum PlayerActionType {
  PostBlind = 'PostBlind',
  Fold = 'Fold',
  SitDown = 'SitDown',
  Call = 'Call',
  Raise = 'Raise',
  Check = 'Check',
  Bet = 'Bet',
  ShowHand = 'ShowHand',
  MuckHand = 'MuckHand',
  SitOut = 'SitOut',
  SitIn = 'SitIn',
  Timeout = 'Timeout',
}

export type ValuesType<T extends Record<any, any>> = T extends object
  ? T[keyof T]
  : never;

type GenPlayerAction<
  T extends PlayerActionType,
  R = undefined
> = R extends undefined ? { tag: T } : { tag: T; contents: R };

type AllPlayerActions = {
  [PlayerActionType.PostBlind]: Blind;
  [PlayerActionType.Fold]: undefined;
  [PlayerActionType.Check]: undefined;
  [PlayerActionType.Call]: undefined;
  [PlayerActionType.Raise]: number;
  [PlayerActionType.Bet]: number;
  [PlayerActionType.SitOut]: undefined;
  [PlayerActionType.SitDown]: string;
  [PlayerActionType.MuckHand]: undefined;
  [PlayerActionType.SitIn]: undefined;
  [PlayerActionType.ShowHand]: undefined;
  [PlayerActionType.Timeout]: undefined;
};

export type PlayerFoldAction = GenPlayerAction<PlayerActionType.Fold>;

export type PlayerAction = MapToTagContents<Unionize<AllPlayerActions>>;
export type PlayerActions = PlayerAction[];
export type PlayerActionsRecord = UnionizeToTagContents<AllPlayerActions>;

export interface IPlayer {
  _actedThisTurn: boolean;
  _bet: number;
  _chips: number;
  _committed: number;
  _playerName: string;
  _playerState: PlayerState;
  _pockets: ICard[] | null;
  _possibleActions: PlayerActions;
}
