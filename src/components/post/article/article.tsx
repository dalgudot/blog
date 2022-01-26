import { FC, memo } from 'react';
import ArticleParagraphBlockWYSIWYG from './paragraph/article-paragraph-block-wysiwyg';
import ArticleTitleBlockWYSIWYG from './title/article-title-block-wysiwyg';

type Props = {
  contentEditable: boolean;
};

const Article: FC<Props> = ({ contentEditable }) => {
  return (
    <article>
      <ArticleTitleBlockWYSIWYG contentEditable={contentEditable} />
      <ArticleParagraphBlockWYSIWYG contentEditable={contentEditable} />
    </article>
  );
};

export default memo(Article);
