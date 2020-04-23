import React, { useMemo } from 'react';
import { Grid } from '@material-ui/core';
import { SecondaryAction } from '../_shared_/SecondaryAction';
import type { IPlayer } from '../../../socket/types/player';
import { PlayerActionType } from '../../../socket/types/player';
import { MainAction } from './MainAction';
import { RaiseAction } from './RaiseAction';
import { PlayerBank } from './PlayerBank';
import { getPlayerActions } from './utils';
import { QuitAction } from './QuitAction';
import { FoldAction } from './FoldAction';

type Props = { player: IPlayer };

export const PlayerAction: React.FC<Props> = ({ player }) => {
  const availableActions = useMemo(() => {
    return getPlayerActions(player._possibleActions);
  }, [player._possibleActions]);

  return (
    <Grid container direction="column" justify="center" spacing={2}>
      <Grid item>
        <PlayerBank />
      </Grid>
      <Grid item xs>
        <MainAction actions={availableActions} />
      </Grid>
      <Grid item>
        <Grid alignItems="center" container justify="space-between" spacing={4}>
          <Grid item xs={4}>
            <RaiseAction actions={availableActions} />
          </Grid>
          <Grid item xs={4}>
            <FoldAction action={availableActions[PlayerActionType.Fold]} />
          </Grid>
          <Grid item xs={4}>
            <QuitAction />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
