import { GameStreet, IGame } from '../../../socket/types/game';

export const getUserCards = (game: IGame, winPlayers: string[]) => {
  const { _street, _players, _dealer } = game;
  // only after river
  if (_street !== GameStreet.Showdown || game._board.length !== 5) return {};
  const winIndexes: number[] = [];
  _players.forEach(({ _playerName }, index) => {
    if (winPlayers.includes(_playerName)) {
      winIndexes.push(index);
    }
  });

  let winShown = false;
  const showCard: {
    [key: string]: boolean;
  } = {};
  for (let i = _dealer + 1; i <= _players.length + _dealer; i++) {
    const realIndex = i >= _players.length ? i - _players.length : i;
    const player = _players[realIndex];
    const isWinner = winPlayers.includes(player._playerName);
    showCard[player._playerName] = winShown ? isWinner : true;
    if (isWinner) {
      winShown = true;
    }
  }
  return showCard;
};
