import React, { memo } from 'react';
import { ListItem, ListItemText, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { getSeatPosition, isRightPosition } from './helpers';
import { Bet } from './Bet';
import { playerSeatStyles } from './playerSeatStyles';
import { gameSelector } from '../../features/game';
import { authSelector } from '../../features/auth';
import { Money } from '../icons';
import { PlayerAvatar } from './PlayerAvatar';
import { Cards } from '../Cards';
import { CardMargin } from '../PokerCard';
import { PlayerStatus } from './PlayerStatus';

const useStyles = makeStyles(theme => ({
  player: {
    position: 'absolute',
    transition: 'transform 1s',
    transitionTimingFunction: 'ease-in-out',
    width: 'auto',
    padding: 0,
  },
  text: {
    border: '1px solid',
    borderColor: theme.palette.primary.main,
    borderRadius: theme.spacing(1.5),
    padding: theme.spacing(1, 2, 1, 5),
    marginLeft: -theme.spacing(4),
    margin: 0,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },

  center: {
    // flexDirection: 'column',
    // '& $text': {
    //   margin: 0,
    //   padding: theme.spacing(1, 2),
    // },
  },
  right: {
    flexDirection: 'row-reverse',
    '& $text': {
      marginLeft: 0,
      marginRight: -theme.spacing(4),
      padding: theme.spacing(1, 5, 1, 2),
    },
  },
  secondaryIcon: {
    fontSize: theme.typography.pxToRem(17),
    marginRight: theme.spacing(0.5),
  },
  secondaryText: {
    display: 'flex',
    alignItems: 'center',
  },
  deck: {
    position: 'absolute',
    bottom: -10,
    transform: 'translateY(100%)',
  },
  ...playerSeatStyles,
}));

type Props = {
  index: number;
  max: number;
  name: string;
  dealer: boolean;
};

export const Player: React.FC<Props> = memo(({ name, index, max, dealer }) => {
  const classes = useStyles();

  const me = useSelector(authSelector.user);
  const seatPosition = getSeatPosition(index, max);
  const player = useSelector(gameSelector.getPlayer(name));
  const showCards = useSelector(gameSelector.isUserShowCards(name));
  const { _bet: bet } = player;

  return (
    <>
      <ListItem
        className={clsx(
          classes.player,
          (classes as any)[`seat${seatPosition}`],
          {
            [classes.right]: isRightPosition(seatPosition),
          }
        )}
        component="div"
        // style={position.style}
      >
        <PlayerAvatar name={name} />
        <ListItemText
          className={classes.text}
          primary={name + (dealer ? ' (D)' : '')}
          primaryTypographyProps={{
            color: 'textPrimary',
            variant: 'button',
          }}
          secondary={
            <>
              <Money className={classes.secondaryIcon} viewBox="0 0 512 512" />
              {player._chips}
            </>
          }
          secondaryTypographyProps={{
            color: 'textSecondary',
            className: classes.secondaryText,
          }}
        />
        {showCards && (
          <>
            <Cards
              cards={player._pockets}
              className={classes.deck}
              margin={CardMargin.Small}
              max={2}
              noShadow
            />
          </>
        )}
        <PlayerStatus name={name} />
      </ListItem>
      <Bet bet={bet} seat={seatPosition} />
    </>
  );
});
