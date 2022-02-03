import { NextPage } from 'next';
import { TBrunchListData, TListData } from '..';
import HomeList from '../../components/navigation/post/home-list';
import { brunchList } from '../../data/brunch-list';
import {
  designCollectionRefName,
  devCollectionRefName,
  getEachAllCollectionDataArray,
} from '../../service/firebase/firestore';

type Props = {
  designPostListData: TListData;
  devPostListData: TListData;
  allPostsListData: TListData;
  brunchListData: TBrunchListData;
};

const Category: NextPage<Props> = ({
  designPostListData,
  devPostListData,
  allPostsListData,
  brunchListData,
}) => {
  return (
    <HomeList
      designPostListData={designPostListData}
      devPostListData={devPostListData}
      allPostsListData={allPostsListData}
      brunchListData={brunchListData}
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

  const brunchListData = brunchList;

  return {
    props: {
      designPostListData,
      devPostListData,
      allPostsListData,
      brunchListData,
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
