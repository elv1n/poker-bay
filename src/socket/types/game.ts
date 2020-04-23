import type { ICard } from './card';
import type { IPlayer } from './player';

export enum GameStreet {
  PreDeal = 'PreDeal',
  PreFlop = 'PreFlop',
  Flop = 'Flop',
  Turn = 'Turn',
  River = 'River',
  Showdown = 'Showdown',
}

export enum HandRank {
  HighCard = 'HighCard',
  Pair = 'Pair',
  TwoPair = 'TwoPair',
  Trips = 'Trips',
  Straight = 'Straight',
  Flush = 'Flush',
  FullHouse = 'FullHouse',
  Quads = 'Quads',
  StraightFlush = 'StraightFlush',
}

export enum WinnerTag {
  Multi = 'MultiPlayerShowdown',
  AllFolded = 'SinglePlayerShowdown',
  No = 'NoWinners',
}

type GenWinner<
  Tag extends WinnerTag,
  Contents = undefined
> = Contents extends undefined
  ? { tag: Tag }
  : { tag: Tag; contents: Contents };

// occurs when everyone folds to one player
export type SingleShowdown = GenWinner<WinnerTag.AllFolded, string>;

type Hand = [HandRank, ICard[]];
export type MultiPlayerShowdown = GenWinner<WinnerTag.Multi, [Hand, string][]>;

export interface IGame {
  _currentPosToAct: number | null;
  _bigBlind: number;
  _board: ICard[];
  _dealer: number;
  _deck: ICard[];
  _maxBet: number;
  _minBuyInChips: 3000;
  _maxBuyInChips: 3000;
  _smallBlind: number;
  _street: GameStreet;
  _players: IPlayer[];
  _pot: number;
  _winners: SingleShowdown | MultiPlayerShowdown | GenWinner<WinnerTag.No>;
  _waitlist: string[];
}

export enum GameErrorType {
  NotEnoughChips = 'NotEnoughChips',
  OverMaxChipsBuyIn = 'OverMaxChipsBuyIn',
  PlayerNotAtTable = 'PlayerNotAtTable',
  AlreadySatAtTable = 'AlreadySatAtTable',
  NotAtTable = 'NotAtTable',
  CannotSitAtFullTable = 'CannotSitAtFullTable',
  AlreadyOnWaitlist = 'AlreadyOnWaitlist',
  InvalidMove = 'InvalidMove',
}

type GenErrorContents<
  Tag extends GameErrorType,
  Contents = undefined
> = Contents extends undefined
  ? { tag: Tag }
  : { tag: Tag; contents: Contents };

type PlayerName = string;

export type GameErrorContents =
  | GenErrorContents<GameErrorType.NotEnoughChips, PlayerName>
  | GenErrorContents<GameErrorType.OverMaxChipsBuyIn, PlayerName>
  | GenErrorContents<GameErrorType.PlayerNotAtTable, PlayerName>
  | GenErrorContents<GameErrorType.AlreadySatAtTable, PlayerName>
  | GenErrorContents<GameErrorType.NotAtTable, PlayerName>
  | GenErrorContents<GameErrorType.CannotSitAtFullTable, PlayerName>
  | GenErrorContents<GameErrorType.AlreadyOnWaitlist, PlayerName>
  | GenErrorContents<GameErrorType.InvalidMove, any>;
