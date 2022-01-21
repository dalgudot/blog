import { FC } from 'react';
import { ArticleLayout } from './article.style';
import BlockWYSIWYG from './block-wysiwyg/block-wysiwyg';

type Props = {
  contentEditable: boolean;
};

const Article: FC<Props> = ({ contentEditable }) => {
  return (
    <ArticleLayout>
      <h1>Article</h1>
      {/* <<BlockWYSIWYG />의 기본값 및 '최대 블럭수'를 정해서 제목 영역, 본문 영역, 레퍼런스 영역 총 3가지 만들기!  */}
      {/* 제목  <BlockWYSIWYG /> */}
      <BlockWYSIWYG contentEditable={contentEditable} />
      {/* 본문  <BlockWYSIWYG /> */}
      <BlockWYSIWYG contentEditable={contentEditable} />
    </ArticleLayout>
  );
};

export default Article;
