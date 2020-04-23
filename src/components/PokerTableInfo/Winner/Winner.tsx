import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Slide, Snackbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { isBoolean } from 'lodash-es';
import { gameSelector } from '../../../features/game';
import { GameStreet, HandRank } from '../../../socket/types/game';

const useStyles = makeStyles({
  text: {
    textTransform: 'uppercase',
  },
});

type Props = {};

export const Winner: React.FC<Props> = () => {
  const classes = useStyles();
  const [winContent, setWinContent] = useState<
    {
      name: string;
      hand: HandRank | boolean;
    }[]
  >();
  const street = useSelector(gameSelector.get('_street'));

  const winners = useSelector(gameSelector.getWinners);

  useEffect(() => {
    const keys = Object.keys(winners);
    if (keys.length) {
      const winContent = keys.map(name => ({ name, hand: winners[name] }));
      setWinContent(winContent);
    }
    return undefined;
  }, [winners, setWinContent]);

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={street === GameStreet.Showdown}
      TransitionComponent={Slide}
    >
      <div>
        {winContent &&
          winContent.map(({ name, hand }) => (
            <Typography className={classes.text} key={name} variant="h6">
              {isBoolean(hand) ? `${name} win` : `${name} win with ${hand}`}
            </Typography>
          ))}
      </div>
    </Snackbar>
  );
};
