import { useRouter } from 'next/router';
import styled from 'styled-components';

const Article: React.FC = () => {
  const router = useRouter();
  const { category, order } = router.query;
  // 현재 category와 order에 맞는 데이터를 DB에서 받아옴!

  console.log(category, order);

  return (
    <ArticleContainer>
      <h1>Article</h1>
    </ArticleContainer>
  );
};

export default Article;

const ArticleContainer = styled.article``;
