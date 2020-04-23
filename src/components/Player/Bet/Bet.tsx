import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { random, range } from 'lodash-es';
import clsx from 'clsx';
import { getChips } from './constants';
import { PlayerPosition } from '../helpers';
import { betSeatStyle } from './betSeatStyles';
import { Chip } from '../../Chip';
import { chipColorStyles } from '../../Chip/constants';

const useStyles = makeStyles(theme => ({
  bet: {
    position: 'absolute',
    display: 'flex',
  },
  size: {
    position: 'absolute',
    zIndex: 1,
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
    width: '100%',
    color: theme.palette.grey[100],
  },
  chipsWrapper: {
    display: 'flex',
  },
  chips: {
    marginRight: 2,
    '& $chip:not(:first-child)': {
      marginTop: -15,
    },
  },
  chip: {},
  amount: {},
  ...chipColorStyles,
  ...betSeatStyle,
}));

type Props = {
  bet: number;
  seat: PlayerPosition;
};

export const Bet: React.FC<Props> = ({ bet, seat }) => {
  // const [temp, setTemp] = useState(random(10, 300));
  const classes = useStyles();
  // const chips = getChips(temp);
  const chips = getChips(bet);

  return (
    <div
      className={clsx(
        classes.bet,
        classes.chipsWrapper,
        (classes as any)[`seat${seat}`]
      )}
      // onClick={() => setTemp(random(10, 300))}
    >
      {chips.map((chip, index) => (
        <div
          className={clsx(classes.chips, (classes as any)[`color${chip.type}`])}
          key={chip.type}
        >
          {range(Math.min(chip.count, 13)).map(i => (
            <Chip className={clsx(classes.chip)} key={i} />
          ))}
        </div>
      ))}
      {bet > 0 && <div className={classes.amount}>{bet}</div>}
    </div>
  );
};
