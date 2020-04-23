import { useCallback, useEffect, useRef, useState } from 'react';
import { differenceInSeconds } from 'date-fns';
import { useInterval } from './useInterval';

export const useTimeToAction = (active: boolean) => {
  const [run, setRun] = useState(false);
  const initTime = useRef(new Date());

  useEffect(() => {
    if (active) {
      initTime.current = new Date();
      setRun(true);
    } else {
      setRun(false);
    }
  }, [active]);

  const [, setCount] = useState(0);

  // fire re-render
  const countUp = useCallback(() => setCount(count => (count ? 0 : 1)), [
    setCount,
  ]);

  const delay = run ? 1000 : null;

  useInterval(countUp, delay);
  return run
    ? Math.min(differenceInSeconds(new Date(), initTime.current), 30)
    : 0;
};
