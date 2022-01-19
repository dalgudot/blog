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

// const changeToBold = () => {
//   const selection = window.getSelection();
//   const range = selection?.getRangeAt(0);

//   const start = range?.startOffset as number;
//   const end = range?.endOffset as number;
//   const textArray = text.split('');

//   console.log('start', start);
//   console.log('end', end);
//   console.log('textArray', textArray);

//   textArray.splice(start, 0, '<b>');
//   textArray.splice(end + 1, 0, '</b>');

//   const final = textArray.join('');

//   console.log(final);

//   const tempBlockContents = [...blockContents];
//   tempBlockContents[currentIndex].text = final;
//   console.log('tempBlockContents', tempBlockContents);

//   setBlockContents(tempBlockContents);

//   setText(final);
//   ref.current && replaceCaret(ref.current);
// };

////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

// const currentIndex = blockContents.indexOf(content);
// const nextIndexBlock = blockContents[currentIndex + 1];

//       let startPosition: number | undefined = undefined;

// const selection = window.getSelection();
// const range = selection?.getRangeAt(0);
// const position = range?.startOffset;
// // console.log('position', position);
// // console.log(startPosition);

// // if (startPosition === undefined) {
// //   startPosition = position;
// //   console.log(position);
// // } else {
// const endPosition = position as number;

// // const textArray = text.split('');
// // console.log('textArray', textArray);

// // textArray.splice(startPosition, 1, '<code>');
// // textArray.splice(endPosition, 1, '</code>');

// // console.log(textArray);
// // const final = textArray.join('');

// console.log('innerText', innerText);

// // 불변성?
// const first = text.replace('`', '<code>');
// console.log('text', text);
// console.log('first', first);

// const final = first.replace('`', '</code>');
// console.log('text', text);
// console.log('final', final);

// const tempBlockContents = [...blockContents];
// tempBlockContents[currentIndex].text = final;
// setBlockContents(tempBlockContents);

// setText(final);
// startPosition = undefined;
// }
