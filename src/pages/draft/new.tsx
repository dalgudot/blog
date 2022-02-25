import { useMounted } from '@dalgu/react-utility-hooks';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Post from '../../components/post/post';
import { useGetClientPostData } from '../../lib/hooks/useGetClientPostData';
import { useGetClientTempPostData } from '../../lib/hooks/useGetClientTempPostData';
import { useInitializeClientData } from '../../lib/hooks/useInitializeClientData';
import { useIsAdmin } from '../../lib/hooks/useIsAdmin';
import {
  draftCollectionRefName,
  getEachAllCollectionDataArray,
  saveDataToFireStoreDB,
} from '../../service/firebase/firestore';

const NewDraft: NextPage = () => {
  const { isAdmin } = useIsAdmin();
  const mounted = useMounted();
  const router = useRouter();
  const { post } = useGetClientPostData();
  const { tempPost } = useGetClientTempPostData();
  const initializeClientData = useInitializeClientData();

  useEffect(() => {
    initializeClientData();

    return () => {
      initializeClientData();
    };
  }, []);

  const saveNewDraftToFireStoreDB = async () => {
    const draftList = await getEachAllCollectionDataArray(
      draftCollectionRefName
    );
    const maxValueOfOrder = Math.max(
      ...draftList.map((list) => Number(list.order)),
      0
    );
    const newPathOrder = maxValueOfOrder !== NaN ? maxValueOfOrder + 1 : 1;
    const dbDocument = `${newPathOrder}`;
    await saveDataToFireStoreDB(draftCollectionRefName, dbDocument, tempPost);

    router.push('/draft/[order]', `/draft/${newPathOrder}`);
  };

  // console.log('tempPost', tempPost);
  return (
    <>
      {isAdmin && mounted && (
        <>
          <Post contentEditable={isAdmin} postData={post} />
          <button
            onClick={saveNewDraftToFireStoreDB}
            className='admin__button__left'
          >
            초고 저장
          </button>
        </>
      )}
    </>
  );
};

export default NewDraft;
