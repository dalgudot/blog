import { FC, memo } from 'react';
import ArticleParagraphBlockWYSIWYG from './paragraph/article-paragraph-block-wysiwyg';
import ArticleTitleBlockWYSIWYG from './title/article-title-block-wysiwyg';

type Props = {
  contentEditable: boolean;
  title: string;
  dateTime: string;
};

const Article: FC<Props> = ({ contentEditable, title, dateTime }) => {
  return (
    <article>
      <ArticleTitleBlockWYSIWYG
        contentEditable={contentEditable}
        title={title}
        dateTime={dateTime}
      />
      <ArticleParagraphBlockWYSIWYG contentEditable={contentEditable} />
    </article>
  );
};

export default memo(Article);
