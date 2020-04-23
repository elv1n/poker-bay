import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Box } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { koKR } from '@material-ui/core/locale';
import { getPokerSound, PokerSound } from '../../utils/assets';
import { gameSelector } from '../../features/game';
import { GameStreet } from '../../socket/types/game';
import { PlayOnce } from '../PlayOnce';

const streetSound: { [key in GameStreet]?: PokerSound } = {
  [GameStreet.Flop]: PokerSound.TurnCards,
  [GameStreet.Turn]: PokerSound.TurnCard,
  [GameStreet.River]: PokerSound.TurnCard,
  [GameStreet.Showdown]: PokerSound.Win,
};

type Props = {};

export const PlayAudio: React.FC<Props> = () => {
  const [sound, setSound] = useState<PokerSound>();
  const street = useSelector(gameSelector.get('_street'));
  const isMyTurn = useSelector(gameSelector.isMyTurn);

  useEffect(() => {
    const sound = streetSound[street];
    if (sound) {
      setSound(sound);
    }
  }, [street]);

  useEffect(() => {
    if (isMyTurn) {
      setSound(PokerSound.YourAction);
    }
  }, [isMyTurn]);

  const onReset = useCallback(() => setSound(undefined), []);

  return <PlayOnce onReset={onReset} sound={sound} />;
};
