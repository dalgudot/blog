import DOMPurify from 'dompurify';
import React, { useState } from 'react';
import { useMounted } from '../../../lib/hooks/useMounted';
import { uuid } from '../../../lib/utils/id';
import { ArticleBlock, IArticleBlock } from '../models/article-block';
import ContentEditable from './test';

const TestTextEditor: React.FC = () => {
  const initialBlock = new ArticleBlock();
  const [blockContents, setBlockContents] = useState<IArticleBlock[]>([
    initialBlock,
  ]);

  const mounted: boolean = useMounted(); // for DomPurify

  // console.log(blockContents);

  return (
    <>
      {mounted &&
        blockContents.map((content, idx) => (
          <ContentEditable
            key={idx}
            blockId={content.id}
            content={content}
            blockContents={blockContents}
            setBlockContents={setBlockContents}
          />
        ))}
    </>
  );
};

export default TestTextEditor;

// const currentIndex = blockContents.indexOf(content);
// const nextIndexBlock = blockContents[currentIndex + 1];
