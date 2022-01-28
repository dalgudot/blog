import { NextPage } from 'next';
import { useToast } from '@dalgu/react-toast';
import {
  changeToPublished,
  getAllCollectionDataArray,
  getPostByCategoryOrder,
  saveDataToFireStoreDB,
} from '../../service/firebase/firestore';
import { useEffect } from 'react';
import { useAppDispatch } from '../../redux-toolkit/store';
import { useRouter } from 'next/router';
import { setPostData } from '../../redux-toolkit/slices/post-slice';
import { setTempPostData } from '../../redux-toolkit/slices/temp-post-slice';
import { useMounted } from '@dalgu/react-utility-hooks';
import Post from '../../components/post/post';
import { useGetClientPostData } from '../../lib/hooks/useGetClientPostData';
import { useGetClientTempPostData } from '../../lib/hooks/useGetClientTempPostData';
import { useIsAdmin } from '../../lib/hooks/useIsAdmin';
import { IPostData } from '../../redux-toolkit/model/post-data-model';

const CategoryOrderPost: NextPage<{ post: IPostData }> = (props) => {
  const { isAdmin } = useIsAdmin();
  const { showToast } = useToast();
  const router = useRouter();
  const locale = router.locale;
  const dispatch = useAppDispatch();
  const mounted = useMounted();

  useEffect(() => {
    const initializeClientData = () => {
      dispatch(setPostData(props.post)); // 초기화 및 map() 상태 관리(새로운 블럭 그리는 일 등)
      dispatch(setTempPostData(props.post)); // 데이터 저장 위해(contentEditable 요소가 매번 렌더링될 때마다 생기는 문제 방지)
    };
    initializeClientData();
  }, []);

  const { post } = useGetClientPostData();
  const { tempPost } = useGetClientTempPostData();

  const currentCategory = router.query.category;
  const currentOrder = router.query.order;
  const dbPath =
    locale === 'ko'
      ? `${currentCategory}/${currentOrder}`
      : `${currentCategory}/${currentOrder}-en`;

  const publishPost = async () => {
    await saveDataToFireStoreDB(tempPost, dbPath);
    await changeToPublished(dbPath);
    showToast('발행 완료');
  };

  const tempSaveDataToFireStoreDB = async () => {
    await saveDataToFireStoreDB(tempPost, dbPath);
    showToast('서버에 임시 저장 완료');
  };

  return (
    <>
      {mounted && <Post contentEditable={isAdmin} postData={post} />}
      {isAdmin && (
        <>
          <button
            onClick={tempSaveDataToFireStoreDB}
            style={{ marginTop: 48, marginLeft: 24 }}
          >
            <code>Save to DB</code>
          </button>

          <button
            onClick={publishPost}
            style={{ marginTop: 48, marginLeft: 24 }}
          >
            <code>발행하기</code>
          </button>
        </>
      )}
    </>
  );
};

export default CategoryOrderPost;

type Context = {
  params: {
    category: string;
    order: string;
  };
  locale: 'ko' | 'en';
};

export const getStaticProps = async ({ params, locale }: Context) => {
  // 동적으로 만들어진 각 페이지의 [category]와 [order]를 매개변수 params로 전달
  const post = await getPostByCategoryOrder(params, locale);
  return { props: { post } };
};

export const getStaticPaths = async () => {
  const allPosts = await getAllCollectionDataArray();

  const paths = allPosts.map((post) =>
    post.order.includes('en')
      ? {
          params: {
            category: post.category,
            order: post.order.replace('-en', ''),
          },
          locale: 'en',
        }
      : {
          params: { category: post.category, order: post.order },
          locale: 'ko',
        }
  );

  return { paths, fallback: false };
};

// useEffect(() => {
//   // local이든 production이든 수정할 때는 수정한 내용 반영되도록, contentEditable이면 클라이언트에서 새로 데이터 받아와서 정렬
//   isAdmin && fetchDB()
// }, [isAdmin])
