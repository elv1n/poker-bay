import React, { useCallback, useRef, useState } from 'react';
import { ButtonBase, Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { LS, LSKeys } from '../../../utils/LS';
import { authActions, authSelector } from '../../../features/auth';

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.primary.main,
    width: '100%',
    minHeight: 60,
    '&:before': {
      content: "''",
      border: '1.5px solid white',
      position: 'absolute',
      width: '40%',
      top: '40%',
      left: '20%',
      borderRadius: 2,
    },
    '&:after': {
      content: "''",
      border: '1.5px solid white',
      borderRadius: 2,
      position: 'absolute',
      width: '20%',
      top: '55%',
      left: '20%',
    },
  },
}));

type Props = {};

export const UserMenu: React.FC<Props> = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const ref = useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);
  const name = useSelector(authSelector.user);

  const onLogout = useCallback(() => {
    LS.remove(LSKeys.token);
    dispatch(authActions.logout());
  }, [dispatch]);

  return (
    <>
      <ButtonBase
        className={classes.root}
        onClick={() => setOpen(true)}
        ref={ref}
      />
      <Menu
        anchorEl={ref.current}
        keepMounted
        onClose={() => setOpen(false)}
        open={open}
      >
        <MenuItem disabled>{name}</MenuItem>
        <MenuItem onClick={onLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};
