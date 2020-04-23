import React, { useCallback, useEffect, useRef } from 'react';
import { Box } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { getPokerSound, PokerSound } from '../../utils/assets';
import { gameSelector } from '../../features/game';
import { GameStreet } from '../../socket/types/game';

const streetSound: { [key in GameStreet]?: PokerSound } = {
  [GameStreet.Flop]: PokerSound.TurnCards,
  [GameStreet.Turn]: PokerSound.TurnCard,
  [GameStreet.River]: PokerSound.TurnCard,
  [GameStreet.Showdown]: PokerSound.Win,
};

type Props = {
  sound?: PokerSound;
  onReset?: () => void;
};

export const PlayOnce: React.FC<Props> = ({ sound, onReset }) => {
  const ref = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = ref.current;
    if (audio && sound) {
      audio.src = getPokerSound(sound);
      audio.load();
      (async () => {
        try {
          await audio.play();
        } catch (e) {
          // todo notify user that audio not working
        }
        if (onReset) onReset();
      })();
    }
  }, [sound, onReset]);

  return (
    <Box visibility="hidden">
      <audio ref={ref} />
    </Box>
  );
};
