import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import List from '../../components/navigation/post/list';
import { useIsAdmin } from '../../lib/hooks/useIsAdmin';
import { IPostData } from '../../redux-toolkit/model/post-data-model';
import {
  draftCollectionRefName,
  getEachAllCollectionDataArray,
} from '../../service/firebase/firestore';
import styles from '../../components/navigation/post/post-list.module.scss';

const Draft: NextPage = () => {
  const { isAdmin } = useIsAdmin();
  const [draftList, setDraftList] = useState<IPostData[]>([]);

  useEffect(() => {
    getEachAllCollectionDataArray(draftCollectionRefName) //
      .then((list) => {
        setDraftList(list);
      });
  }, []);

  console.log(draftList);

  return (
    <>
      {isAdmin && (
        <main className={styles.main__layout}>
          <nav>
            <ul>
              {draftList.map((list) => (
                <List
                  key={list.title}
                  category={list.category}
                  order={list.order}
                  title={list.title}
                  dateTime={list.dateTime}
                  status={list.status}
                />
              ))}
            </ul>
          </nav>
        </main>
      )}
    </>
  );
};

export default Draft;
