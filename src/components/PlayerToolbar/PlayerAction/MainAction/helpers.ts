import {
  IPlayer,
  PlayerActionsRecord,
  PlayerActionType,
} from '../../../../socket/types/player';
import { GameMoveContents } from '../../../../socket/types';

const actionsOrder = [
  PlayerActionType.PostBlind,
  PlayerActionType.Call,
  PlayerActionType.Check,
];

type MainAction = [GameMoveContents, string];

export const getMainAction = (
  actions: PlayerActionsRecord,
  player: IPlayer,
  maxBet: number,
  raise: number
): MainAction | undefined => {
  if (raise > 0) {
    const betAction = actions[PlayerActionType.Bet];
    if (betAction) {
      return [{ ...betAction, contents: raise }, `Bet ${raise}`];
    }
    const raiseAction = actions[PlayerActionType.Raise];

    if (raiseAction) {
      return [{ ...raiseAction, contents: raise }, `Raise ${raise}`];
    }
  }
  const mainType = actionsOrder.find(type => actions[type]);
  if (!mainType) return undefined;
  const action = actions[mainType];
  if (!action) return undefined;
  switch (action.tag) {
    // case PlayerActionType.PostBlind:
    //   return [action, 'Blind'];
    case PlayerActionType.Call:
      return [action, `Call for ${maxBet - player._bet}`];
    case PlayerActionType.Check:
      return [action, 'Check'];
    default:
      return undefined;
  }
};
