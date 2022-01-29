import { FC, memo } from 'react';
import { TStatus } from '../../../redux-toolkit/model/post-data-model';
import ArticleParagraphBlockWYSIWYG from './paragraph/article-paragraph-block-wysiwyg';
import ArticleTitleBlockWYSIWYG from './title/article-title-block-wysiwyg';

type Props = {
  contentEditable: boolean;
  title: string;
  dateTime: string;
  status: TStatus;
};

const Article: FC<Props> = ({ contentEditable, title, dateTime, status }) => {
  return (
    <article>
      <ArticleTitleBlockWYSIWYG
        contentEditable={contentEditable}
        title={title}
        dateTime={dateTime}
        status={status}
      />
      {/* <ArticleParagraphBlockWYSIWYG contentEditable={contentEditable} /> */}
    </article>
  );
};

export default memo(Article);
