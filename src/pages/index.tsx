import { NextPage } from 'next';
import Home from '../components/navigation/post/home';
import { useUpdateTotalVisitors } from '../lib/hooks/useUpdateTotalVisitors';
import {
  designCollectionRefName,
  devCollectionRefName,
  getEachAllCollectionDataArray,
} from '../service/firebase/firestore';

export type TListData = {
  category: string;
  order: string;
  title: string;
}[];

type Props = {
  designPostListData: TListData;
  devPostListData: TListData;
  allPostsListData: TListData;
};

const Index: NextPage<Props> = ({
  designPostListData,
  devPostListData,
  allPostsListData,
}) => {
  useUpdateTotalVisitors();

  return (
    <Home
      designPostListData={designPostListData}
      devPostListData={devPostListData}
      allPostsListData={allPostsListData}
    />
  );
};

export default Index;

export const getStaticProps = async () => {
  const designPost = await getEachAllCollectionDataArray(
    designCollectionRefName
  );
  const devPost = await getEachAllCollectionDataArray(devCollectionRefName);
  const allPosts = designPost.concat(devPost);

  const designPostListData = designPost.map((post) => ({
    category: post.category,
    order: post.order,
    title: post.title,
  }));

  const devPostListData = devPost.map((post) => ({
    category: post.category,
    order: post.order,
    title: post.title,
  }));

  const allPostsListData = allPosts.map((post) => ({
    category: post.category,
    order: post.order,
    title: post.title,
  }));

  return {
    props: {
      designPostListData,
      devPostListData,
      allPostsListData,
    },
  };
};
