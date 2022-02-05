import ThemeToggle from './theme-toggle';
import Link from 'next/link';
import styles from './header.module.scss';
import GNB from './gnb';
import classNames from 'classnames';
import { useIsAdmin } from '../../lib/hooks/useIsAdmin';

const Header: React.FC = () => {
  const blogNameClassname = classNames(styles.blog__name, 'body2__500');
  const { isAdmin } = useIsAdmin();

  return (
    <>
      <header className={styles.header}>
        <Link href='/'>
          <a className={blogNameClassname}>경험의 기록</a>
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
