import { useGetClientTempPostData } from '../../lib/hooks/useGetClientTempPostData';
import ThemeToggle from './theme-toggle';

const Header: React.FC = () => {
  const { tempPost } = useGetClientTempPostData();
  // console.log('tempPost', tempPost);
  // 어디서든 tempPost 변화 보기 위해서

  return (
    <>
      {/* <h1>Header</h1> */}
      {/* <ThemeToggle /> */}
    </>
  );
};

export default Header;
