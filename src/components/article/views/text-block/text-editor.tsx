import React, { useState } from 'react';
import { useMounted } from '../../../../lib/hooks/useMounted';
import { ArticleBlock, IArticleBlock } from '../../models/article-block';
import TextBlock from './text-block';

const TextEditor: React.FC = () => {
  const initialBlock = new ArticleBlock();
  const [blockContents, setBlockContents] = useState<IArticleBlock[]>([
    initialBlock,
  ]);

  // for SSR
  const mounted: boolean = useMounted();
  // for dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content.text) }}
  // XSS(Cross Site Scripting) 공격 방지하는 DOMPurify 라이브러리와 함께 사용 */}
  // https://pragmaticwebsecurity.com/articles/spasecurity/react-xss-part2.html
  // console.log(blockContents);

  return (
    <>
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

export default TextEditor;

// https://happy-playboy.tistory.com/entry/ContentEditable%EC%97%90%EC%84%9C-%EC%BB%A4%EC%84%9CCaret-%ED%99%9C%EC%9A%A9%ED%95%98%EA%B8%B02-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8
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
