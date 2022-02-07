import ThemeToggle from './theme-toggle';
import Link from 'next/link';
import styles from './header.module.scss';
import GNB from './gnb';
import { useIsAdmin } from '../../lib/hooks/useIsAdmin';

const Header: React.FC = () => {
  const { isAdmin } = useIsAdmin();

  return (
    <>
      <header className={styles.header}>
        <Link href='/'>
          <a className={styles.blog__name}>
            경험의 기록
            {isAdmin && <p className={styles.admin___text}> Admin</p>}
          </a>
        </Link>

        {/* {isAdmin && (
          <div>
            <Link href='/draft/list'>
              <a>초고 목록 보기</a>
            </Link>
            <Link href='/draft/new'>
              <a>글쓰기</a>
            </Link>
          </div>
        )} */}

        <div className={styles.right}>
          <GNB />
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
