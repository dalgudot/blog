import { useCheckAdminPage } from '../../lib/hooks/useCheckAdminPage';

const Header: React.FC = () => {
  useCheckAdminPage();

  return (
    <>
      <h1>Header - Auth Management</h1>
    </>
  );
};

export default Header;
