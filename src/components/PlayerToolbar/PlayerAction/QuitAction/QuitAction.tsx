import React, { useCallback, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { gameSelector } from '../../../../features/game';
import { gameSocketMsg, SocketSendTag } from '../../../../socket';
import { SecondaryAction } from '../../_shared_/SecondaryAction';
import { RaiseContext } from '../../RaiseContext';
import { AutoAction } from '../../constants';

type Props = {};

export const QuitAction: React.FC<Props> = () => {
  const tableName = useSelector(gameSelector.get('name'));
  const street = useSelector(gameSelector.get('_street'));
  const { autoAction, toggleAutoAction } = useContext(RaiseContext);

  const isActive = autoAction === AutoAction.Leave;

  useEffect(() => {
    if (isActive) {
      gameSocketMsg({
        tag: SocketSendTag.LeaveSeat,
        contents: tableName,
      });
    }
  }, [isActive, tableName, street]);

  return (
    <SecondaryAction
      active={isActive}
      onClick={() => toggleAutoAction(AutoAction.Leave)}
    >
      Quit
    </SecondaryAction>
  );
};
