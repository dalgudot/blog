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
import Sponsor from './sponsor/sponsor';
import { useMixpanelTrack } from '../../lib/hooks/useMixpanelTrack';

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

  // 2023.03.18 Mount 이후 <Post />가 렌더링되기 때문에 여기서 이벤트를 수집해야 property인 post_title이 수집된다.
  useMixpanelTrack(`view_${router.asPath}_page`, {
    post_title: postData.title,
  });

  // 2023.09.16 Funnel 관찰 위해 하나의 이벤트로 수집
  useMixpanelTrack(`view_post`, {
    post_title: postData.title,
  });

  return (
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

      <Author />

      {query.category == 'dev' && <Sponsor />}

      <Subscription />
      {query.category !== 'story' && (
        <LinkWYSIWYG
          contentEditable={contentEditable}
          linkWysiwygDataArray={postData.linkWysiwygDataArray}
        />
      )}
    </main>
  );
};

export default memo(Post);
