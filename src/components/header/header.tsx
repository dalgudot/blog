import { useCheckAdminPage } from '../../lib/hooks/useCheckAdminPage';
import ThemeToggle from './theme-toggle';

const Header: React.FC = () => {
  // useCheckAdminPage();

  return (
    <>
      <h1>Header</h1>
      <ThemeToggle />
    </>
  );
};

export default Header;
