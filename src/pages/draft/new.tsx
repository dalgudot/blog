import { useMounted } from '@dalgu/react-utility-hooks';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import SelectCategory from '../../components/draft/select-category';
import Post from '../../components/post/post';
import { useGetClientPostData } from '../../lib/hooks/useGetClientPostData';
import { useGetClientTempPostData } from '../../lib/hooks/useGetClientTempPostData';
import { useIsAdmin } from '../../lib/hooks/useIsAdmin';
import { postInitialData } from '../../redux-toolkit/model/post-data-model';
import { setPostData } from '../../redux-toolkit/slices/post-slice';
import { setTempPostData } from '../../redux-toolkit/slices/temp-post-slice';
import { useAppDispatch } from '../../redux-toolkit/store';
import {
  getDraftList,
  saveDataToFireStoreDB,
} from '../../service/firebase/firestore';

const NewDraft: NextPage = () => {
  const { isAdmin } = useIsAdmin();

  const mounted = useMounted();
  const router = useRouter();

  const { post } = useGetClientPostData();
  const { tempPost } = useGetClientTempPostData();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const initializeClientData = () => {
      dispatch(setPostData(postInitialData));
      dispatch(setTempPostData(postInitialData));
    };
    isAdmin && initializeClientData();

    return () => {
      isAdmin && initializeClientData();
    };
  }, []);

  const saveNewDraftToFireStoreDB = async () => {
    const draftList = await getDraftList();
    const maxValueOfOrder = Math.max(
      ...draftList.map((list) => Number(list.order)),
      0
    );
    const newPathOrder = maxValueOfOrder + 1;
    const dbPath = `draft/${newPathOrder}`;
    await saveDataToFireStoreDB(tempPost, dbPath);

    router.push('/draft/[order]', `/draft/${newPathOrder}`);
  };

  console.log('tempPost', tempPost);

  return (
    <>
      {isAdmin && mounted && (
        <>
          <SelectCategory />
          <Post contentEditable={isAdmin} postData={post} />
          <button
            onClick={saveNewDraftToFireStoreDB}
            style={{ marginTop: 48, marginLeft: 24 }}
          >
            Draft에 저장
          </button>
        </>
      )}
    </>
  );
};

export default NewDraft;
