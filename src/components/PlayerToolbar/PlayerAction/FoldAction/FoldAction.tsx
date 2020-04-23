import React, { useContext, useEffect } from 'react';
import { Tooltip } from '@material-ui/core';
import {
  PlayerActionsRecord,
  PlayerActionType,
} from '../../../../socket/types/player';
import { useMoveCallback } from '../../../../hooks/useMoveCallback';
import { SecondaryAction } from '../../_shared_/SecondaryAction';
import { RaiseContext } from '../../RaiseContext';
import { AutoAction } from '../../constants';

type Props = {
  action?: PlayerActionsRecord[PlayerActionType.Fold];
};

export const FoldAction: React.FC<Props> = ({ action }) => {
  const { autoAction, toggleAutoAction } = useContext(RaiseContext);
  const onMove = useMoveCallback();

  const isActive =
    autoAction === AutoAction.Fold || autoAction === AutoAction.Leave;

  const toggleAction = () =>
    autoAction !== AutoAction.Leave && toggleAutoAction(AutoAction.Fold);

  useEffect(() => {
    if (action && isActive) {
      onMove({
        tag: PlayerActionType.Fold,
      });
      toggleAction();
    }
  }, [action, isActive, onMove]);

  return (
    <Tooltip title="Auto fold when action will be available">
      <SecondaryAction active={isActive} onClick={toggleAction}>
        Fold
      </SecondaryAction>
    </Tooltip>
  );
};
