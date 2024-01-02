import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { brunchShareDesignList } from '../../../data/brunch-list';
import BrunchList from './brunch-list';
import styles from './post-list.module.scss';
import List from './list';
import { TListData } from '../../../pages';

type Props = {
  designPostListData: TListData;
  devPostListData: TListData;
  brandPostListData: TListData;
  allPostsListData: TListData;
};

const PostList: FC<Props> = ({
  designPostListData,
  devPostListData,
  brandPostListData,
  allPostsListData,
}) => {
  const router = useRouter();
  const pathname = router.pathname;
  const asPath = router.asPath;
  const postList =
    asPath === '/design'
      ? designPostListData
      : asPath === '/dev'
      ? devPostListData
      : asPath === '/brand'
      ? brandPostListData
      : allPostsListData;

  const showBrunchShareDesignList: boolean =
    pathname === '/' || asPath === '/design';

  return (
    <>
      <CategoryFilter pathname={pathname} asPath={asPath} />
      <main className={styles.post__list__main__layout}>
        <nav>
          <ul>
            {postList.map((list) => (
              <List
                key={list.title}
                category={list.category}
                order={list.order}
                title={list.title}
                dateTime={list.dateTime}
                status={list.status}
              />
            ))}
            {showBrunchShareDesignList &&
              brunchShareDesignList.map((list) => (
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
    </>
  );
};

export default PostList;

type CategoryFilterProps = {
  pathname: string;
  asPath: string;
};

const CategoryFilter: FC<CategoryFilterProps> = ({ pathname, asPath }) => {
  const categoryFilterList = [
    { href: '/', label: '모두' },
    { href: '/design', label: '디자인' },
    { href: '/dev', label: '개발' },
    { href: '/brand', label: '브랜드' },
  ];
  const listClassname = (href: string) => {
    return classNames(
      'body3__400',
      (asPath === href || pathname === href) &&
        styles.category__filter__selected
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
