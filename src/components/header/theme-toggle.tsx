import { useMounted } from '@dalgu/react-utility-hooks';
import { useTheme } from 'next-themes';
import IconTheme24 from '../../svg/icon-theme-24';
import { FC } from 'react';
import styles from './header.module.scss';

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
      <IconTheme24 color='var(--g4)' />
    </RotateButton>
  );
};

export default ThemeToggle;

type Props = {
  themeHandler: () => void;
  children: JSX.Element;
};

const RotateButton: FC<Props> = ({ themeHandler, children }) => {
  return (
    <>
      <button onClick={themeHandler} className={styles.theme__toggle}>
        {children}
      </button>
    </>
  );
};
