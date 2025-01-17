import React from 'react';

import { Route, Switch } from 'wouter';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { Game } from './screens/Game';
import { useSocket } from './hooks/useSocket';
import { Routes } from './constants';
import { Auth } from './screens/Auth';
import { AppDrawer } from './components/AppDrawer';
import { Lobby } from './screens/Lobby';
import { authSelector, SocketStatus } from './features/auth';
import { UnderMaintenence } from './components/UnderMaintenence';

const useStyles = makeStyles(theme => ({
  '@global': {
    ':root': {
      '--chip-bg': theme.palette.background.default,
    },
    html: {
      background: theme.palette.background.default,
      '&::backdrop': {
        backgroundColor: theme.palette.background.default,
      },
    },
    // 'strong, b': {
    //   fontWeight: theme.typography.fontWeightBold,
    // },
    body: {
      margin: 0, // Remove the margin in all browsers.
      color: theme.palette.text.primary,
      ...theme.typography.body2,
    },
    'html, body, #root': {
      height: '100%',
      width: '100%',
    },
    '*, *::before, *::after': {
      boxSizing: 'inherit',
    },
  },
}));

export const App = () => {
  useSocket();
  useStyles();

  const isDisconnected = useSelector(
    authSelector.isSocket(SocketStatus.Disconnected)
  );

  if (isDisconnected) {
    return <UnderMaintenence />;
  }

  return (
    <>
      <Switch>
        <Route component={Auth} path={Routes.login} />
        <Route path={Routes.game}>
          <AppDrawer>
            <Game />
          </AppDrawer>
        </Route>
        <Route path={Routes.lobby}>
          <AppDrawer>
            <Lobby />
          </AppDrawer>
        </Route>
      </Switch>
    </>
  );
};
