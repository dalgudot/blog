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
import { setPostData } from '../../../redux-toolkit/slices/post-slice';
import { setTempPostData } from '../../../redux-toolkit/slices/temp-post-slice';

const CategoryOrderPost: NextPage<any> = (props) => {
  // const { isAdmin } = useIsAdmin();
  const contentEditable: boolean = true;
  const { showToast } = useToast();
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initializeClientData = () => {
      dispatch(setPostData(props.post)); // 초기화 및 map() 상태 관리(새로운 블럭 그리는 일 등)
      dispatch(setTempPostData(props.post)); // 데이터 저장 위해(contentEditable 요소가 매번 렌더링될 때마다 생기는 문제 방지)
    };
    initializeClientData();
  }, []);

  const { post } = useAppSelector((state: RootState) => state.post); // 초기화 및 map() 상태 관리(새로운 블럭 그리는 일 등)
  const { tempPost } = useAppSelector((state: RootState) => state.tempPost); // 데이터 저장 위해(contentEditable 요소가 매번 렌더링될 때마다 생기는 문제 방지)
  // console.log('post', post);
  console.log('tempPost.refDataArray', tempPost.refDataArray);

  // saveTempDataToRedux feature is not needed.
  const saveTempDataToRedux = () => dispatch(setPostData(tempPost));

  const saveDataToFireStoreDB = () => {
    const currentCategory = router.query.category;
    const currentOrder = router.query.order;
    setDocument(tempPost, `${currentCategory}/${currentOrder}`).then(() => {
      showToast('서버 저장 완료');
    });
  };

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
        refDataArray={post.refDataArray}
      />
      {contentEditable && (
        <>
          <button
            onClick={saveTempDataToRedux}
            style={{ marginTop: 48, marginLeft: 24 }}
          >
            리덕스에 임시 저장
          </button>
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

// useEffect(() => {
//   // local이든 production이든 수정할 때는 수정한 내용 반영되도록, contentEditable이면 클라이언트에서 새로 데이터 받아와서 정렬
//   contentEditable && fetchDB()
// }, [contentEditable])

// number -> string,
// order: String(post.order)
