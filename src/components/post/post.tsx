import { FC, memo } from 'react';
import LinkWYSIWYG from './reference/link-wysiwyg';
import Article from '../../components/post/article/article';
import { IPostData } from '../../redux-toolkit/model/post-data-model';
import styles from './post.module.scss';
import Response from './response/response';

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
      <main className={styles.main}>
        <Article
          contentEditable={contentEditable}
          articleTitleWysiwygData={articleTitleWysiwygData}
          wysiwygDataArray={postData.wysiwygDataArray}
        />
        <Response />
        <LinkWYSIWYG
          contentEditable={contentEditable}
          linkWysiwygDataArray={postData.linkWysiwygDataArray}
        />
      </main>
    </>
  );
};

export default memo(Post);
