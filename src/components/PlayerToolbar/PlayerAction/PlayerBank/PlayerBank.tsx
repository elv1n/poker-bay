import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Money } from '../../../icons';
import { gameSelector } from '../../../../features/game';

const useStyles = makeStyles({
  root: {
    justifyContent: 'center',
  },
  text: {
    flex: 'unset',
  },
});
type Props = {};

export const PlayerBank: React.FC<Props> = () => {
  const classes = useStyles();
  const { _chips } = useSelector(gameSelector.getMyPlayer);
  return (
    <ListItem className={classes.root}>
      <ListItemIcon>
        <Money viewBox="0 0 512 512" />
      </ListItemIcon>
      <ListItemText
        className={classes.text}
        primary={_chips}
        primaryTypographyProps={{
          color: 'textPrimary',
          variant: 'h6',
        }}
        secondary="Available"
      />
    </ListItem>
  );
};
