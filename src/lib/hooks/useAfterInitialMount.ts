import { useEffect, useRef } from 'react';

export const useAfterInitialMount = () => {
  const afterInitialMount = useRef(false);
  useEffect(() => {
    afterInitialMount.current = true;
  }, []);

  return afterInitialMount.current;
};
