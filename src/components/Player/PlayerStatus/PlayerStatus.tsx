import React, { useCallback, useEffect, useState } from 'react';
import { duration, makeStyles, useTheme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';
import { CSSTransition, Transition } from 'react-transition-group';
import clsx from 'clsx';
import { StatusAnimation } from './StatusAnimation';
import { gameSelector } from '../../../features/game';
import { GameStreet } from '../../../socket/types/game';

const defaultTimeout = {
  enter: 1000,
  exit: 1000,
};

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    zIndex: 9,
    top: 0,
    left: '50%',
    opacity: 0,
    transform: 'translate(-50%, 0)',
  },
  entering: {
    opacity: 1,
    transform: 'translate(-50%, -100%)',
    transition: theme.transitions.create(['transform', 'opacity'], {
      duration: defaultTimeout.enter,
    }),
  },
  exiting: {
    opacity: 0,
    transform: 'translate(-50%, -200%)',
    transition: theme.transitions.create(['transform', 'opacity'], {
      duration: defaultTimeout.enter,
    }),
  },
  exited: {
    transform: 'translate(-50%, 0)',
    transition: theme.transitions.create(['transform', 'opacity'], {
      duration: 0,
    }),
  },
}));

type Props = {
  name: string;
};

const reflow = (node: HTMLElement) => node.scrollTop;

export const PlayerStatus: React.FC<Props> = ({ name }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [status, setStatus] = useState<string>();
  const [show, setShow] = useState(false);
  const [canShow, setCanShow] = useState(true);

  const street = useSelector(gameSelector.get('_street'));

  const playerStatus = useSelector(gameSelector.getPlayerStatus(name));
  useEffect(() => {
    if (playerStatus) {
      setStatus(playerStatus);
      setShow(true);
    }
  }, [playerStatus]);

  // useEffect(() => {
  //   if (street !== GameStreet.PreDeal && street !== GameStreet.PreFlop) {
  //     setStatus(undefined);
  //   }
  // }, [street]);

  const onEnter = useCallback(
    (node: HTMLElement) => {
      const transition = theme.transitions.create(['transform', 'opacity'], {
        duration: defaultTimeout.enter,
      });
      reflow(node);
      node.style.webkitTransition = transition;
      node.style.transition = transition;
    },
    [theme]
  );

  const onExited = useCallback(
    (node: HTMLElement) => {
      node.style.webkitTransition = 'none';
      node.style.transition = 'none';
      setCanShow(true);
    },
    [setCanShow]
  );

  return (
    <Transition
      appear
      in={canShow && show}
      onEnter={onEnter}
      onEntered={() => {
        setShow(false);
        setCanShow(false);
      }}
      onExited={onExited}
      timeout={defaultTimeout}
    >
      {state => (
        <Typography
          className={clsx(classes.root, {
            [classes.entering]: state === 'entering' || state === 'entered',
            [classes.exiting]: state === 'exiting',
            [classes.exited]: state === 'exited',
          })}
          color="textPrimary"
          variant="h6"
        >
          {status}
        </Typography>
      )}
    </Transition>
  );
};
