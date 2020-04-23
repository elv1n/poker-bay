import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CircularProgress, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useRoute } from 'wouter';
import { gameSelector } from '../../features/game/gameSlice';
import { PokerTable } from '../../components/PokerTable';
import { socketSend, SocketSendTag } from '../../socket';
import { PlayerToolbar } from '../../components/PlayerToolbar';
import { PokerTableInfo } from '../../components/PokerTableInfo';
import { Routes } from '../../constants';
import { PlayAudio } from '../../components/PlayAudio';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
  },
  toolbar: {
    background: theme.palette.background.default,
    boxShadow: `0 0 30px 0 ${theme.palette.background.paper}`,
  },
}));
export const Game: React.FC<{}> = () => {
  const [match, params] = useRoute(Routes.game);
  const classes = useStyles();
  const isLoaded = useSelector(gameSelector.isLoaded);

  useEffect(() => {
    const name = params?.name;
    if (name) {
      socketSend({
        tag: SocketSendTag.SubscribeToTable,
        contents: name,
      });
    }
  }, [params]);

  if (!isLoaded) {
    return <CircularProgress />;
  }
  return (
    <>
      <Grid className={classes.root} container direction="column" wrap="nowrap">
        <Grid item>
          <PokerTableInfo />
        </Grid>
        <Grid item>
          <PokerTable />
        </Grid>
        <Grid className={classes.toolbar} item xs>
          <PlayerToolbar />
        </Grid>
      </Grid>
      <PlayAudio />
    </>
  );
};
