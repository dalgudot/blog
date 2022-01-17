import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Article from '../../../components/article/article';
import { FireStoreDB } from '../../../service/firebase/firestore-db';
import { DocumentData } from 'firebase/firestore';
import Link from 'next/link';

type Props = {
  props: {
    category: string;
    order: string;
  };
};

const Post = (props: Props) => {
  // console.log(props);

  // const category = props.category;
  // const order = props.order;

  // console.log(props);

  // const router = useRouter();
  // if (!router.isFallback && !props) {
  //   return <ErrorPage statusCode={404} />;
  // }

  const router = useRouter();
  console.log(`render ${router.pathname}`);

  return (
    <>
      <Article />
      <Link href='/'>
        <a>
          <h1>home</h1>
        </a>
      </Link>
    </>
  );
};

export default Post;

// type Params = {
//   params: {
//     category: string;
//     order: string;
//   };
// };

// This also gets called at build time
export const getStaticProps = async ({ params }: any) => {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  // const res = await fetch(`https://.../posts/${params.id}`)
  // const post = await res.json()

  // const posts = await firestore.getAllPosts();
  const category = params.category;
  const order = params.order;

  // Pass post data to the page via props
  return { props: { category, order } };
};

const firestore = new FireStoreDB();

export const getStaticPaths = async () => {
  // Call an external API endpoint to get posts
  // const res = await fetch('https://.../posts');
  // const posts = await res.json();

  const posts = await firestore.getAllPosts();

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post: any) => ({
    params: { category: post.category, order: post.order },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};
