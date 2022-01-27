import { FC } from 'react';
import ReferenceBlockWYSIWYG from '../../components/post/reference/reference-block-wysiwyg';
import Article from '../../components/post/article/article';

type Props = {
  contentEditable: boolean;
  postData: any;
};

const Post: FC<Props> = ({ contentEditable, postData }) => {
  return (
    <>
      <main>
        <Article
          contentEditable={contentEditable}
          title={postData.title}
          dateTime='2022-01-25'
          publish={postData.publish}
        />
      </main>
      {/* <Contact /> */}
      {/* <Response /> */}
      <ReferenceBlockWYSIWYG
        contentEditable={contentEditable}
        refDataArray={postData.refDataArray}
      />
    </>
  );
};

export default Post;
