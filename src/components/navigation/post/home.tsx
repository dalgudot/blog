import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { brunchList } from '../../../data/brunch-list';
import BrunchList from './brunch-list';
import styles from './home.module.scss';
import variables from '../../../interactions/motion.module.scss';
import List from './list';
import Footer from '../../footer/footer';
import { TListData } from '../../../pages';

type Props = {
  designPostListData: TListData;
  devPostListData: TListData;
  allPostsListData: TListData;
};

const Home: FC<Props> = ({
  designPostListData,
  devPostListData,
  allPostsListData,
}) => {
  const router = useRouter();
  const asPath = router.asPath;
  const postList =
    asPath === '/design'
      ? designPostListData
      : asPath === '/dev'
      ? devPostListData
      : allPostsListData;

  const showBrunchList: boolean = asPath === '/' || asPath === '/design';

  const [isFadeIn, setIsFadeIn] = useState<boolean>(false);
  const FADE_IN_DURATION = Number(
    variables.fade__in__duration.replace('s', '')
  );

  // Dynamic Routing에서도 Fade-in 실행
  useEffect(() => {
    setIsFadeIn(true);

    const timeoutId = setTimeout(() => {
      setIsFadeIn(false);
    }, FADE_IN_DURATION * 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [asPath]);

  const mainClassname = classNames(
    styles.main__layout,
    isFadeIn && styles.main__fade__in
  );

  return (
    <>
      <CategoryFilter asPath={asPath} />
      <main className={mainClassname}>
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
              brunchList.map((list) => (
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
      <Footer />
    </>
  );
};

export default Home;

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
      'body3__400',
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
