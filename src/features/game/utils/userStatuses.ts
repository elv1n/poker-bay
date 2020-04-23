import { GameStreet, IGame } from '../../../socket/types/game';
import { IPlayer, PlayerState } from '../../../socket/types/player';

export const getUserStatuses = (
  game: IGame,
  prevMaxBet: number,
  prevGamePlayers?: { [key: string]: IPlayer }
) => {
  const { _players, _street, _dealer, _bigBlind, _smallBlind, _maxBet } = game;

  const statuses: { [key: string]: string | undefined } = {};

  _players.forEach((player, index) => {
    let status;
    if (player._playerState === PlayerState.In) {
      const prevPlayer = prevGamePlayers && prevGamePlayers[player._playerName];
      if (!prevPlayer?._actedThisTurn && player._actedThisTurn) {
        if (!player._bet) {
          status = 'Check';
        } else if (_street === GameStreet.PreDeal) {
          if (player._bet === _smallBlind) {
            status = 'Small Blind';
          } else if (player._bet === _bigBlind) {
            status = 'Big Blind';
          }
        } else if (player._bet === prevMaxBet) {
          status = `Call ${player._bet}`;
        } else if (player._bet > 0 && player._bet !== prevMaxBet) {
          if (!player._chips) {
            status = 'All in';
          } else if (prevMaxBet === 0) {
            status = `Bet ${player._bet}`;
          } else {
            status = `Raise ${player._bet}`;
          }
        }
      } else if (player._bet > 0 && prevPlayer?._bet !== player._bet) {
        if (!player._chips) {
          status = 'All in';
        } else if (player._bet === prevMaxBet) {
          status = `Call ${player._bet}`;
        } else if (player._bet > 0) {
          status = `Raise ${player._bet}`;
        }
      }
    } else if (player._playerState === PlayerState.Folded) {
      status = 'Fold';
    } else {
      status = "I'm Out";
    }
    statuses[player._playerName] = status;
  });
  return statuses;
};
