import { NextPage } from 'next';
import { useIsAdmin } from '../../../lib/hooks/useIsAdmin';
import Response from '../../../components/post/response/response';
import ReferenceBlockWYSIWYG from '../../../components/post/reference/reference-block-wysiwyg';
import Contact from '../../../components/contact/contact';
import { useToast } from '@dalgu/react-toast';
import {
  getAllCollectionDataArray,
  getPostByCategoryOrder,
  setDocument,
} from '../../../service/firebase/firestore';
import { useEffect } from 'react';
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from '../../../redux-toolkit/store';
import { useRouter } from 'next/router';
import {
  setPostData,
  setRefTitleData,
  setRefUrlData,
} from '../../../redux-toolkit/slices/post-slice';

const CategoryOrderPost: NextPage<any> = (props) => {
  // const { isAdmin } = useIsAdmin();
  const contentEditable: boolean = true;
  const { showToast } = useToast();
  const router = useRouter();

  const refDataArray = props.post.refDataArray;

  // 첫 렌더링 시 getStaticProps()로 받아온 static data를 리덕스에 저장해 초기화
  // 서버에서 받아온 뒤 변경되는 데이터는 서버에 저장하기 전까지 클라이언트(리덕스)에서 관리
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setPostData(props.post));
  }, []);

  const setRefTitle = (data: string, currentIndex: number) => {
    dispatch(setRefTitleData({ data, currentIndex }));
  };
  const setRefUrl = (data: string, currentIndex: number) => {
    dispatch(setRefUrlData({ data, currentIndex }));
  };

  // 수정한 데이터는 리덕스에서 갖고 있다가 'saveDataToFireStoreDB' 버튼 누르면 업데이트
  const { post } = useAppSelector((state: RootState) => state.post);
  // console.log('post', post);

  const saveDataToFireStoreDB = () => {
    const currentCategory = router.query.category;
    const currentOrder = router.query.order;

    setDocument(post, `${currentCategory}/${currentOrder}`) // 저장되는 위치 동적으로 변경
      .then(() => {
        showToast('서버 저장 완료');
      });
  };

  // useEffect(() => {
  //   // local이든 production이든 수정할 때는 수정한 내용 반영되도록, contentEditable이면 클라이언트에서 새로 데이터 받아와서 정렬
  //   contentEditable && fetchDB()
  // }, [contentEditable])

  return (
    <>
      {/* <main>
        <Article contentEditable={contentEditable} />
      </main>
      <Contact />
      <Response /> */}
      렌더링 안 되는 부분
      <ReferenceBlockWYSIWYG
        contentEditable={contentEditable}
        refDataArray={refDataArray}
        setRefTitle={setRefTitle}
        setRefUrl={setRefUrl}
      />
      {contentEditable && (
        <>
          <button
            onClick={saveDataToFireStoreDB}
            style={{ marginTop: 48, marginLeft: 24 }}
          >
            DB에 저장
          </button>
        </>
      )}
    </>
  );
};

export default CategoryOrderPost;

type Params = {
  params: {
    category: string;
    order: string;
  };
};

export const getStaticProps = async ({ params }: Params) => {
  // console.log('params', params);
  // 동적으로 만들어진 각 페이지의 [category]와 [order]를 매개변수 params로 전달
  const post = await getPostByCategoryOrder(params);

  return { props: { post } };
};

export const getStaticPaths = async () => {
  const allPosts = await getAllCollectionDataArray();
  const paths = allPosts.map((post) => ({
    params: { category: post.category, order: post.order },
  }));

  return { paths, fallback: false };
};

// https://yceffort.kr/2020/03/nextjs-02-data-fetching
// [API Docs] yarn dev(next dev)에서는 매번 호출!
// GitHub repo에서 Vercel 프론트 서버로 푸시한 뒤에 하는 '빌드'에서만 호출! -> 사용자는 파이어스토어 호출하지 않음.
// This also gets called at build time

// number -> string,
// order: String(post.order)
