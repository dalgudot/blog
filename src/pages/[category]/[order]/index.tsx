import { NextPage } from 'next';
import { useIsAdmin } from '../../../lib/hooks/useIsAdmin';
import Response from '../../../components/post/response/response';
import ReferenceBlockWYSIWYG from '../../../components/post/reference/reference-block-wysiwyg';
import Contact from '../../../components/contact/contact';
import { useToast } from '@dalgu/react-toast';
import {
  getAllArticles,
  getRefDatas,
  setDocument,
} from '../../../service/firebase/firestore-db';
import { useEffect } from 'react';
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from '../../../redux-toolkit/store';
import {
  IRefData,
  setRefDatas,
} from '../../../redux-toolkit/slices/post-datas-slice';

const CategoryOrderPost: NextPage<{ refData: IRefData[] }> = (props) => {
  // const { isAdmin } = useIsAdmin();
  const contentEditable: boolean = true;
  const { showToast } = useToast();

  // 첫 렌더링 시 getStaticProps()로 받아온 static data를 리덕스에 저장해 초기화
  // 서버에서 받아온 데이터는 클라이언트(리덕스)에서 관리
  const staticDatas = props.refData;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setRefDatas(staticDatas));
  }, []);

  // 수정한 데이터는 리덕스에서 갖고 있다가 'saveDataToFireStoreDB' 버튼 누르면 업데이트
  const { postDatas } = useAppSelector((state: RootState) => state.postDates);
  const saveDataToFireStoreDB = () => {
    setDocument(postDatas, 'dev/ref') // 저장되는 위치 동적으로 변경
      .then(() => {
        showToast('서버 저장 완료');
      });
  };
  console.log(postDatas);

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
      <ReferenceBlockWYSIWYG contentEditable={contentEditable} />
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

// https://yceffort.kr/2020/03/nextjs-02-data-fetching
// [API Docs] yarn dev(next dev)에서는 매번 호출!
// GitHub repo에서 Vercel 프론트 서버로 푸시한 뒤에 하는 '빌드'에서만 호출! -> 사용자는 파이어스토어 호출하지 않음.
// This also gets called at build time
export const getStaticProps = async ({ params }: Params) => {
  const refData = await getRefDatas();
  const category = params.category;
  const order = params.order;

  return { props: { refData } };
};

export const getStaticPaths = async () => {
  const posts = await getAllArticles();
  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { category: post.category, order: String(post.order) }, // number -> string,
  }));
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};
