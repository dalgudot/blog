import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { brunchShareDesignList } from '../../../data/brunch-list';
import BrunchList from './brunch-list';
import styles from './post-list.module.scss';
import variables from '../../../styles/motion.module.scss';
import List from './list';
import { TListData } from '../../../pages';

type Props = {
  designPostListData: TListData;
  devPostListData: TListData;
  allPostsListData: TListData;
};

const PostList: FC<Props> = ({
  designPostListData,
  devPostListData,
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
      : allPostsListData;

  const showBrunchList: boolean = pathname === '/' || asPath === '/design';

  // const [isFadeIn, setIsFadeIn] = useState<boolean>(false);
  // const FADE_IN_DURATION = Number(
  //   variables.fade__in__duration.replace('s', '')
  // );

  // // Dynamic Routing에서도 Fade-in 실행
  // useEffect(() => {
  //   setIsFadeIn(true);

  //   const timeoutId = setTimeout(() => {
  //     setIsFadeIn(false);
  //   }, FADE_IN_DURATION * 1000);

  //   return () => {
  //     clearTimeout(timeoutId);
  //   };
  // }, [asPath]);

  // const mainClassname = classNames(
  //   styles.post__list__main__layout,
  //   isFadeIn && styles.main__fade__in
  // );

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
            {showBrunchList &&
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
    { href: '/dev', label: '개발' },
    { href: '/design', label: '디자인' },
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
