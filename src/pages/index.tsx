import { useToast } from '@dalgu/react-toast';
import NavLists from '../components/navigation/article/nav-lists';
import { getAllArticles, setDocument } from '../service/firebase/firestore-db';

type Props = {
  allPosts: {
    category: string;
    order: string;
  }[];
};

// rule: 페이지 컴포넌트에서는 데이터를 전달하기만 한다 -> 나만의 리액트 클린 아키텍처 만들기
const Index = (props: Props) => {
  const listDatas = props.allPosts.sort((a, b) =>
    a.order > b.order ? -1 : a.order < b.order ? 1 : 0
  );

  const { showToast } = useToast();
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
    order4: {
      category: 'dev',
      order: '4',
    },
    order5: {
      category: 'dev',
      order: '5',
    },
    order6: {
      category: 'dev',
      order: '6',
    },
  };

  const saveDB = () => {
    setDocument(firestoreData, 'dev/publish') //
      .then(() => {
        showToast('서버 저장');
      });
  };

  return (
    <>
      <NavLists datas={listDatas} />
      <button onClick={saveDB}>테스트 저장</button>
      <button>새로운 글 작성</button>
    </>
  );
};

export default Index;

export const getStaticProps = async () => {
  // firestore db에서 List를 그릴 title 데이터, seo 데이터(로컬) 받아옴.
  const allPosts = await getAllArticles();

  return {
    props: { allPosts },
  };
};
