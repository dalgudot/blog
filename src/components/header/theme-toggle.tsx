import { useMounted } from '@dalgu/react-utility-hooks';
import { useTheme } from 'next-themes';
import IconTheme24 from '../../svg/icon-theme-24';
import motion from '../../interactions/motion.module.scss';
import { FC, useEffect, useRef, useState } from 'react';

// https://github.com/pacocoursey/next-themes
const ThemeToggle: FC = () => {
  const mounted = useMounted();
  const { theme, setTheme } = useTheme();

  const themeHandler = () => {
    theme === 'dark' ? setTheme('light') : setTheme('dark');
  };

  if (!mounted) return null;

  return (
    <RotateButton themeHandler={themeHandler}>
      <IconTheme24 color='--g4' />
    </RotateButton>
  );
};

export default ThemeToggle;

type Props = {
  themeHandler: () => void;
  children: JSX.Element;
};

const RotateButton: FC<Props> = ({ themeHandler, children }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isRotate, setIsRotate] = useState<boolean | null>(null);

  useEffect(() => {
    const animate = () => {
      setIsRotate(true);
    };

    const initial = () => {
      setIsRotate(false);
    };

    buttonRef.current?.addEventListener('mouseover', animate);
    buttonRef.current?.addEventListener('mouseleave', initial);

    return () => {
      buttonRef.current?.removeEventListener('mouseover', animate);
      buttonRef.current?.removeEventListener('mouseleave', initial);
    };
  }, []);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={themeHandler}
        className={
          isRotate === null
            ? ''
            : isRotate
            ? motion.rotate
            : motion.rotate__reverse
        }
      >
        {children}
      </button>
    </>
  );
};
