import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { SecondaryAction } from '../../_shared_/SecondaryAction';
import { useMoveCallback } from '../../../../hooks/useMoveCallback';
import { RaiseContext } from '../../RaiseContext';
import {
  PlayerActionsRecord,
  PlayerActionType,
} from '../../../../socket/types/player';
import { gameSelector } from '../../../../features/game';

type Props = {
  actions: PlayerActionsRecord;
};

export const RaiseAction: React.FC<Props> = ({ actions }) => {
  const { raise, setRaise } = useContext(RaiseContext);
  const bigBlind = useSelector(gameSelector.get('_bigBlind'));
  const maxBet = useSelector(gameSelector.get('_maxBet'));
  const onMove = useMoveCallback();

  const checkAction = actions[PlayerActionType.Check];
  const raiseAction = actions[PlayerActionType.Raise];
  const betAction = actions[PlayerActionType.Bet];

  let onClick;
  let name;

  if (raise > 0 || (!betAction && !raiseAction)) {
    name = 'Check';
    onClick = () => checkAction && onMove(checkAction);
  } else if (raiseAction) {
    name = 'Raise';
    onClick = () => setRaise(maxBet + bigBlind);
  } else {
    name = 'Bet';
    onClick = () => setRaise(bigBlind);
  }
  return (
    <SecondaryAction disabled={!checkAction && !betAction} onClick={onClick}>
      {name}
    </SecondaryAction>
  );
};
