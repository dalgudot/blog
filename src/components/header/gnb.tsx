import Link from 'next/link';
import styles from './header.module.scss';

const GNB: React.FC = () => {
  const gnbList = [
    {
      label: '기록',
      target: '_self',
      href: '/',
    },
    {
      label: '이야기',
      target: '_self',
      href: '/story',
    },
    {
      label: '소개',
      target: '_blank',
      href: 'https://share-design.kr/introduction',
    },
    {
      label: '연락처',
      target: '_blank',
      href: 'https://share-design.kr/contact',
    },
  ];

  return (
    <nav className={styles.nav}>
      <ul>
        {gnbList.map((list) => (
          <li key={list.href}>
            {list.target === '_self' ? (
              <Link href={list.href}>
                <a>{list.label}</a>
              </Link>
            ) : (
              <a href={list.href} target={list.target}>
                {list.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default GNB;
