import { FC, memo } from 'react';
import LinkWYSIWYG from './reference/link-wysiwyg';
import Article from '../../components/post/article/article';
import { IPostData } from '../../redux-toolkit/model/post-data-model';
import styles from './post.module.scss';
import Response from './response/response';
import { useRouter } from 'next/router';
import Share from './share/share';
import Author from './author/author';
import { TTableOfContentsData } from '../navigation/table-of-contents/table-of-contents';
import Subscription from './subscription/subscription';

type Props = {
  contentEditable: boolean;
  postData: IPostData;
  tableOfContentsData?: TTableOfContentsData[];
};

const Post: FC<Props> = ({
  contentEditable,
  postData,
  tableOfContentsData,
}) => {
  const articleTitleWysiwygData = {
    title: postData.title,
    dateTime: postData.dateTime,
    status: postData.status,
  };

  const router = useRouter();
  const pathname = router.pathname;
  const isPublishedPost = pathname === '/[category]/[order]';
  const query = router.query;

  return (
    <>
      <main className={styles.post__main}>
        <Article
          contentEditable={contentEditable}
          articleTitleWysiwygData={articleTitleWysiwygData}
          wysiwygDataArray={postData.wysiwygDataArray}
          tableOfContentsData={tableOfContentsData}
        />
        {/* 3개의 박스가 정렬돼 있고, 호버하면 커지는 버튼 */}
        {/* <Share /> */}
        {isPublishedPost && <Response />}
        {/* <Subscription /> */}
        <Author />
        {query.category !== 'story' && (
          <LinkWYSIWYG
            contentEditable={contentEditable}
            linkWysiwygDataArray={postData.linkWysiwygDataArray}
          />
        )}
      </main>
    </>
  );
};

export default memo(Post);
