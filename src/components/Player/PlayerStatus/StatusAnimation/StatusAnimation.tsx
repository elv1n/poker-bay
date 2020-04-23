import React from 'react';
import { duration } from '@material-ui/core';
import { CSSTransition, Transition } from 'react-transition-group';
import { makeStyles } from '@material-ui/core/styles';
import { TransitionProps } from 'react-transition-group/Transition';
import clsx from 'clsx';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

const defaultTimeout = {
  enter: 1 * 1000,
  // enter: duration.enteringScreen,
  exit: 1 * 1000,
  // exit: duration.leavingScreen,
};

const useStyles = makeStyles(theme => ({
  root: {
    '&-enter, &-appear': {
      opacity: 0,
      transform: 'translate(0, 200%)',
    },
    '&-enter-active': {
      opacity: 1,
      transform: 'translate(0, 0)',
      transition: theme.transitions.create(['transform', 'opacity']),
    },
    '&-exit': {
      opacity: 1,
      transform: 'translate(0, 0)',
    },
    '&-exit-active': {
      opacity: 0,
      transform: 'translate(0, -200%)',
      transition: theme.transitions.create(['transform', 'opacity']),
    },
  },
}));

type Props = Omit<CSSTransitionProps, 'timeout'> & { timeout?: number };

export const StatusAnimation: React.FC<Props> = ({
  timeout = defaultTimeout,
  children,
  ...rest
}) => {
  const classes = useStyles();
  return (
    <CSSTransition appear {...rest} classNames={classes.root} timeout={timeout}>
      {children}
    </CSSTransition>
  );
};
