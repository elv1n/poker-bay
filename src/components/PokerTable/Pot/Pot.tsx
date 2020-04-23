import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CountUp from 'react-countup';
import { Box, Icon } from '@material-ui/core';
import { gameSelector } from '../../../features/game';
import { usePrevious } from '../../../hooks/usePrevious';
import { Money } from '../../icons';

const BORDER = 3;

const useStyles = makeStyles(theme => {
  const { paper: main } = theme.palette.background;
  return {
    pot: {
      textAlign: 'center',
    },
    text: {
      // position: 'absolute',
      // top: '50%',
      // left: '50%',
      // transform: 'translateX(-50%) translateY(-50%)',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      background: theme.palette.background.paper,
      borderRadius: theme.spacing(8),
      marginTop: theme.spacing(2),
      padding: theme.spacing(1, 3),
      // fontSize: theme.typography.pxToRem(30),
      // color: theme.palette.text.primary,
      fontWeight: 'bold',
      border: `${BORDER}px solid ${theme.palette.common.white}`,
      boxShadow: `inset 3px 3px 7px 0px ${main}`,
      boxSizing: 'border-box',
      '& > svg': {
        marginRight: theme.spacing(1),
      },
    },
  };
});

type Props = {};

export const Pot: React.FC<Props> = () => {
  const classes = useStyles();
  const potSize = useSelector(gameSelector.get('_pot'));
  const prevPot = usePrevious(potSize || 0);
  return (
    <div className={classes.pot}>
      <Typography className={classes.text} variant="h4">
        <Money viewBox="0 0 512 512" />
        <CountUp end={potSize} start={prevPot} />
      </Typography>
    </div>
  );
};
