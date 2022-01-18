import DOMPurify from 'dompurify';
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ArticleBlock, IArticleBlock } from '../models/article-block';

const ContentEditable = ({
  blockId,
  content,
  blockContents,
  setBlockContents,
}: {
  blockId: string;
  content: IArticleBlock;
  blockContents: IArticleBlock[];
  setBlockContents: React.Dispatch<React.SetStateAction<IArticleBlock[]>>;
}) => {
  const ref = useRef<HTMLParagraphElement | null>(null);
  const [text, setText] = useState('');
  const currentIndex = blockContents.indexOf(content);
  const nextIndexBlock = blockContents[currentIndex + 1];

  const onInput = (e: ChangeEvent<HTMLParagraphElement>) => {
    // 리액트가 dangerouslySetInnerHTML을 관리할 수 있는 방법을 구현해야 함.
    // content를 e.target.innerText로 업데이트해줘야 함.

    // const tempBlockContents = [...blockContents];
    // tempBlockContents[currentIndex].text = e.target.innerText;
    // setBlockContents(tempBlockContents);
    // 새로 렌더링하니 커서가 맨 앞으로 이동하는 문제 발생

    setText(e.target.innerText);
    // 각 컴포넌트에서 업데이트 사항을 저장만 해두고,
    // '블럭이 바뀌는' 시점에 위 코드를 이용해 부모의 blockContents 업데이트!
  };

  const pureHtmlContent = DOMPurify.sanitize(content.text);
  // console.log(pureHtmlContent);

  useEffect(() => {
    if (ref.current) {
      // ref.current.focus();
      focusContentEditableTextToEnd(ref.current);
    }
  }, []);

  const blurBlock = () => {
    ref.current?.blur();
  };

  const addBlock = () => {
    const block = new ArticleBlock();
    setBlockContents([...blockContents, block]);
  };

  const [startPosition, setStartPosition] = useState<number>();
  const onKeyPress = (e: KeyboardEvent<HTMLParagraphElement>) => {
    // console.log(e);

    if (e.key === 'Enter') {
      e.preventDefault();
      blurBlock();
      addBlock();
    }

    if (e.key === '`') {
      // `를 시작점으로 해서 `로 끝나면 코드 블럭으로 바꾸기
      // const range = document.createRange();

      const selection = window.getSelection();
      const range = selection?.getRangeAt(0);
      const position = range?.startOffset;

      if (startPosition === undefined) {
        setStartPosition(position);
        console.log(position);
      } else {
        const endPosition = position as number;
        const textArray = text.split('');
        console.log('textArray', textArray);

        textArray.splice(startPosition, 1, '<code>');
        textArray.splice(endPosition, 1, '</code>');

        console.log(textArray);

        const final = textArray.join('');

        console.log('final', final);

        const tempBlockContents = [...blockContents];
        tempBlockContents[currentIndex].text = final;
        setBlockContents(tempBlockContents);

        setText(final);
        setStartPosition(undefined);
      }
    }
  };

  const changeToBold = () => {
    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);

    const start = range?.startOffset as number;
    const end = range?.endOffset as number;
    const textArray = text.split('');

    console.log('start', start);
    console.log('end', end);
    console.log('textArray', textArray);

    textArray.splice(start, 0, '<b>');
    textArray.splice(end + 1, 0, '</b>');

    const final = textArray.join('');

    console.log(final);

    const tempBlockContents = [...blockContents];
    tempBlockContents[currentIndex].text = final;
    console.log('tempBlockContents', tempBlockContents);

    setBlockContents(tempBlockContents);

    setText(final);
  };

  return (
    <>
      {/* XSS(Cross Site Scripting) 공격 방지하는 DOMPurify 라이브러리와 함께 사용 */}
      {/* https://pragmaticwebsecurity.com/articles/spasecurity/react-xss-part2.html */}
      <button onClick={changeToBold}>선택 영역 볼드</button>
      <P
        id='text-editor'
        ref={ref}
        contentEditable={true}
        suppressContentEditableWarning={true}
        spellCheck={false}
        onInput={onInput}
        onKeyPress={onKeyPress}
        placeholder='placeholder'
        dangerouslySetInnerHTML={{ __html: pureHtmlContent }}
      />
    </>
  );
};

export default ContentEditable;

const P = styled.p`
  width: 100vw;
  height: 100%;
  border: 1px solid whitesmoke;

  /* Text */
  caret-color: whitesmoke;
  color: whitesmoke;
  font-weight: 400;
  line-height: 1.4;
  font-size: 36px;
  /* Text */

  // placeholder
  &:empty:before {
    content: attr(placeholder);
    color: grey;
    display: inline-block;
  }
`;

function replaceCaret(element: HTMLElement) {
  // Place the caret at the end of the element
  const target = document.createTextNode('');
  element.appendChild(target);
  // do not move caret if element was not focused
  const isTargetFocused = document.activeElement === element;
  if (target !== null && target.nodeValue !== null && isTargetFocused) {
    const selection = window.getSelection();

    if (selection !== null) {
      const range = document.createRange();
      range.setStart(target, target.nodeValue.length);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    }

    if (element instanceof HTMLElement) element.focus();
  }
}

const focusContentEditableTextToEnd = (element: HTMLElement) => {
  if (element.innerText.length === 0) {
    element.focus();

    return;
  }

  const selection = window.getSelection();

  const newRange = document.createRange();
  newRange.selectNodeContents(element);
  newRange.collapse(false);
  selection?.removeAllRanges();
  selection?.addRange(newRange);
};
