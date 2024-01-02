import { NextPage } from 'next';
import { TListData } from '..';
import PostList from '../../components/navigation/post/post-list';
import { useUpdateVisitors } from '../../lib/hooks/useUpdateVisitors';
import {
  brandCollectionRefName,
  designCollectionRefName,
  devCollectionRefName,
  getEachAllCollectionDataArray,
} from '../../service/firebase/firestore';

type Props = {
  designPostListData: TListData;
  devPostListData: TListData;
  brandPostListData: TListData;
  allPostsListData: TListData;
};

const Category: NextPage<Props> = ({
  designPostListData,
  devPostListData,
  brandPostListData,
  allPostsListData,
}) => {
  useUpdateVisitors();

  return (
    <PostList
      designPostListData={designPostListData}
      devPostListData={devPostListData}
      brandPostListData={brandPostListData}
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
  const brandPost = await getEachAllCollectionDataArray(brandCollectionRefName);
  const allPosts = designPost.concat(devPost).concat(brandPost);

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

  const brandPostListData = brandPost.map((post) => ({
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
      brandPostListData,
      allPostsListData,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = [
    { params: { category: 'design' } },
    { params: { category: 'dev' } },
    { params: { category: 'brand' } },
  ];

  return { paths, fallback: false };
};
