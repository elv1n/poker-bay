import { useEffect, useRef } from 'react';

export const usePrevious = <P>(value: P) => {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef<P>();

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
    return () => {
      ref.current = undefined;
    };
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
};
