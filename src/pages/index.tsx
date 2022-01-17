import { useToast } from '@dalgu/react-toast';
import type { NextPage } from 'next';
import { useEffect } from 'react';
import NavLists from '../components/navigation/article/nav-lists';
import { FireStoreDB } from '../service/firebase/firestore-db';

const firestore = new FireStoreDB();

type Props = {
  allPosts: {
    category: string;
    order: string;
  }[];
};

// rule: 페이지 컴포넌트에서는 데이터를 전달하기만 한다 -> 나만의 리액트 클린 아키텍처 만들기
const Index = (props: Props) => {
  // firestore db에서 List를 그릴 title 데이터, seo 데이터(로컬) 받아옴.

  const { showToast } = useToast();

  const datas = [
    {
      category: 'dev',
      order: '1',
      content: '첫 번째',
    },
    {
      category: 'dev',
      order: '2',
      content: '두 번째',
    },
    {
      category: 'dev',
      order: '3',
      content: '세 번째',
    },
  ];

  const firestoreData = {
    order1: {
      category: 'dev',
      order: '1',
    },
    order2: {
      category: 'dev',
      order: '2',
    },
    order3: {
      category: 'dev',
      order: '3',
    },

    // design: {
    //   order1: '첫 번째',
    //   order2: '두 번째',
    //   order3: '세 번째',
    // },
  };

  // url을 만들 데이터도 동적으로 받아와야 함! -> category, order!

  // const paths = datas.map((post) => ({
  //   params: { category: post.category, order: post.order },
  // }));

  // console.log(paths);

  const saveDB = () => {
    firestore.setDocument(firestoreData, 'posts/dev').then(() => {
      showToast('서버 저장');
    });
    // .catch((error) => {
    //   throw new Error(error);
    // });
  };

  // const posts = firestore.getAllPosts();
  // console.log('posts', posts);

  return (
    <>
      <NavLists datas={props.allPosts} />
      <button onClick={saveDB}>테스트 저장</button>
    </>
  );
};

export default Index;

export const getStaticProps = async () => {
  const allPosts = await firestore.getAllPosts();

  return {
    props: { allPosts },
  };
};
