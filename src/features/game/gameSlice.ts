/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { SocketGame } from '../../socket/types';
import type { RootState } from '../../store';
import type { IGame } from '../../socket/types/game';
import { HandRank, WinnerTag } from '../../socket/types/game';
import type { IPlayer } from '../../socket/types/player';
import { authSelector } from '../auth';
import { getUserStatuses } from './utils/userStatuses';
import { getUserCards } from './utils/userCards';

enum GameStatus {
  Pending,
  Success,
  Error,
}

export type Game = {
  maxPlayers: number;
  name: string;
  players: string[];
  winPlayers: string[];
} & Omit<IGame, '_players' | '_winners'>;

type GameMounted = {
  status: GameStatus.Success;
  game: Game;
  players: {
    [key: string]: IPlayer;
  };
  showCards: {
    [key: string]: boolean;
  };
  playerStatus: {
    [key: string]: string | undefined;
  };
  winners: {
    [key: string]: HandRank | boolean;
  };
};

type GameState =
  | {
      status: GameStatus.Pending;
    }
  | {
      status: GameStatus.Error;
      message: string;
    }
  | GameMounted;

const initialState = {
  status: GameStatus.Pending,
} as GameState;

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<SocketGame['contents']>) => {
      const [name, gameState] = action.payload;
      const { _players, _winners, ...game } = gameState;
      const players = _players.reduce(
        (acc: { [key: string]: IPlayer }, player) => {
          acc[player._playerName] = player;
          return acc;
        },
        {}
      );
      const playerStatus =
        state.status === GameStatus.Success
          ? getUserStatuses(gameState, state.game._maxBet, state.players)
          : getUserStatuses(gameState, 0);

      const winners: { [key: string]: HandRank | boolean } = {};
      const winPlayers: string[] = [];
      if (_winners.tag === WinnerTag.AllFolded) {
        winners[_winners.contents] = true;
      } else if (_winners.tag === WinnerTag.Multi) {
        _winners.contents.forEach(([hand, name]) => {
          const rank = hand[0];
          winners[name] = rank;
          winPlayers.push(name);
        });
      }

      const showCards = getUserCards(gameState, winPlayers);

      return {
        game: {
          name,
          ...game,
          players: Object.keys(players),
          maxPlayers: 9,
          winPlayers,
        },
        players,
        status: GameStatus.Success,
        playerStatus,
        winners,
        showCards,
      };
    },
    update: (state, action: PayloadAction<Partial<Game>>) => {
      if (state.status === GameStatus.Success) {
        state.game = Object.assign(state.game, action.payload);
      }
    },
    error: (state, action: PayloadAction<string>) => ({
      message: action.payload,
      status: GameStatus.Error,
    }),
  },
});

export const gameActions = gameSlice.actions;
export const gameSelector = {
  isLoaded: (state: RootState) => state.game.status === GameStatus.Success,
  get: <T extends keyof Game>(key: T) => ({ game }: RootState): Game[T] => {
    if (game.status !== GameStatus.Success) {
      throw new Error('Game not loaded');
    }
    return game.game[key];
  },
  getPlayer: (name: string) => (state: RootState) => {
    const { players } = state.game as GameMounted;
    return players[name];
    // const fakeFlayer: IPlayer = {
    //   _possibleActions: [],
    //   _pockets: [],
    //   _actedThisTurn: false,
    //   _playerName: 'test',
    //   _committed: 0,
    //   _bet: 0,
    //   _chips: 0,
    //   _playerState: PlayerState.In,
    // };
    // return fakeFlayer;
  },
  getPlayerStatus: (name: string) => (state: RootState) => {
    const { playerStatus } = state.game as GameMounted;
    return playerStatus[name];
  },
  getCurrentActName: (state: RootState) => {
    const { game } = state.game as GameMounted;
    if (game._currentPosToAct === null) {
      return undefined;
    }
    return game.players[game._currentPosToAct];
  },
  getInfo: (state: RootState) => {
    return {
      name: gameSelector.get('name')(state),
      maxPlayers: gameSelector.get('maxPlayers')(state),
      players: gameSelector.get('players')(state).length,
    };
  },
  getMyPlayer: (state: RootState) => {
    const me = authSelector.user(state);
    return gameSelector.getPlayer(me)(state);
  },

  isMyTurn: (state: RootState) => {
    const player = gameSelector.getMyPlayer(state);
    return Boolean(
      player && player._possibleActions.length && !player._actedThisTurn
    );
  },

  amIWinner: (name: string) => (state: RootState) => {
    const { winners } = state.game as GameMounted;
    return Boolean(winners[name]);
  },
  getWinners: (state: RootState) => {
    const { winners } = state.game as GameMounted;
    return winners;
  },
  isUserShowCards: (name: string) => (state: RootState) => {
    const { showCards } = state.game as GameMounted;
    return Boolean(showCards[name]);
  },
};
