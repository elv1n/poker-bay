import React, { useContext, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import useMeasure from 'react-use-measure';
import { useSelector } from 'react-redux';
import { gameSelector } from '../../../features/game';
import { PokerCard } from '../../PokerCard';
import { Pot } from '../Pot';
import { PokerTableContext } from '../PokerTableContext';
import { Cards } from '../../Cards';
import { getFakeCards } from '../../../utils/fake';

const useStyles = makeStyles({
  cards: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
  },
  deck: {
    flex: 1,
  },
});

type Props = {};

export const CardPlace: React.FC<Props> = () => {
  const classes = useStyles();

  const { width, height } = useContext(PokerTableContext);

  const style = useMemo(() => {
    const cardsWidth = width * 0.6;
    return {
      width: cardsWidth,
      height: height * 0.6,
    };
  }, [width, height]);

  const board = useSelector(gameSelector.get('_board'));

  return (
    <Grid
      alignItems="center"
      className={classes.cards}
      container
      direction="column"
      justify="center"
      style={style}
    >
      <Cards cards={board} className={classes.deck} max={5} />
      <Pot />
    </Grid>
  );
};
