import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useIsAdmin } from '../../lib/hooks/useIsAdmin';
import { getDraftList } from '../../service/firebase/firestore';

const Draft: NextPage = () => {
  const { isAdmin } = useIsAdmin();

  const [draftList, setDraftList] = useState<
    {
      order: string;
      dateTime: string;
      title: string;
    }[]
  >([]);
  const router = useRouter();

  useEffect(() => {
    getDraftList() //
      .then((list) => {
        setDraftList(list);
      });
  }, []);

  const createNewDraft = () => {
    router.push('/draft/new');
  };

  return (
    <>
      {isAdmin && (
        <>
          <div style={{ marginTop: 48 }}>
            {draftList.map((list, idx) => (
              <Link
                key={`${list.title}${idx}`}
                href='/draft/[order]'
                as={`/draft/${list.order}`}
              >
                <a style={{ marginLeft: 24 }}>
                  {list.dateTime}
                  {list.title}
                </a>
              </Link>
            ))}
          </div>
          <button
            onClick={createNewDraft}
            style={{ marginTop: 48, marginLeft: 24 }}
          >
            글쓰기
          </button>
        </>
      )}
    </>
  );
};

export default Draft;
