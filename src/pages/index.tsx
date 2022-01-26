import { InferGetStaticPropsType, NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import NavLists from '../components/navigation/article/nav-lists';
import { getAllCollectionDataArray } from '../service/firebase/firestore';

type Props = {
  allKoPostsListData: {
    category: string;
    order: string;
    title: string;
  }[];

  allEnPostsListData: {
    category: string;
    order: string;
    title: string;
  }[];
};

// rule: 페이지 컴포넌트에서는 데이터를 전달하기만 한다 -> 나만의 리액트 클린 아키텍처 만들기
const Index: NextPage<Props> = ({ allKoPostsListData, allEnPostsListData }) => {
  const router = useRouter();
  const locale = router.locale;
  const allPostsListData =
    locale === 'ko' ? allKoPostsListData : allEnPostsListData;

  return (
    <>
      <main>
        <NavLists allPostsListData={allPostsListData} />
      </main>
      <Link href='/'>
        <a>전체</a>
      </Link>
      {/* 404 방지 위해 개발과 디자인 각각 파일 만들어주는 게 좋음. */}
      <Link href='/' as='/dev'>
        <a>개발</a>
      </Link>
      <Link href='/' as='/design'>
        <a>디자인</a>
      </Link>
    </>
  );
};

export default Index;

// https://yceffort.kr/2020/03/nextjs-02-data-fetching
export const getStaticProps = async () => {
  // firestore db에서 List를 그릴 title 데이터, seo 데이터(로컬) 받아옴.
  const allPosts = await getAllCollectionDataArray();
  const allKoPostsListData = allPosts
    .map((post) => {
      const isEn: boolean = post.order.includes('-en');
      return (
        !isEn && {
          category: post.category,
          order: post.order,
          title: post.title,
        }
      );
    })
    .filter((data) => data !== false);
  const allEnPostsListData = allPosts
    .map((post) => {
      const isEn: boolean = post.order.includes('-en');
      return (
        isEn && {
          category: post.category,
          order: post.order.replace('-en', ''),
          title: post.title,
        }
      );
    })
    .filter((data) => data !== false);
  // [변경] 필요한 부분만 props로 return!

  console.log(allKoPostsListData, allEnPostsListData);

  return {
    props: { allKoPostsListData, allEnPostsListData },
  };
};
