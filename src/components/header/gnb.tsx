import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect, useRef } from 'react';
import { useAfterInitialMount } from '../../lib/hooks/useAfterInitialMount';
import styles from './header.module.scss';

type TGNBList = {
  label: string;
  target: '_self' | '_blank';
  href: string;
};

const GNB: FC = () => {
  const gnbList: TGNBList[] = [
    {
      label: '기록',
      target: '_self',
      href: '/',
    },
    // {
    //   label: '이야기',
    //   target: '_self',
    //   href: '/story',
    // },
    {
      label: '연락처',
      target: '_blank',
      href: 'https://share-design.kr/contact',
    },
  ];

  return (
    <>
      <nav className={styles.nav}>
        <ul>
          {gnbList.map((list) => (
            <GNBList key={list.href} list={list} />
          ))}
        </ul>
      </nav>
    </>
  );
};

export default GNB;

type Props = {
  list: TGNBList;
};

const GNBList: FC<Props> = ({ list }) => {
  const router = useRouter();
  const pathname = router.pathname;
  const currentStatus =
    pathname === '/' || pathname === '/[category]'
      ? '기록'
      : pathname === '/story'
      ? '이야기'
      : pathname === '/story'
      ? '연락처'
      : null;

  const isSelected = currentStatus === list.label;
  const listClassname = classNames(
    styles.list,
    isSelected && styles.selected__list
  );

  // const afterInitialMount = useAfterInitialMount();
  // const underLineClassname = classNames(
  //   styles.under__line,
  //   afterInitialMount && isSelected && styles.under__line__motion
  // );

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
