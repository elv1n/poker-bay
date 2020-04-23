import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTimeToAction } from '../../../../hooks/useTimeToAction';

const useStyles = makeStyles({
  progress: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

type Props = { active: boolean };

export const PlayerProgress: React.FC<Props> = ({ active }) => {
  const classes = useStyles();
  const time = useTimeToAction(active);
  return (
    <CircularProgress
      className={classes.progress}
      size={70}
      value={(time / 30) * 100}
      variant="static"
    />
  );
};
