import React, { useState } from 'react';
import Block from './block';
import { INewBlockContent, NewBlockContent } from './Model';

const TextEditor: React.FC = () => {
  const newBlockContent: INewBlockContent = new NewBlockContent();
  const [blockContents, setBlockContents] = useState<INewBlockContent[]>([
    newBlockContent,
  ]);
  // 리액트에서 state를 업데이트할 때에는 항상 불변성을 지켜야 한다! 그러지 않으면 제대로 동작하지 않음.

  console.log(blockContents);

  return (
    <>
      {blockContents.map((content) => (
        <Block
          key={content.uuid}
          content={content}
          blockContents={blockContents}
          setBlockContents={setBlockContents}
        />
      ))}
    </>
  );
};

export default TextEditor;
