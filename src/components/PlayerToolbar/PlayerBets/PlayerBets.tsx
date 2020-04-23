import React, { useContext, useEffect, useMemo } from 'react';
import { ButtonBase, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { chipOrderStartSmall, useChipColorStyles } from '../../Chip/constants';
import { Chip, ChipSize } from '../../Chip';
import { RaiseContext } from '../RaiseContext';
import { gameSelector } from '../../../features/game';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    paddingLeft: theme.spacing(2),
    // '&:before': {
    //   content: "'Raise bet'",
    //
    // },
    '& [disabled] $item': {
      color: 'rgba(0, 0, 0, 0.26)',
      boxShadow: 'none',
      backgroundColor: theme.palette.action.disabledBackground,
    },
  },
  title: {
    transform: 'translate(-35%, -50%) rotate(-90deg)',
    color: theme.palette.text.primary,
    top: '50%',
    left: 0,
    position: 'absolute',
    fontSize: theme.typography.pxToRem(18),
    fontWeight: 700,
  },
  btn: {
    borderRadius: '50%',
    padding: 0,
    '&:hover $item': {
      opacity: 0.8,
    },
  },
  item: {
    position: 'relative',
    cursor: 'pointer',
    userSelect: 'none',
    transition: theme.transitions.create(['opacity'], {
      duration: theme.transitions.duration.short,
    }),
  },
  text: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
    color: theme.palette.common.white,
    ...theme.typography.button,
  },
}));

type Props = {};

export const PlayerBets: React.FC<Props> = () => {
  const classes = useStyles();
  const chipClasses = useChipColorStyles();

  const { raise, setRaise } = useContext(RaiseContext);
  const player = useSelector(gameSelector.getMyPlayer);

  useEffect(() => {
    // reset raise after each turn
    setRaise(0);
  }, [player._actedThisTurn]);

  const bank = player._chips;
  const availableChips = useMemo(() => {
    return chipOrderStartSmall.filter(chip => bank >= chip);
  }, [bank]);

  return (
    <Grid className={classes.root} container spacing={2}>
      <div className={classes.title}>Raise bet</div>
      {availableChips.map(chip => (
        <Grid item key={chip}>
          <ButtonBase
            className={classes.btn}
            disabled={bank - raise < chip}
            onClick={() => setRaise(bet => bet + chip)}
          >
            <Chip
              className={clsx(classes.item, chipClasses[`color${chip}`])}
              size={ChipSize.Large}
            >
              <Typography className={classes.text}>{chip}</Typography>
            </Chip>
          </ButtonBase>
        </Grid>
      ))}
      <Grid item>
        <ButtonBase className={classes.btn} onClick={() => setRaise(bank)}>
          <Chip className={clsx(classes.item)} size={ChipSize.Large}>
            <Typography className={classes.text}>All</Typography>
          </Chip>
        </ButtonBase>
      </Grid>
      <Grid item>
        <ButtonBase className={classes.btn} onClick={() => setRaise(0)}>
          <Chip
            className={clsx(classes.item, chipClasses.zero)}
            size={ChipSize.Large}
          >
            <Typography className={classes.text}>0</Typography>
          </Chip>
        </ButtonBase>
      </Grid>
    </Grid>
  );
};
