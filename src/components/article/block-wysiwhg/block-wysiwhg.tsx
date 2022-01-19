import React, { useState } from 'react';
import { useMounted } from '../../../lib/hooks/useMounted';
import { ArticleBlock, IArticleBlock } from '../models/article-block';
import Blocks from './blocks/blocks';
import TextBlock from './blocks/paragraph-block/paragraph-block';

type Props = {
  contentEditable: boolean;
};

const BlockWYSIWYG: React.FC<Props> = ({ contentEditable }) => {
  const initialBlock = new ArticleBlock();
  const [blockContents, setBlockContents] = useState<IArticleBlock[]>([
    initialBlock,
  ]);

  const mounted: boolean = useMounted();
  // console.log(blockContents);

  // 모든 블럭(본문 블럭, 코드 블럭)의 switching을 담당하는 <Blocks /> component의 map을 돌린다!

  return (
    <>
      <Blocks />
      {mounted &&
        blockContents.map((content, idx) => (
          <TextBlock
            key={idx}
            content={content}
            blockContents={blockContents}
            setBlockContents={setBlockContents}
          />
        ))}
    </>
  );
};

export default BlockWYSIWYG;
