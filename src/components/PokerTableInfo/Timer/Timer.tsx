import React from 'react';
import { Slide, Snackbar, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { gameSelector } from '../../../features/game';
import { useTimeToAction } from '../../../hooks/useTimeToAction';
import { PlayOnce } from '../../PlayOnce';
import { PokerSound } from '../../../utils/assets';

type Props = {};

const DisplayTime: React.FC<Props> = () => {
  const time = 30 - useTimeToAction(true);
  const timeStr = time > 9 ? time : `0${time}`;
  return (
    <>
      <Typography variant="h6">0:{timeStr}</Typography>
      <PlayOnce sound={time === 5 ? PokerSound.Timeout : undefined} />
    </>
  );
};

export const Timer = () => {
  const isMyTurn = useSelector(gameSelector.isMyTurn);
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={isMyTurn}
      TransitionComponent={Slide}
    >
      <div>{isMyTurn && <DisplayTime />}</div>
    </Snackbar>
  );
};
