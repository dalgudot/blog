import { NextPage } from 'next';
import PostList from '../components/navigation/post/post-list';
import { useMixpanelTrack } from '../lib/hooks/useMixpanelTrack';
import { useUpdateVisitors } from '../lib/hooks/useUpdateVisitors';
import { TStatus } from '../redux-toolkit/model/post-data-model';
import {
  designCollectionRefName,
  devCollectionRefName,
  getEachAllCollectionDataArray,
} from '../service/firebase/firestore';

export type TListData = {
  category: string;
  order: string;
  title: string;
  dateTime: string;
  status: TStatus;
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
  useUpdateVisitors();
  useMixpanelTrack('view_index_page');

  return (
    <PostList
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

  const allPostsListData = allPosts
    .map((post) => ({
      category: post.category,
      order: post.order,
      title: post.title,
      dateTime: post.dateTime,
      status: post.status,
    }))
    .sort((a, b) => +new Date(b.dateTime) - +new Date(a.dateTime));
  // Dev와 Design 모든 리스트 보여줄 때 정렬하기.(컬렉션이 다르므로 Firestore에서 할 수 없음)
  // https://dkmqflx.github.io/frontend/2021/04/21/javascript-sortbydate/
  // 단항 연산자 (Unary operator)인 +를 new 앞에 추가
  // http://ccambo.github.io/Dev/Typescript/1.typescript-problem-solving-and-tips/

  return {
    props: {
      designPostListData,
      devPostListData,
      allPostsListData,
    },
  };
};
