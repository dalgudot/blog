import { useRouter } from 'next/router';
import ThemeToggle from './theme-toggle';

const Header: React.FC = () => {
  const router = useRouter();
  const { locale, pathname, asPath, query } = router;

  const setLanguage = () => {
    locale === 'ko'
      ? router.push({ pathname, query }, asPath, { locale: 'en' })
      : router.push({ pathname, query }, asPath, { locale: 'ko' });
  };

  return (
    <>
      <h1>Header</h1>
      {/* <ThemeToggle /> */}
      {/* <button onClick={setLanguage}>
        {locale === 'ko' ? '영어로' : '한글로'}
      </button> */}
    </>
  );
};

export default Header;
