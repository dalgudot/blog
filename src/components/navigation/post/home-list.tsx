import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useIsAdmin } from '../../../lib/hooks/useIsAdmin';
import { TBrunchListData } from '../../../pages';
import BrunchList from './brunch-list';
import styles from './home-list.module.scss';
import List from './list';

type TListData = {
  category: string;
  order: string;
  title: string;
}[];

type Props = {
  designPostListData: TListData;
  devPostListData: TListData;
  allPostsListData: TListData;
  brunchListData: TBrunchListData;
};

const HomeList: FC<Props> = ({
  designPostListData,
  devPostListData,
  allPostsListData,
  brunchListData,
}) => {
  const { isAdmin } = useIsAdmin();
  const router = useRouter();
  const asPath = router.asPath;
  const postList =
    asPath === '/design'
      ? designPostListData
      : asPath === '/dev'
      ? devPostListData
      : allPostsListData;

  const showBrunchList: boolean = asPath === '/' || asPath === '/design';

  return (
    <>
      <CategoryFilter asPath={asPath} />
      <main className={styles.main__layout}>
        <nav>
          <ul>
            {postList.map((list) => (
              <List
                key={list.title}
                category={list.category}
                order={list.order}
                title={list.title}
              />
            ))}
            {showBrunchList &&
              brunchListData.map((list) => (
                <BrunchList
                  key={list.title}
                  url={list.url}
                  dateTime={list.dateTime}
                  title={list.title}
                />
              ))}
          </ul>
        </nav>
      </main>
      {isAdmin && (
        <>
          <div style={{ marginTop: 300, textAlign: 'center' }}>
            <Link href='/draft/list'>
              <a>초고 목록 보기</a>
            </Link>
            <Link href='/draft/new'>
              <a>글쓰기</a>
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default HomeList;

type CategoryFilterProps = {
  asPath: string;
};

const CategoryFilter: FC<CategoryFilterProps> = ({ asPath }) => {
  const categoryFilterList = [
    { href: '/', label: '모두' },
    { href: '/design', label: '디자인' },
    { href: '/dev', label: '개발' },
  ];
  const listClassname = (href: string) => {
    return classNames(
      'body3__300',
      asPath === href && styles.category__filter__selected
    );
  };

  return (
    <nav className={styles.category__filter__nav}>
      {categoryFilterList.map((list) => (
        <Link key={list.label} href={list.href}>
          <a className={listClassname(list.href)}>{list.label}</a>
        </Link>
      ))}
    </nav>
  );
};
