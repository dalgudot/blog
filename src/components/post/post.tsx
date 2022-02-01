import { FC, memo } from 'react';
import LinkWYSIWYG from './reference/link-wysiwyg';
import Article from '../../components/post/article/article';
import { IPostData } from '../../redux-toolkit/model/post-data-model';

type Props = {
  contentEditable: boolean;
  postData: IPostData;
};

const Post: FC<Props> = ({ contentEditable, postData }) => {
  const articleTitleWysiwygData = {
    title: postData.title,
    dateTime: postData.dateTime,
    status: postData.status,
  };

  return (
    <>
      <main>
        <Article
          contentEditable={contentEditable}
          articleTitleWysiwygData={articleTitleWysiwygData}
          wysiwygDataArray={postData.wysiwygDataArray}
        />
      </main>
      {/* <Contact /> */}
      {/* <Response /> */}
      <LinkWYSIWYG
        contentEditable={contentEditable}
        linkWysiwygDataArray={postData.linkWysiwygDataArray}
      />
    </>
  );
};

export default memo(Post);
