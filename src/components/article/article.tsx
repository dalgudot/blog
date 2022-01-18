import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Article: React.FC = () => {
  // const router = useRouter();
  // const { category, order } = router.query;
  // // 현재 category와 order에 맞는 데이터를 DB에서 받아옴!

  // const [orderState, setOrderState] = useState<string | string[]>();

  // useEffect(() => {

  //   if (order) {
  //     setOrderState(order[0]);
  //   }
  // }, [router.query]);

  // console.log(orderState);

  // category와 orderState에 따라 서버에서 가져오는 데이터 달라짐.

  return (
    <ArticleContainer>
      <h1>Article</h1>
    </ArticleContainer>
  );
};

export default Article;

const ArticleContainer = styled.article``;
