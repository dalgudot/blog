import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import styles from './header.module.scss';

type Props = {
  isAdmin: boolean;
};

type TGNBList = {
  label: string;
  target: '_self' | '_blank';
  href: string;
};

const GNB: FC<Props> = ({ isAdmin }) => {
  const adminList: TGNBList[] = [
    {
      label: '초고 목록',
      target: '_self',
      href: '/draft/list',
    },
    {
      label: '새 글 작성',
      target: '_self',
      href: '/draft/new',
    },
  ];

  const gnbList: TGNBList[] = [
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
      label: '연락처',
      target: '_self',
      href: '/contact',
    },
  ];

  return (
    <>
      <nav className={styles.gnb__list__nav}>
        <ul>
          {gnbList.map((list) => (
            <GNBList key={list.href} list={list} />
          ))}
          {isAdmin &&
            adminList.map((list) => <GNBList key={list.href} list={list} />)}
        </ul>
      </nav>
    </>
  );
};

export default GNB;

type GNBListProps = {
  list: TGNBList;
};

const GNBList: FC<GNBListProps> = ({ list }) => {
  const router = useRouter();
  const pathname = router.pathname;
  const currentStatus =
    pathname === '/' || pathname === '/[category]'
      ? '기록'
      : pathname === '/story'
      ? '이야기'
      : pathname === '/contact'
      ? '연락처'
      : pathname === '/draft/list'
      ? '초고 목록'
      : pathname === '/draft/new'
      ? '새 글 작성'
      : null;

  const isSelected = currentStatus === list.label;
  const listClassname = classNames(
    styles.gnb__list__nav__list,
    isSelected && styles.selected__list
  );

  return (
    <>
      <li className={listClassname}>
        {list.target === '_self' ? (
          <Link href={list.href}>
            <a>{list.label}</a>
          </Link>
        ) : (
          <a href={list.href} target={list.target}>
            {list.label}
          </a>
        )}
        {isSelected && <div className={styles.under__line} />}
      </li>
    </>
  );
};
