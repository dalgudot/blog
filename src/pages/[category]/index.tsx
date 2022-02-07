import { NextPage } from 'next';
import { TListData } from '..';
import PostList from '../../components/navigation/post/post-list';
import { useUpdateTotalVisitors } from '../../lib/hooks/useUpdateTotalVisitors';
import {
  designCollectionRefName,
  devCollectionRefName,
  getEachAllCollectionDataArray,
} from '../../service/firebase/firestore';

type Props = {
  designPostListData: TListData;
  devPostListData: TListData;
  allPostsListData: TListData;
};

const Category: NextPage<Props> = ({
  designPostListData,
  devPostListData,
  allPostsListData,
}) => {
  useUpdateTotalVisitors();

  return (
    <PostList
      designPostListData={designPostListData}
      devPostListData={devPostListData}
      allPostsListData={allPostsListData}
    />
  );
};

export default Category;

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
    dateTime: post.dateTime,
    status: post.status,
  }));

  const devPostListData = devPost.map((post) => ({
    category: post.category,
    order: post.order,
    title: post.title,
    dateTime: post.dateTime,
    status: post.status,
  }));

  const allPostsListData = allPosts.map((post) => ({
    category: post.category,
    order: post.order,
    title: post.title,
    dateTime: post.dateTime,
    status: post.status,
  }));

  return {
    props: {
      designPostListData,
      devPostListData,
      allPostsListData,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = [
    { params: { category: 'design' } },
    { params: { category: 'dev' } },
  ];

  return { paths, fallback: false };
};
