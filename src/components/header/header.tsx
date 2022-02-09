import ThemeToggle from './theme-toggle';
import Link from 'next/link';
import styles from './header.module.scss';
import GNB from './gnb';
import { useIsAdmin } from '../../lib/hooks/useIsAdmin';
import variables from '../../styles/text-styles.module.scss';
import { useWindowInnerWidthHeight } from '../../lib/hooks/useWindowInnerWidthHeight';
import MobileMenuButton from './mobile-menu-button';

const Header: React.FC = () => {
  const { isAdmin } = useIsAdmin();
  const windowInner = useWindowInnerWidthHeight();
  const isMobile =
    windowInner.width <=
    Number(variables.text__second__max__width.replace('px', ''));

  return (
    <>
      <header className={styles.header}>
        <Link href='/'>
          <a className={styles.blog__name}>
            경험의 기록
            {isAdmin && <p className={styles.admin___text}> Admin</p>}
          </a>
        </Link>

        <div className={styles.header__right}>
          {isMobile ? <MobileMenuButton /> : <GNB isAdmin={isAdmin} />}
          <ThemeToggle />
        </div>
      </header>
      <div
        className={styles.header__height__for__layout__under__fixed__header}
      />
    </>
  );
};

export default Header;
