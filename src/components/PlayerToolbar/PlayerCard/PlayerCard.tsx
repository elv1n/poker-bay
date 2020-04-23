import React from 'react';
import { IPlayer } from '../../../socket/types/player';
import { Cards } from '../../Cards';

type Props = {
  player: IPlayer;
};

export const PlayerCard: React.FC<Props> = ({ player }) => {
  const { _pockets } = player;

  return <Cards cards={_pockets} max={2} />;
};
