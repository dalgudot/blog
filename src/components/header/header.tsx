import ThemeToggle from './theme-toggle';
import Link from 'next/link';
import styles from './header.module.scss';
import GNB from './gnb';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Link href='/'>
        <a className={styles.blog__name}>경험의 기록</a>
      </Link>

      <div className={styles.right}>
        <GNB />
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
