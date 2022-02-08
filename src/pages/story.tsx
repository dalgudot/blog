import { NextPage } from 'next';
import { TListData } from '.';
import { useUpdateVisitors } from '../lib/hooks/useUpdateVisitors';
import {
  getEachAllCollectionDataArray,
  storyCollectionRefName,
} from '../service/firebase/firestore';
import styles from '../components/navigation/post/post-list.module.scss';
import List from '../components/navigation/post/list';

type Props = {
  storyPostListData: TListData;
};

const Story: NextPage<Props> = ({ storyPostListData }) => {
  useUpdateVisitors();

  return (
    <>
      <main className={styles.main__layout}>
        <nav>
          <ul>
            {storyPostListData.map((list) => (
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
    </>
  );
};

export default Story;

export const getStaticProps = async () => {
  const storyPost = await getEachAllCollectionDataArray(storyCollectionRefName);

  const storyPostListData = storyPost.map((post) => ({
    category: post.category,
    order: post.order,
    title: post.title,
    dateTime: post.dateTime,
    status: post.status,
  }));

  return {
    props: {
      storyPostListData,
    },
  };
};
