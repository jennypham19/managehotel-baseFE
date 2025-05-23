import { useMemo } from 'react';
import useToggle from './useToggle';

function useBoolean(initialValue = false): [boolean, BooleanHandlers] {
  const [value, toggle] = useToggle(initialValue);

  const handlers = useMemo<BooleanHandlers>(
    () => ({
      toggle,
      on: () => toggle(true),
      off: () => toggle(false),
    }),
    [toggle],
  );

  return [value, handlers];
}

export default useBoolean;
