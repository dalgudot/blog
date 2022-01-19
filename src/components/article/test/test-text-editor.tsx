import React, { useState } from 'react';
import { useMounted } from '../../../lib/hooks/useMounted';
import { ArticleBlock, IArticleBlock } from '../models/article-block';
import ContentEditable from './test';

const TestTextEditor: React.FC = () => {
  const initialBlock = new ArticleBlock();
  const [blockContents, setBlockContents] = useState<IArticleBlock[]>([
    initialBlock,
  ]);

  const mounted: boolean = useMounted();
  // for dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content.text) }}
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
