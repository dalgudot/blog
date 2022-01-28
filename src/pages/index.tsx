import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import NavLists from '../components/navigation/article/nav-lists';
import { useIsAdmin } from '../lib/hooks/useIsAdmin';
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
  const { isAdmin } = useIsAdmin();
  const router = useRouter();
  const locale = router.locale;
  const allPostsListData =
    locale === 'ko' ? allKoPostsListData : allEnPostsListData;

  return (
    <>
      {/* 404 방지 위해 개발과 디자인 각각 파일 만들어주는 게 좋음. */}
      <Link href='/'>
        <a>전체</a>
      </Link>
      <Link href='/' as='/dev'>
        <a>개발</a>
      </Link>
      <Link href='/' as='/design'>
        <a>디자인</a>
      </Link>
      <main>
        <NavLists allPostsListData={allPostsListData} />
      </main>
      {isAdmin && (
        <>
          <Link href='/draft'>
            <a>초고 목록 보기</a>
          </Link>
          <Link href='/draft/new'>
            <a>글쓰기</a>
          </Link>
        </>
      )}
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

  // 리스트 디자인이 끝난 뒤 브런치 링크 넣기

  return {
    props: { allKoPostsListData, allEnPostsListData },
  };
};
