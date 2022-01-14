import React, { useState } from 'react';
import Block from './block';
import { tid } from './../../lib/utils/tid';

export type TnewBlockContent = {
  tid: string;
  tagName: textTagName;
  // text: string;
};

const newBlockContent: TnewBlockContent = {
  tid: tid(),
  tagName: 'p',
};

const TextEditor: React.FC = () => {
  const [blockContents, setBlockContents] = useState([newBlockContent]);

  console.log(newBlockContent);

  const handleBlock = (e: React.KeyboardEvent<HTMLParagraphElement>) => {
    if (e.key === 'Enter') {
      // e.preventDefault();
      console.log('Enter');
      setBlockContents((prev) => [...prev, newBlockContent]);
    }
  };

  return (
    <>
      {blockContents.map((content, idx) => (
        <Block key={idx} content={content} handleBlock={handleBlock} />
      ))}
    </>
  );
};

export default TextEditor;

// if (e.key === 'Backspace') {
//   console.log('Backspace');
//   setBlockContents((prev) => [...prev, newBlockContent]);
// }

// const focusBlock = () => {
//   const textArea = textAreaRef.current;

//   if (textArea) {
//     textArea.value = ''; //clear the value of the element
//     textArea.value = text; //set that value back.
//     textArea.focus();
//   }
// };

// How can I determine the type of an HTML element in JavaScript?
// https://stackoverflow.com/questions/254302/how-can-i-determine-the-type-of-an-html-element-in-javascript
