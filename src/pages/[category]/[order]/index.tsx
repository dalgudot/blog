import Post from '../../../components/post/post';
import { getAllArticles } from '../../../service/firebase/firestore-db';
import { InferGetStaticPropsType, NextPage } from 'next';
import { useIsAdmin } from '../../../lib/hooks/useIsAdmin';
import BlockWYSIWYG from '../../../components/post/block-wysiwyg/block-wysiwyg';
import Response from '../../../components/post/response/response';
import Reference from '../../../components/post/reference/reference';

const CategoryOrderPost: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
  const { isAdmin } = useIsAdmin();
  const contentEditable: boolean = isAdmin;
  // CRUD
  // 올린 후 '수정' 기능
  // 올리기 전 '저장', '게시'

  return (
    <>
      <main>
        <Post contentEditable={contentEditable} />
      </main>
      <Response />
      <Reference />
    </>
  );
};

export default CategoryOrderPost;

type Params = {
  params: {
    category: string;
    order: string;
  };
};

// https://yceffort.kr/2020/03/nextjs-02-data-fetching
// [API Docs] yarn dev(next dev)에서는 매번 호출!
// GitHub repo에서 Vercel 프론트 서버로 푸시한 뒤에 하는 '빌드'에서만 호출! -> 사용자는 파이어스토어 호출하지 않음.
// This also gets called at build time
export const getStaticProps = async ({ params }: Params) => {
  // const posts = await getAllArticles();
  const category = params.category;
  const order = params.order;

  return { props: { category, order } };
};

export const getStaticPaths = async () => {
  const posts = await getAllArticles();

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { category: post.category, order: String(post.order) }, // number -> string,
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};
