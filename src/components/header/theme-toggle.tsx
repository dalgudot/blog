import { useMounted } from '@dalgu/react-utility-hooks';
import { useTheme } from 'next-themes';
import IconTheme24 from '../../svg/icon-theme-24';
import motion from '../../interactions/motion.module.scss';
import { FC, useEffect, useRef, useState } from 'react';
import { useHoverRotate } from '../../interactions/hooks/useHoverRotate';

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
  const { hoverRef, className } = useHoverRotate();

  return (
    <>
      <button ref={hoverRef} onClick={themeHandler} className={className}>
        {children}
      </button>
    </>
  );
};
