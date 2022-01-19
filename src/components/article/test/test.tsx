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
  const currentIndex = blockContents.indexOf(content);
  const nextIndexBlock = blockContents[currentIndex + 1];

  const blurBlock = () => {
    ref.current?.blur();
  };

  const addBlock = () => {
    const block = new ArticleBlock();
    setBlockContents([...blockContents, block]);
  };

  const onInput = (e: ChangeEvent<HTMLParagraphElement>) => {
    // 리액트 상태와 dangerouslySetInnerHTML의 일치가 핵심
    const inputHtml = e.target.innerHTML;
    console.log('inputHtml', inputHtml);
    const countBacktick = inputHtml.match(/`/g)?.length; // ` 개수

    if (countBacktick === 2) {
      // 첫 번째 `는 <code>로 두 번째 `는 </code>로!
      const firstBacktickToTag = inputHtml.replace('`', '&nbsp<code>'); // &nbsp is for design
      const secondBacktickToTag = firstBacktickToTag.replace(
        '`',
        `</code>&nbsp` // &nbsp로 코드 블럭 벗어나기
      );

      const tempBlockContents = [...blockContents];
      tempBlockContents[currentIndex].text = secondBacktickToTag;
      setBlockContents(tempBlockContents);
    }
  };

  const onKeyPress = (e: KeyboardEvent<HTMLParagraphElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      blurBlock();
      addBlock();
    }
  };

  // 최초 foucus 및
  // [blockContents]는 백틱 변환 이후 blockContents 변화 감지해 커서 강제 이동 위해 필요.
  useEffect(() => {
    ref.current && focusContentEditableTextToEnd(ref.current);
  }, [content.text]);

  return (
    <>
      {/* XSS(Cross Site Scripting) 공격 방지하는 DOMPurify 라이브러리와 함께 사용 */}
      {/* https://pragmaticwebsecurity.com/articles/spasecurity/react-xss-part2.html */}
      {/* <button onClick={changeToBold}>선택 영역 볼드</button> */}
      <P
        id='text-editor'
        ref={ref}
        contentEditable={true}
        suppressContentEditableWarning={true}
        spellCheck={false}
        onInput={onInput}
        onKeyPress={onKeyPress}
        placeholder='placeholder'
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content.text) }}
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
