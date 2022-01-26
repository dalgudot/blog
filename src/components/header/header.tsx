import { useRouter } from 'next/router';
import { useCheckAdminPage } from '../../lib/hooks/useCheckAdminPage';
import ThemeToggle from './theme-toggle';

const Header: React.FC = () => {
  // useCheckAdminPage();

  const router = useRouter();
  const { locale, pathname, asPath, query } = router;

  // console.log(locale, pathname, asPath, query);

  const setLanguage = () => {
    locale === 'ko'
      ? router.push({ pathname, query }, asPath, { locale: 'en' })
      : router.push({ pathname, query }, asPath, { locale: 'ko' });
  };

  return (
    <>
      <h1>Header</h1>
      {/* <ThemeToggle /> */}
      <button onClick={setLanguage}>
        {locale === 'ko' ? '영어로' : '한글로'}
      </button>
    </>
  );
};

export default Header;
