import { useToast } from '@dalgu/react-toast';
import { useMounted } from '@dalgu/react-utility-hooks';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Article from '../../components/post/article/article';
import Post from '../../components/post/post';
import ReferenceBlockWYSIWYG from '../../components/post/reference/reference-block-wysiwyg';
import { useGetClientPostData } from '../../lib/hooks/useGetClientPostData';
import { useGetClientTempPostData } from '../../lib/hooks/useGetClientTempPostData';
import { setPostData } from '../../redux-toolkit/slices/post-slice';
import { setTempPostData } from '../../redux-toolkit/slices/temp-post-slice';
import { useAppDispatch } from '../../redux-toolkit/store';
import {
  getDraftByOrder,
  saveDataToFireStoreDB,
} from '../../service/firebase/firestore';

const DraftWriting: NextPage = () => {
  // const { isAdmin } = useIsAdmin();
  const contentEditable = true;
  const { post } = useGetClientPostData();
  const { tempPost } = useGetClientTempPostData();
  // const mounted = useMounted();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const draftOrder = router.query.order;

  useEffect(() => {
    draftOrder &&
      getDraftByOrder(draftOrder as string) //
        .then((draftData) => {
          const initializeClientData = () => {
            dispatch(setPostData(draftData)); // 초기화 및 map() 상태 관리(새로운 블럭 그리는 일 등)
            dispatch(setTempPostData(draftData)); // 데이터 저장 위해(contentEditable 요소가 매번 렌더링될 때마다 생기는 문제 방지)
          };
          contentEditable && initializeClientData();
        });
  }, [draftOrder]);

  const tempSaveDataToFireStoreDB = async () => {
    const dbPath = `draft/${draftOrder}`;
    await saveDataToFireStoreDB(tempPost, dbPath);
  };

  // console.log('post', post);
  console.log('tempPost', tempPost);
  return (
    <>
      {draftOrder && <Post contentEditable={contentEditable} postData={post} />}

      <button
        // onClick={tempSaveDataToFireStoreDB}
        style={{ marginTop: 48, marginLeft: 24 }}
      >
        Save to DB
      </button>

      <button
        // onClick={publishPost}
        style={{ marginTop: 48, marginLeft: 24 }}
      >
        발행하기
      </button>
    </>
  );
};

export default DraftWriting;
