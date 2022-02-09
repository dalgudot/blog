import { useEffect, useState } from 'react';

export const useWindowInnerWidthHeight = () => {
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    const setWindowInnerWidthHeight = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    setWindowInnerWidthHeight();

    window.addEventListener('resize', setWindowInnerWidthHeight);

    return () => {
      window.removeEventListener('resize', setWindowInnerWidthHeight);
    };
  }, []);

  const windowInnerWidthHeight = { width, height };

  return windowInnerWidthHeight;
};
