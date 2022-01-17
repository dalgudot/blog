// import Article from '../../components/article/article';
import { getAllArticles } from '../../service/firebase/firestore-db';
import Link from 'next/link';

type Props = {
  props: {
    category: string;
    order: string;
  };
};

const Post = (props: Props) => {
  console.log('Post', props);
  return (
    <>
      {/* <Article /> */}
      <Link href='/'>
        <a>
          <h1>home</h1>
        </a>
      </Link>
    </>
  );
};

export default Post;

type Params = {
  params: {
    category: string;
    order: string;
  };
};

// This also gets called at build time
export const getStaticProps = async ({ params }: Params) => {
  // const posts = await getAllArticles();
  const category = params.category;
  const order = params.order;

  // Pass post data to the page via props
  return { props: { category, order } };
};

export const getStaticPaths = async () => {
  const posts = await getAllArticles();

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { category: post.category, order: post.order },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};
