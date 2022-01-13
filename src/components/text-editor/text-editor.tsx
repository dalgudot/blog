import React, { useState } from 'react';
import Block from './block';
import { newBlockContent } from './Model';

const TextEditor: React.FC = () => {
  const [blockContents, setBlockContents] = useState([newBlockContent]);

  const handleBlock = (e: React.KeyboardEvent<HTMLParagraphElement>) => {
    // e.preventDefault();

    if (e.key === 'Enter') {
      console.log('Enter');
      setBlockContents((prev) => [...prev, newBlockContent]);
    }

    // if (e.key === 'Backspace') {
    //   console.log('Backspace');
    //   setBlockContents((prev) => [...prev, newBlockContent]);
    // }
  };

  return (
    <>
      {blockContents.map((content, idx) => (
        <Block key={idx} tagName={content.tagName} handleBlock={handleBlock} />
      ))}
    </>
  );
};

export default TextEditor;

// How can I determine the type of an HTML element in JavaScript?
// https://stackoverflow.com/questions/254302/how-can-i-determine-the-type-of-an-html-element-in-javascript
