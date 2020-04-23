import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Grid, Typography } from '@material-ui/core';
import { isEqual } from 'lodash-es';
import { gameSelector } from '../../features/game';
import { Timer } from './Timer';
import { Winner } from './Winner';

type Props = {};

export const PokerTableInfo: React.FC<Props> = () => {
  const table = useSelector(gameSelector.getInfo, isEqual);

  return (
    <Container>
      <Grid alignItems="center" container justify="space-between">
        <Grid item>
          <Typography variant="h6">Game {table.name}</Typography>
          <Typography color="textSecondary" variant="body1">
            {table.players}/{table.maxPlayers} players
          </Typography>
        </Grid>
        <Grid item>
          <Timer />
          <Winner />
        </Grid>
        <Grid item />
      </Grid>
    </Container>
  );
};
