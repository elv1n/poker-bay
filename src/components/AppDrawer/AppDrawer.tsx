import React, { useEffect } from 'react';
import { Box, Drawer, IconButton, List, ListItemIcon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { Redirect, useLocation } from 'wouter';
import { Cards, Logo } from '../icons';
import { UserMenu } from './UserMenu';
import { RootState } from '../../store';
import { authSelector } from '../../features/auth';
import { LS, LSKeys } from '../../utils/LS';
import { Routes } from '../../constants';
import { useSocket } from '../../hooks/useSocket';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: 'inherit',
  },
  drawer: {
    // width: 200,
    flexShrink: 0,
  },
  paper: {
    background: theme.palette.common.white,
  },
  content: {
    marginLeft: 60,
    marginTop: theme.spacing(2),
    flexGrow: 1,
  },
}));

type Props = {};

export const AppDrawer: React.FC<Props> = ({ children }) => {
  const [location, setLocation] = useLocation();

  const classes = useStyles();
  const isFailed = useSelector(authSelector.isFailed);
  const isAuthed = useSelector(authSelector.isAuthed);

  if (isFailed) {
    LS.set(LSKeys.redirect, location);
    return <Redirect to={Routes.login} />;
  }

  if (!isAuthed) {
    return null;
  }

  return (
    <div className={classes.root}>
      <Drawer
        anchor="left"
        className={classes.drawer}
        PaperProps={{
          className: classes.paper,
        }}
        variant="permanent"
      >
        <Box flexGrow={1} m={1}>
          <IconButton onClick={() => setLocation(Routes.lobby)}>
            {/* <Cards viewBox="0 0 512 512" /> */}
            <Logo viewBox="0 0 24 19" />
          </IconButton>
        </Box>
        <UserMenu />
      </Drawer>
      <main className={classes.content}>{children}</main>
    </div>
  );
};
