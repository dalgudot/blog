import type { NextPage } from 'next';
import NavLists from '../components/navigation/article/nav-lists';

// rule: 페이지 컴포넌트에서는 데이터를 전달하기만 한다 -> 나만의 리액트 클린 아키텍처 만들기
const Index: NextPage = () => {
  // firestore db에서 List를 그릴 title 데이터, seo 데이터(로컬) 받아옴.

  const datas = [
    {
      category: 'dev',
      order: 1,
      content: '첫 번째',
    },
    {
      category: 'dev',
      order: 2,
      content: '두 번째',
    },
    {
      category: 'dev',
      order: 3,
      content: '세 번째',
    },
  ];
  // url을 만들 데이터도 동적으로 받아와야 함! -> category, order!

  return (
    <>
      <NavLists datas={datas} />
    </>
  );
};

export default Index;
