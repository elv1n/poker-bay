import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Slider, Typography } from '@material-ui/core';
import { gameSocketMsg, SocketSendTag } from '../../../socket';
import { gameSelector } from '../../../features/game';
import { BigButton } from '../../BigButton';
import { GameStreet } from '../../../socket/types/game';

type Props = {};

export const SitIn: React.FC<Props> = () => {
  const [value, setValue] = useState(0);
  const [active, setActive] = useState(false);
  const tableName = useSelector(gameSelector.get('name'));
  const minChips = useSelector(gameSelector.get('_minBuyInChips'));
  const maxChips = useSelector(gameSelector.get('_maxBuyInChips'));
  const street = useSelector(gameSelector.get('_street'));

  useEffect(() => {
    setValue(minChips);
  }, [minChips]);

  const marks = useMemo(() => {
    return [
      {
        value: minChips,
        label: minChips,
      },
      {
        value: maxChips,
        label: maxChips,
      },
    ];
  }, [minChips, maxChips]);

  const takeSeat = useCallback(
    (value: number) => {
      gameSocketMsg({
        tag: SocketSendTag.TakeSeat,
        contents: [tableName, value],
      });
    },
    [tableName]
  );

  useEffect(() => {
    if (active && street === GameStreet.PreDeal) {
      takeSeat(value);
    }
  }, [active, street]);

  const onClick = useCallback(
    (value: number) => {
      if (street === GameStreet.PreDeal) {
        takeSeat(value);
      } else {
        setActive(!active);
      }
    },
    [street, takeSeat, active]
  );

  return (
    <>
      <Slider
        disabled={active}
        marks={marks}
        max={maxChips}
        min={minChips}
        onChange={(e, value) => !Array.isArray(value) && setValue(value)}
        step={1}
        value={value}
        valueLabelDisplay="on"
      />
      <BigButton
        onClick={() => onClick(value)}
        variant={active ? 'outlined' : 'contained'}
      >
        Sit in with {value}
      </BigButton>
      {active && (
        <Typography align="center" component="p" variant="caption">
          You will sit down on the next round
        </Typography>
      )}
    </>
  );
};
