import { useToast } from '@dalgu/react-toast';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import SelectCategory from '../../components/draft/select-category';
import Post from '../../components/post/post';
import { useGetClientPostData } from '../../lib/hooks/useGetClientPostData';
import { useGetClientTempPostData } from '../../lib/hooks/useGetClientTempPostData';
import { useIsAdmin } from '../../lib/hooks/useIsAdmin';
import { IPostData } from '../../redux-toolkit/model/post-data-model';
import { setPostData } from '../../redux-toolkit/slices/post-slice';
import { setTempPostData } from '../../redux-toolkit/slices/temp-post-slice';
import { useAppDispatch } from '../../redux-toolkit/store';
import {
  changeToPublished,
  getDraftByOrder,
  getEachAllCollectionDataArray,
  saveDataToFireStoreDB,
} from '../../service/firebase/firestore';

const DraftWriting: NextPage = () => {
  const { isAdmin } = useIsAdmin();

  const { showToast } = useToast();
  const { post } = useGetClientPostData();
  const { tempPost } = useGetClientTempPostData();
  // const mounted = useMounted();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const draftOrder = router.query.order;
  const draftDbPath = `draft/${draftOrder}`;

  useEffect(() => {
    draftOrder &&
      getDraftByOrder(draftOrder as string) //
        .then((draftData) => {
          const initializeClientData = () => {
            dispatch(setPostData(draftData as IPostData)); // 초기화 및 map() 상태 관리(새로운 블럭 그리는 일 등)
            dispatch(setTempPostData(draftData as IPostData)); // 데이터 저장 위해(contentEditable 요소가 매번 렌더링될 때마다 생기는 문제 방지)
          };
          isAdmin && initializeClientData();
        });
  }, [draftOrder]);

  const tempSaveDataToFireStoreDB = async () => {
    await saveDataToFireStoreDB(tempPost, draftDbPath);
    showToast('서버에 Draft 임시 저장');
  };

  const publishPost = async () => {
    const category = tempPost.category;
    const categoryList = await getEachAllCollectionDataArray(category);
    const maxValueOfOrder = Math.max(
      ...categoryList.map((list) => Number(list.order)),
      0
    );
    const newPathOrder = maxValueOfOrder + 1;
    const dbPath = `${category}/${newPathOrder}`;
    await saveDataToFireStoreDB(tempPost, draftDbPath); // draft에도 저장
    await saveDataToFireStoreDB(tempPost, dbPath);
    await changeToPublished(dbPath); // change status to 'published'

    // [환경 변수 설정] production인 경우 toast, localhost의 경우 만들어진 경로로 바로 이동.
    process.env.NODE_ENV === 'production'
      ? showToast('발행 완료')
      : router.push('/[category]/[order]', `/${dbPath}`);
  };

  // console.log('post', post);
  // console.log('tempPost', tempPost);
  return (
    <>
      {draftOrder && (
        <>
          <SelectCategory />
          <Post contentEditable={isAdmin} postData={post} />
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
