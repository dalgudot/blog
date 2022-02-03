import { useEffect, useRef, useState } from 'react';
import motion from './hooks.module.scss';

export const useHoverRotate = () => {
  const hoverRef = useRef<HTMLButtonElement>(null);
  const [isRotate, setIsRotate] = useState<boolean | null>(null);

  useEffect(() => {
    const animate = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      setIsRotate(true);
    };

    const initial = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      setIsRotate(false);
    };

    hoverRef.current?.addEventListener('mouseover', animate);
    hoverRef.current?.addEventListener('mouseleave', initial);
    // hoverRef.current?.addEventListener('touchstart', animate);
    // hoverRef.current?.addEventListener('touchend', animate);
    // hoverRef.current?.addEventListener('touchcancel', animate);
    // hoverRef.current?.addEventListener('touchmove', initial);

    return () => {
      hoverRef.current?.removeEventListener('mouseover', animate);
      hoverRef.current?.removeEventListener('mouseleave', initial);
    };
  }, []);

  const hoverClassname =
    isRotate === null ? '' : isRotate ? motion.rotate : motion.rotate__reverse;

  return { hoverRef, hoverClassname };
};
