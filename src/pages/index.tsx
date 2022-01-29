import { NextPage } from 'next';
import Link from 'next/link';
import List from '../components/navigation/post/list';
import { useIsAdmin } from '../lib/hooks/useIsAdmin';
import { getAllCollectionDataArray } from '../service/firebase/firestore';

type Props = {
  allPostsListData: {
    category: string;
    order: string;
    title: string;
  }[];
};

// rule: 페이지 컴포넌트에서는 데이터를 전달하기만 한다 -> 나만의 리액트 클린 아키텍처 만들기
const Index: NextPage<Props> = ({ allPostsListData }) => {
  const { isAdmin } = useIsAdmin();

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
        <nav>
          <ul>
            {allPostsListData.map((listData, idx) => (
              <List
                key={idx}
                category={listData.category}
                order={listData.order}
                title={listData.title}
              />
            ))}
          </ul>
        </nav>
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
  const allPostsListData = allPosts.map((post) => ({
    category: post.category,
    order: post.order,
    title: post.title,
  }));

  // 리스트 디자인이 끝난 뒤 브런치 링크 넣기

  return {
    props: { allPostsListData },
  };
};
