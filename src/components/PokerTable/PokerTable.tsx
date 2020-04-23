import React, { useMemo } from 'react';
import { lighten, makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { range } from 'lodash-es';
import useMeasure from 'react-use-measure';
import { CardPlace } from './CardPlace';
import { gameSelector } from '../../features/game';
import { Player } from '../Player';
import { tableOptions } from '../../constants';
import { PokerTableContext } from './PokerTableContext';

const useStyles = makeStyles(theme => {
  const { paper: main } = theme.palette.background;
  return {
    table: {
      // width: '70%',
      height: '50vh',
      // background: `linear-gradient(130deg, ${lighten(main, 0.5)} 0%, ${lighten(
      //   main,
      //   0.9
      // )} 100%)`,
      background: `linear-gradient(130deg, ${lighten(main, 0.5)} 0%, ${lighten(
        main,
        0.8
      )} 60%, ${lighten(main, 0.9)} 100%)`,
      position: 'relative',
      margin: '5vh 20vw',
      // transform: 'translateX(-50%) translateY(-50%)',
      borderRadius: `${tableOptions.radiusWidth}px/${tableOptions.radiusHeight}px`,
      border: `${tableOptions.border}px solid transparent`,
      backgroundClip: 'padding-box',
      boxShadow: `inset 4px 4px 14px 3px ${main}`,
      boxSizing: 'border-box',
      [theme.breakpoints.between('sm', 'md')]: {
        margin: '5vh 15vw',
      },
      '&:before': {
        content: "''",
        // border: '7px solid rgba(0, 0, 0, 0.1)',
        // display: 'block',
        // borderRadius: `${tableOptions.radiusWidth}px/${tableOptions.radiusHeight}px`,
        background: `linear-gradient(154deg, ${lighten(
          main,
          0.6
        )} 0%, ${lighten(main, 0.8)} 50%, ${lighten(main, 0.9)} 100%)`,
        borderRadius: 'inherit',
        position: 'absolute',
        margin: -tableOptions.border,

        boxShadow: `-5px -10px 15px -10px ${main}, 5px 10px 15px -10px ${main}`,
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        zIndex: -1,
      },
    },
  };
});

export const PokerTable: React.FC<{}> = () => {
  const classes = useStyles();
  const dealer = useSelector(gameSelector.get('_dealer'));
  const players = useSelector(gameSelector.get('players'));
  const [ref, bounds] = useMeasure();
  const value = useMemo(() => {
    return {
      width: bounds.width,
      height: bounds.height,
    };
  }, [bounds]);
  return (
    <PokerTableContext.Provider value={value}>
      <div className={classes.table} ref={ref}>
        <CardPlace />
        {players.map((name, index) => (
          <Player
            dealer={index === dealer}
            index={index}
            key={name}
            max={players.length}
            name={name}
          />
        ))}
      </div>
    </PokerTableContext.Provider>
  );
};
