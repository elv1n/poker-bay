import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { gameSelector } from '../features/game';
import { GameMoveContents } from '../socket/types';
import { sendGameMove } from '../socket';
import { PlayerAction } from '../socket/types/player';

export const useMoveCallback = () => {
  const name = useSelector(gameSelector.get('name'));

  return useCallback(
    (contents: PlayerAction) => {
      sendGameMove(name, contents);
    },
    [name]
  );
};
