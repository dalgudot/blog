import { useEffect, useRef, useState } from 'react';
import motion from '../motion.module.scss';

export const useHoverRotate = () => {
  const hoverRef = useRef<HTMLButtonElement>(null);
  const [isRotate, setIsRotate] = useState<boolean | null>(null);

  useEffect(() => {
    const animate = () => {
      setIsRotate(true);
    };

    const initial = () => {
      setIsRotate(false);
    };

    hoverRef.current?.addEventListener('mouseover', animate);
    hoverRef.current?.addEventListener('mouseleave', initial);

    return () => {
      hoverRef.current?.removeEventListener('mouseover', animate);
      hoverRef.current?.removeEventListener('mouseleave', initial);
    };
  }, []);

  const className =
    isRotate === null ? '' : isRotate ? motion.rotate : motion.rotate__reverse;

  return { hoverRef, className };
};
