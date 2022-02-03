import ThemeToggle from './theme-toggle';
import Link from 'next/link';
import styles from './header.module.scss';
import GNB from './gnb';
import classNames from 'classnames';

const Header: React.FC = () => {
  const blogNameClassname = classNames(styles.blog__name, 'body1__500');

  return (
    <header className={styles.header}>
      <Link href='/'>
        <a className={blogNameClassname}>경험의 기록</a>
      </Link>

      <div className={styles.right}>
        <GNB />
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
