import type { GameErrorContents, IGame } from './game';
import { Blind, PlayerAction, PlayerActionType } from './player';
import { ITable } from './lobby';

export enum SocketTag {
  AuthSuccess = 'AuthSuccess',
  SuccessfullySatDown = 'SuccessfullySatDown',
  SuccessfullyLeftSeat = 'SuccessfullyLeftSeat',
  SuccessfullySubscribedToTable = 'SuccessfullySubscribedToTable',
  GameMsgOut = 'GameMsgOut',
  NewGameState = 'NewGameState',
  ErrMsg = 'ErrMsg',
  TableList = 'TableList',
}

export type SocketGame = {
  tag:
    | SocketTag.SuccessfullySatDown
    | SocketTag.SuccessfullySubscribedToTable
    | SocketTag.NewGameState;
  contents: [string, IGame];
};

type SocketTableList = {
  tag: SocketTag.TableList;
  contents: ITable[];
};

type SocketGameLeft = {
  tag: SocketTag.SuccessfullyLeftSeat;
  contents: [string];
};

type SocketUndefined = {
  tag: SocketTag.GameMsgOut;
  contents: any;
};

export enum SocketErrorTags {
  TableFull = 'TableFull',
  TableDoesNotExist = 'TableDoesNotExist',
  NotSatAtTable = 'NotSatAtTable',
  AlreadySatInGame = 'AlreadySatInGame',
  NotSatInGame = 'NotSatInGame',
  AlreadySatAtTable = 'AlreadySatAtTable',
  AlreadySubscribedToTable = 'AlreadySubscribedToTable',
  NotEnoughChipsToSit = 'NotEnoughChipsToSit',
  GameErr = 'GameErr',
  InvalidGameAction = 'InvalidGameAction',
  ChipAmountNotWithinBuyInRange = 'ChipAmountNotWithinBuyInRange',
  UserDoesNotExistInDB = 'UserDoesNotExistInDB',
  AuthFailed = 'AuthFailed',
}

type GenErrorMsgContents<
  Tag extends SocketErrorTags,
  Contents = undefined
> = Contents extends undefined
  ? { tag: Tag }
  : { tag: Tag; contents: Contents };

type SocketErrors = {
  tag: SocketTag.ErrMsg;
  contents:
    | GenErrorMsgContents<SocketErrorTags.TableFull, string>
    | GenErrorMsgContents<SocketErrorTags.TableDoesNotExist, string>
    | GenErrorMsgContents<SocketErrorTags.NotSatAtTable, string>
    | GenErrorMsgContents<SocketErrorTags.AlreadySatInGame, string>
    | GenErrorMsgContents<SocketErrorTags.AlreadySatAtTable, string>
    | GenErrorMsgContents<SocketErrorTags.NotSatInGame, string>
    | GenErrorMsgContents<SocketErrorTags.AlreadySubscribedToTable, string>
    | GenErrorMsgContents<SocketErrorTags.NotEnoughChipsToSit>
    | GenErrorMsgContents<SocketErrorTags.GameErr, GameErrorContents>
    | GenErrorMsgContents<SocketErrorTags.InvalidGameAction>
    | GenErrorMsgContents<SocketErrorTags.ChipAmountNotWithinBuyInRange, string>
    | GenErrorMsgContents<SocketErrorTags.UserDoesNotExistInDB, string>
    | GenErrorMsgContents<SocketErrorTags.AuthFailed, string>;
};

export type SocketMsg =
  | {
      tag: SocketTag.AuthSuccess;
    }
  | SocketErrors
  | SocketGame
  | SocketGameLeft
  | SocketTableList
  | SocketUndefined;

export enum SocketSendTag {
  SubscribeToTable = 'SubscribeToTable',
  TakeSeat = 'TakeSeat',
  GameMsgIn = 'GameMsgIn',
  LeaveSeat = 'LeaveSeat',
  GameMove = 'GameMove',
}

type SubscribeToTable = {
  tag: SocketSendTag.SubscribeToTable;
  contents: string;
};

type TakeSeat = {
  tag: SocketSendTag.TakeSeat;
  contents: [string, number];
};

type LeaveSeat = {
  tag: SocketSendTag.LeaveSeat;
  contents: string;
};

type GenGameMove<
  Tag extends PlayerActionType,
  Contents = undefined
> = Contents extends undefined
  ? { tag: Tag }
  : { tag: Tag; contents: Contents };

export type GameMoveContents =
  | GenGameMove<PlayerActionType.PostBlind, Blind>
  | GenGameMove<PlayerActionType.Call>
  | GenGameMove<PlayerActionType.Check>
  | GenGameMove<PlayerActionType.Bet, number>
  | GenGameMove<PlayerActionType.Raise, number>
  | GenGameMove<PlayerActionType.Fold>;

export type GameMsgContents =
  | TakeSeat
  | LeaveSeat
  | { tag: SocketSendTag.GameMove; contents: [string, PlayerAction] };

export type SocketSendMsg =
  | SubscribeToTable
  | { tag: SocketSendTag.GameMsgIn; contents: GameMsgContents }
  | string;
