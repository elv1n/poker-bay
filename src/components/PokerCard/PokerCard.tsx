import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Grow, Zoom } from '@material-ui/core';
import { ICard, RankKey, Suit } from '../../socket/types/card';
import { Clubs, Diamonds, Heart, Spades } from '../icons';

const Icons: { [key in Suit]: React.ElementType } = {
  [Suit.Club]: Clubs,
  [Suit.Spade]: Spades,
  [Suit.Diamond]: Diamonds,
  [Suit.Heart]: Heart,
};

const useStyles = makeStyles(theme => ({
  card: {
    height: 'var(--card-height)',
    width: 'calc(var(--card-height) * 0.7)',
    borderRadius: 5,
    display: 'inline-block',
    position: 'relative',
    backgroundColor: 'white',
    boxShadow: theme.shadows[1],
    transform: 'rotateZ(0deg)',
    transition: 'transform 1s, marginLeft 2s',
    '&:last-child': {
      // transform: 'rotateZ(30deg)',
      // top: 10,
      // right: -35,
    },
  },
  overlay: {
    '&:not(:first-child)': {
      marginLeft: 'calc(var(--card-height) * -0.35)',
    },
  },
  marginSmall: {
    '&:not(:first-child)': {
      marginLeft: theme.spacing(1),
    },
  },
  noShadow: {
    boxShadow: 'none',
  },
  red: {
    color: theme.palette.primary.main,
  },
  black: {
    color: theme.palette.text.primary,
  },
  figure: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
  },
  icon: {
    fontSize: 'unset',
    height: 'calc(var(--card-height) * 0.4)',
    width: 'calc(var(--card-height) * 0.4)',
  },
  title: {
    textAlign: 'center',
    position: 'absolute',
    margin: 0,
    fontSize: 'calc(var(--card-height) / 5)',
    fontWeight: 700,
    '&:first-child': {
      top: '3%',
      left: '10%',
    },
    '&:last-child': {
      bottom: '3%',
      right: '10%',
      transform: 'rotatez(180deg)',
    },
  },
}));

export enum CardMargin {
  Overlay,
  Small,
}

export type PokerCardProps = {
  card: ICard;
  margin?: CardMargin;
  noShadow?: boolean;
};

export const PokerCard: React.FC<PokerCardProps> = ({
  card: { rank, suit },
  noShadow,
  margin = CardMargin.Overlay,
}) => {
  const classes = useStyles();
  const isBlack = suit === Suit.Club || suit === Suit.Spade;
  const Icon = Icons[suit];
  const key = RankKey[rank];
  return (
    <Zoom in>
      <div
        className={clsx(classes.card, isBlack ? classes.black : classes.red, {
          [classes.noShadow]: noShadow,
          [classes.overlay]: margin === CardMargin.Overlay,
          [classes.marginSmall]: margin === CardMargin.Small,
        })}
      >
        <div className={classes.title}>{key}</div>
        <div className={clsx(classes.figure)}>
          <Icon className={classes.icon} viewBox="0 0 512 512" />
        </div>
        <div className={classes.title}>{key}</div>
      </div>
    </Zoom>
  );
};
