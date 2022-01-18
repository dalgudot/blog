import { useTheme } from 'next-themes';
import { useMounted } from '../../lib/hooks/useMounted';

const ThemeToggle = () => {
  const mounted = useMounted();
  const { theme, setTheme } = useTheme();

  if (!mounted) return null;

  return (
    <div>
      The current theme is: {theme}
      <button onClick={() => setTheme('light')}>Light Mode</button>
      <button onClick={() => setTheme('dark')}>Dark Mode</button>
      {theme !== undefined && (
        <select value={theme} onChange={(e) => setTheme(e.target.value)}>
          <option value='dark'>Dark</option>
          <option value='light'>Light</option>
          <option value='system'>System</option>
        </select>
      )}
    </div>
  );
};

export default ThemeToggle;
