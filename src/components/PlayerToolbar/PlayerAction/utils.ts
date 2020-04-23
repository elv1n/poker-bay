import type {
  PlayerActionsRecord,
  PlayerActions,
} from '../../../socket/types/player';

export const getPlayerActions = (
  actions: PlayerActions
): PlayerActionsRecord => {
  return actions.reduce((acc: PlayerActionsRecord, action) => {
    // TODO find solution how to sync them
    (acc as any)[action.tag] = action;
    return acc;
  }, {});
};
