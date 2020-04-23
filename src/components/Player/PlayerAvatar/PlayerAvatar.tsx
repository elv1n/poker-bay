import React from 'react';
import { Avatar, ListItemAvatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { gameSelector } from '../../../features/game';
import { WinIcon } from './WinIcon';
import { PlayerProgress } from './PlayerProgress';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
  },
  avatar: {
    width: 70,
    height: 70,
    boxShadow: theme.shadows[3],
    border: '5px solid white',
  },
}));

type Props = {
  name: string;
};

export const PlayerAvatar: React.FC<Props> = ({ name }) => {
  const player = useSelector(gameSelector.getPlayer(name));
  const actName = useSelector(gameSelector.getCurrentActName);
  const amIWinner = useSelector(gameSelector.amIWinner(name));

  const classes = useStyles();

  return (
    <ListItemAvatar className={classes.root}>
      <>
        <WinIcon has={amIWinner} />
        <Avatar className={classes.avatar}>{name.charAt(0)}</Avatar>
        <PlayerProgress
          active={actName === name && player._possibleActions.length > 0}
        />
      </>
    </ListItemAvatar>
  );
};
