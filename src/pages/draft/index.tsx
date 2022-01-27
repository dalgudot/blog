import { useToast } from '@dalgu/react-toast';
import { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getDraftList } from '../../service/firebase/firestore';

const Draft: NextPage = () => {
  // const { isAdmin } = useIsAdmin();
  const isAdmin = true;
  const { showToast } = useToast();
  const [draftList, setDraftList] = useState<
    {
      order: string;
      dateTime: string;
      title: string;
    }[]
  >([]);

  useEffect(() => {
    getDraftList() //
      .then((list) => {
        setDraftList(list);
        // showToast('Data fetching');
      });
  }, []);

  return (
    <>
      {isAdmin && (
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
      )}
    </>
  );
};

export default Draft;
