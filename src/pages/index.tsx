import { InferGetStaticPropsType, NextPage } from 'next';
import Link from 'next/link';
import NavLists from '../components/navigation/article/nav-lists';
import { getAllCollectionDataArray } from '../service/firebase/firestore';

// rule: 페이지 컴포넌트에서는 데이터를 전달하기만 한다 -> 나만의 리액트 클린 아키텍처 만들기
const Index: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (
  props
) => {
  const listDatas = props.allPosts.sort((a, b) =>
    a.order > b.order ? -1 : a.order < b.order ? 1 : 0
  );

  return (
    <>
      <main>
        <NavLists datas={listDatas} />
      </main>
      <Link href='/'>
        <a>전체</a>
      </Link>
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

  // [변경] 필요한 부분만 props로 return!

  return {
    props: { allPosts },
  };
};
