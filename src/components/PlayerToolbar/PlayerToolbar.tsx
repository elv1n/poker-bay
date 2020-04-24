import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { gameSelector } from '../../features/game';
import { SitIn } from './SitIn';
import { PlayerBets } from './PlayerBets';
import { PlayerCard } from './PlayerCard';
import { PlayerAction } from './PlayerAction';
import { RaiseContext } from './RaiseContext';
import { AutoAction } from './constants';
import { GameStreet } from '../../socket/types/game';

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
  },
  root: {
    width: '100%',
    minHeight: '100%',
  },
}));
type Props = {};

const PlayerInGame = () => {
  const street = useSelector(gameSelector.get('_street'));
  const player = useSelector(gameSelector.getMyPlayer);
  const [raise, setRaise] = useState(0);
  const [autoAction, setAutoAction] = useState(AutoAction.None);

  const toggleAutoAction = useCallback(
    (newAction: AutoAction) =>
      setAutoAction(action =>
        action === newAction ? AutoAction.None : newAction
      ),
    []
  );

  useEffect(() => {
    // Reset auto for new game
    if (street === GameStreet.PreDeal) {
      // do not reset leave action
      setAutoAction(action =>
        action !== AutoAction.Leave ? action : AutoAction.None
      );
    }
  }, [street]);

  return (
    <RaiseContext.Provider
      value={{ raise, setRaise, autoAction, toggleAutoAction }}
    >
      <Grid item md={3} sm={4} xs={12}>
        <PlayerBets />
      </Grid>
      <Grid item md={6} sm={4} xs={12}>
        <PlayerAction player={player} />
      </Grid>
      <Grid item md={3} sm={4} xs={12}>
        <PlayerCard player={player} />
      </Grid>
    </RaiseContext.Provider>
  );
};

export const PlayerToolbar: React.FC<Props> = () => {
  const classes = useStyles();
  const player = useSelector(gameSelector.getMyPlayer);

  let content;
  if (player) {
    content = <PlayerInGame />;
  } else {
    content = (
      <Grid item md={4} xs={12}>
        <SitIn />
      </Grid>
    );
  }

  return (
    <Container className={classes.container} maxWidth="md">
      <Grid
        alignItems="center"
        className={classes.root}
        container
        justify="center"
      >
        {content}
      </Grid>
    </Container>
  );
};
