import { NextPage } from 'next';
import { useToast } from '@dalgu/react-toast';
import {
  getAllCollectionDataArray,
  getPostByCategoryOrder,
  saveDataToFireStoreDB,
} from '../../service/firebase/firestore';
import { memo, useEffect } from 'react';
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
import HeadForSEO, { TInfoForSEO } from '../../SEO/headForSEO';
import { useUpdateVisitors } from '../../lib/hooks/useUpdateVisitors';
import { useInitializeClientData } from '../../lib/hooks/useInitializeClientData';

type Props = {
  post: IPostData;
  infoForSEOByCategoryOrder: TInfoForSEO;
};

const CategoryOrderPost: NextPage<Props> = (props) => {
  useUpdateVisitors();
  const { isAdmin } = useIsAdmin();
  const { showToast } = useToast();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const mounted = useMounted();
  const initializeClientData = useInitializeClientData();

  useEffect(() => {
    const SyncServerAndClientData = () => {
      dispatch(setPostData(props.post)); // 초기화 및 map() 상태 관리(블럭 추가, 블럭 삭제)
      dispatch(setTempPostData(props.post)); // 데이터 저장 위해(contentEditable 요소가 매번 렌더링될 때마다 생기는 문제 방지)
    };
    SyncServerAndClientData();

    return () => {
      initializeClientData();
    };
  }, []);

  const { post } = useGetClientPostData();
  const { tempPost } = useGetClientTempPostData();

  const currentCategory = router.query.category;
  const currentOrder = router.query.order;

  const tempSaveDataToFireStoreDB = async () => {
    await saveDataToFireStoreDB(
      currentCategory as string,
      currentOrder as string,
      tempPost
    );
    showToast('저장 완료');
  };

  useEffect(() => {
    if (isAdmin) {
      document.body.style.cssText = 'user-select: auto;';
    }
  }, [isAdmin]);

  // console.log('tempPost', tempPost.wysiwygDataArray[0].html);
  // console.log('tempPost', tempPost.wysiwygDataArray);

  return (
    <>
      <HeadForSEO info={props.infoForSEOByCategoryOrder.info} />
      {mounted && <Post contentEditable={isAdmin} postData={post} />}
      {isAdmin && (
        <>
          <button
            onClick={tempSaveDataToFireStoreDB}
            className='admin__button__left'
          >
            저장
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
};

export const getStaticProps = async ({ params }: Context) => {
  // 동적으로 만들어진 각 페이지의 [category]와 [order]를 매개변수 params로 전달
  const post = (await getPostByCategoryOrder(params)) as IPostData;
  const descriptionForSEO = post.wysiwygDataArray.find(
    (element) => element.blockType === 'Paragraph'
  );

  const infoForSEOByCategoryOrder = {
    info: {
      title: post.title,
      url: `https://blog.dalgu.app/${params.category}/${params.order}`,
      type: 'article',
      thumbnail: `/images/${params.category}${params.order}-thumbnail.jpg`,
      description: descriptionForSEO ? descriptionForSEO.html : null, // for serialize as JSON
    },
  };

  return { props: { post, infoForSEOByCategoryOrder } };
};

export const getStaticPaths = async () => {
  const allPosts = await getAllCollectionDataArray();
  const paths = allPosts.map((post) => ({
    params: { category: post.category, order: post.order },
  }));

  return { paths, fallback: false };
};
