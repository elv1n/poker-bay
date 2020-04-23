import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { gameSelector } from '../../../../features/game';
import { BigButton } from '../../../BigButton';
import { useMoveCallback } from '../../../../hooks/useMoveCallback';
import { RaiseContext } from '../../RaiseContext';
import {
  PlayerActionsRecord,
  PlayerActionType,
} from '../../../../socket/types/player';
import { getMainAction } from './helpers';
import { AutoAction } from '../../constants';

type Props = {
  actions: PlayerActionsRecord;
};

export const MainAction: React.FC<Props> = ({ actions }) => {
  const { raise, autoAction, toggleAutoAction } = useContext(RaiseContext);
  const maxBet = useSelector(gameSelector.get('_maxBet'));
  const player = useSelector(gameSelector.getMyPlayer);
  const currentActPlayer = useSelector(gameSelector.getCurrentActName);

  const isMyTurn = player._playerName === currentActPlayer;
  const onMove = useMoveCallback();

  const mainAction = getMainAction(actions, player, maxBet, raise);

  const isAutoCheck = autoAction === AutoAction.Check;

  const toggleAutoCheck = () => toggleAutoAction(AutoAction.Check);

  const blind = actions[PlayerActionType.PostBlind];
  // auto blinds
  useEffect(() => {
    if (blind && isMyTurn) {
      onMove(blind);
    }
  }, [blind, onMove, isMyTurn]);

  useEffect(() => {
    if (isAutoCheck && mainAction) {
      if (mainAction[0].tag === PlayerActionType.Check) {
        onMove(mainAction[0]);
      }
      toggleAutoCheck();
    }
  }, [mainAction, isAutoCheck, onMove]);

  if (!mainAction) {
    return (
      <BigButton
        color={isAutoCheck ? 'primary' : 'default'}
        onClick={toggleAutoCheck}
      >
        Auto check
      </BigButton>
    );
  }

  return (
    <BigButton onClick={() => onMove(mainAction[0])}>{mainAction[1]}</BigButton>
  );
};
