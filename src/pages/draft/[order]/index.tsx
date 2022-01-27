import { useToast } from '@dalgu/react-toast';
import { useMounted } from '@dalgu/react-utility-hooks';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Article from '../../../components/post/article/article';
import ReferenceBlockWYSIWYG from '../../../components/post/reference/reference-block-wysiwyg';
import {
  getDraftByOrder,
  getDraftList,
} from '../../../service/firebase/firestore';

const DraftWriting: NextPage = () => {
  // const { isAdmin } = useIsAdmin();
  const contentEditable = true;
  const { showToast } = useToast();
  const mounted = useMounted();
  const [draft, setDraft] = useState<any>();

  const router = useRouter();

  useEffect(() => {
    const draftOrder = router.query.order;

    draftOrder &&
      getDraftByOrder(draftOrder as string) //
        .then((draftData) => {
          setDraft(draftData);
        });
  }, [router]);

  console.log(draft);
  return (
    <>
      {mounted && (
        <>
          <main>
            <Article
              contentEditable={contentEditable}
              title={draft.title}
              dateTime='2022-01-25'
              publish={draft.publish}
            />
          </main>
          {/* <Contact /> */}
          {/* <Response /> */}
          {/* <ReferenceBlockWYSIWYG
            contentEditable={contentEditable}
            refDataArray={draft.refDataArray}
          /> */}
        </>
      )}

      <button
        // onClick={tempSaveDataToFireStoreDB}
        style={{ marginTop: 48, marginLeft: 24 }}
      >
        <code>Save to DB</code>
      </button>

      <button
        // onClick={publishPost}
        style={{ marginTop: 48, marginLeft: 24 }}
      >
        <code>발행하기</code>
      </button>
    </>
  );
};

export default DraftWriting;
