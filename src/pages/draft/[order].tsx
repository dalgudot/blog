import { useToast } from '@dalgu/react-toast';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import SelectCategory from '../../components/draft/select-category';
import Post from '../../components/post/post';
import { useGetClientPostData } from '../../lib/hooks/useGetClientPostData';
import { useGetClientTempPostData } from '../../lib/hooks/useGetClientTempPostData';
import { useInitializeClientData } from '../../lib/hooks/useInitializeClientData';
import { useIsAdmin } from '../../lib/hooks/useIsAdmin';
import { IPostData } from '../../redux-toolkit/model/post-data-model';
import { setPostData } from '../../redux-toolkit/slices/post-slice';
import { setTempPostData } from '../../redux-toolkit/slices/temp-post-slice';
import { useAppDispatch } from '../../redux-toolkit/store';
import {
  changeToPublished,
  draftCollectionRefName,
  getDraftByOrder,
  getEachAllCollectionDataArray,
  saveDataToFireStoreDB,
  updateTimestamp,
} from '../../service/firebase/firestore';

const DraftWriting: NextPage = () => {
  const { isAdmin } = useIsAdmin();
  const { showToast } = useToast();
  const { post } = useGetClientPostData();
  const { tempPost } = useGetClientTempPostData();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const draftOrder = router.query.order as string;
  const initializeClientData = useInitializeClientData();

  useEffect(() => {
    draftOrder &&
      getDraftByOrder(draftOrder as string) //
        .then((draftData) => {
          const initializeDraftData = () => {
            dispatch(setPostData(draftData as IPostData)); // 초기화 및 map() 상태 관리(새로운 블럭 그리는 일 등)
            dispatch(setTempPostData(draftData as IPostData)); // 데이터 저장 위해(contentEditable 요소가 매번 렌더링될 때마다 생기는 문제 방지)
          };
          initializeDraftData();
        });

    return () => {
      initializeClientData();
    };
  }, [draftOrder]);

  const tempSaveDataToFireStoreDB = async () => {
    await saveDataToFireStoreDB(draftCollectionRefName, draftOrder, tempPost);
    showToast('임시 저장 완료');
  };

  const publishPost = async () => {
    const category = tempPost.category;
    const categoryList = await getEachAllCollectionDataArray(category);
    const maxValueOfOrder = Math.max(
      ...categoryList.map((list) => Number(list.order)),
      0
    );
    const newPathOrder = String(
      maxValueOfOrder !== NaN ? maxValueOfOrder + 1 : 1
    );

    await tempSaveDataToFireStoreDB(); // draft에도 저장
    await saveDataToFireStoreDB(category, newPathOrder, tempPost);
    await changeToPublished(category, newPathOrder); // change status to 'published'

    // [환경 변수 설정] production인 경우 toast, localhost의 경우 만들어진 경로로 바로 이동.
    process.env.NODE_ENV === 'production'
      ? showToast('발행 완료')
      : router.push('/[category]/[order]', `/${category}/${newPathOrder}`);
  };

  console.log('tempPost', tempPost.wysiwygDataArray);

  return (
    <>
      {isAdmin && (
        <>
          <SelectCategory />
          <Post contentEditable={isAdmin} postData={post} />
        </>
      )}

      <button
        onClick={tempSaveDataToFireStoreDB}
        style={{ marginTop: 48, marginLeft: 24 }}
      >
        임시 저장
      </button>

      <button onClick={publishPost} style={{ marginTop: 48, marginLeft: 24 }}>
        발행하기
      </button>
    </>
  );
};

export default DraftWriting;
