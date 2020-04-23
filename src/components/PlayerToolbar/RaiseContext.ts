import { createContext, Dispatch, SetStateAction } from 'react';
import { AutoAction } from './constants';

type RaiseContextValue = {
  raise: number;
  setRaise: Dispatch<SetStateAction<number>>;
  autoAction: AutoAction;
  toggleAutoAction(autoAction: AutoAction): void;
};

export const RaiseContext = createContext<RaiseContextValue>({
  raise: 0,
  setRaise: () => 0,
  autoAction: AutoAction.None,
  toggleAutoAction: () => AutoAction.None,
});
