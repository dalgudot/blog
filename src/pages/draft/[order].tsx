import { useToast } from '@dalgu/react-toast';
import { useMounted } from '@dalgu/react-utility-hooks';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import SelectCategory from '../../components/draft/select-category';
import Post from '../../components/post/post';
import { useGetClientPostData } from '../../lib/hooks/useGetClientPostData';
import { useGetClientTempPostData } from '../../lib/hooks/useGetClientTempPostData';
import { IPostData } from '../../redux-toolkit/model/post-data-model';
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
  const { showToast } = useToast();
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
            dispatch(setPostData(draftData as IPostData)); // 초기화 및 map() 상태 관리(새로운 블럭 그리는 일 등)
            dispatch(setTempPostData(draftData as IPostData)); // 데이터 저장 위해(contentEditable 요소가 매번 렌더링될 때마다 생기는 문제 방지)
          };
          contentEditable && initializeClientData();
        });
  }, [draftOrder]);

  const tempSaveDataToFireStoreDB = async () => {
    const dbPath = `draft/${draftOrder}`;
    await saveDataToFireStoreDB(tempPost, dbPath);
    showToast('서버에 Draft 임시 저장');
  };

  const publishPost = async () => {
    // category(dev, design) 할당해 url 만들기
    // order 해당 카테고리에서 가장 큰 값보다 +1해서 url에 더하기
    // status published
    // [환경 변수 설정] localhost의 경우 만들어진 경로로 바로 이동.
    // [환경 변수 설정] production인 경우 toast
    // await saveDataToFireStoreDB(tempPost, dbPath);
    // await changeToPublish(dbPath);
    showToast('발행 완료');
  };

  // console.log('post', post);
  console.log('tempPost', tempPost);
  return (
    <>
      {draftOrder && (
        <>
          <SelectCategory />
          <Post contentEditable={contentEditable} postData={post} />
        </>
      )}

      <button
        onClick={tempSaveDataToFireStoreDB}
        style={{ marginTop: 48, marginLeft: 24 }}
      >
        Save to DB
      </button>

      <button onClick={publishPost} style={{ marginTop: 48, marginLeft: 24 }}>
        발행하기
      </button>
    </>
  );
};

export default DraftWriting;
