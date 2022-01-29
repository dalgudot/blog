import { FC } from 'react';
import ReferenceBlockWYSIWYG from '../../components/post/reference/reference-block-wysiwyg';
import Article from '../../components/post/article/article';
import { IPostData } from '../../redux-toolkit/model/post-data-model';

type Props = {
  contentEditable: boolean;
  postData: IPostData;
};

const Post: FC<Props> = ({ contentEditable, postData }) => {
  return (
    <>
      <main>
        <Article
          contentEditable={contentEditable}
          title={postData.title}
          dateTime={postData.dateTime}
          status={postData.status}
        />
      </main>
      {/* <Contact /> */}
      {/* <Response /> */}
      {/* <ReferenceBlockWYSIWYG
        contentEditable={contentEditable}
        refDataArray={postData.refDataArray}
      /> */}
    </>
  );
};

export default Post;
