import { ArticleContainer } from './article.style';
import BlockWYSIWYG from './block-wysiwyg/block-wysiwyg';

type Props = {
  contentEditable: boolean;
};

const Article: React.FC<Props> = ({ contentEditable }) => {
  return (
    <ArticleContainer>
      <h1>Article</h1>
      {/* <<BlockWYSIWYG />의 기본값 및 '최대 블럭수'를 정해서 제목 영역, 본문 영역, 레퍼런스 영역 총 3가지 만들기!  */}
      {/* 제목  <BlockWYSIWYG /> */}
      <BlockWYSIWYG contentEditable={contentEditable} />
      {/* 본문  <BlockWYSIWYG /> */}
      <BlockWYSIWYG contentEditable={contentEditable} />
      {/* 댓글은 다른 컴포넌트로 구성 */}
      {/* <Response /> */}
      <BlockWYSIWYG contentEditable={contentEditable} />
      {/* 레퍼런스  <BlockWYSIWYG /> */}
    </ArticleContainer>
  );
};

export default Article;
