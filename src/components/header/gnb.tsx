import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
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
    {
      label: '이야기',
      target: '_self',
      href: '/story',
    },
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
  const isSelected: boolean = pathname === list.href;
  const listClassName = classNames(
    styles.list,
    isSelected && styles.selected__list
  );

  return (
    <>
      <li className={listClassName}>
        {list.target === '_self' ? (
          <Link href={list.href}>
            <a className='fs__16'>{list.label}</a>
          </Link>
        ) : (
          <a className='fs__16' href={list.href} target={list.target}>
            {list.label}
          </a>
        )}
      </li>
    </>
  );
};
