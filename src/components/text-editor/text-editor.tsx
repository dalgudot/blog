import React, { useState } from 'react';
import Block from './block';
import { INewBlockContent, NewBlockContent } from './Model';

const TextEditor: React.FC = () => {
  const newBlockContent: INewBlockContent = new NewBlockContent();
  const [blockContents, setBlockContents] = useState<INewBlockContent[]>([
    newBlockContent,
  ]);

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
