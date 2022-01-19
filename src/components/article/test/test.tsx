import DOMPurify from 'dompurify';
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ArticleBlock, IArticleBlock } from '../models/article-block';

let innerText: string;
let prevText: string;

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
  // const [inputTextIncludedHTML, setInputTextIncludedHTML] = useState('');
  const [prevInputText, setPrevInputText] = useState('');
  const [prevInputTextIncludedHTML, setPrevInputTextIncludedHTML] =
    useState('');
  const currentIndex = blockContents.indexOf(content);
  const nextIndexBlock = blockContents[currentIndex + 1];

  const pureHtmlContent = DOMPurify.sanitize(content.text);
  // console.log(pureHtmlContent);

  const blurBlock = () => {
    ref.current?.blur();
  };

  const addBlock = () => {
    const block = new ArticleBlock();
    setBlockContents([...blockContents, block]);
  };

  const onInput = (e: ChangeEvent<HTMLParagraphElement>) => {
    // 리액트가 dangerouslySetInnerHTML을 관리할 수 있는 방법을 구현해야 함.
    // const inputText = e.target.innerText;
    const inputHtml = e.target.innerHTML;
    // setPrevInputText(inputText);

    // console.log('inputText', inputText);
    console.log('inputHtml', inputHtml);
    // console.log('content.text', content.text);

    const countBacktick = inputHtml.match(/`/g)?.length; // ` 개수
    // console.log('countBacktick', countBacktick);

    // 마치 리액트가 관리하는 것처럼 만들어줘야 함
    // key 이벤트가 아닌 onInput에서 처리해줘야 리액트와 렌더링 순서 일치
    if (countBacktick === 2) {
      // e.target.innerText = '';
      // console.log(e.target.innerHTML);
      console.log('countBacktick === 2');
      // 문제: onInput은 태그 정보를 가지고 있지 않다.
      // console.log(prevInputTextIncludedHTML);

      // console.log('content.text', content.text);
      // const currentText = prevInputTextIncludedHTML + '`';

      // 첫 번째 `는 <code>로 두 번째 `는 </code>로!
      const firstBacktickToTag = inputHtml.replace('`', '&nbsp<code>'); // &nbsp is for design
      const secondBacktickToTag = firstBacktickToTag.replace(
        '`',
        `</code>&nbsp` // &nbsp로 코드 블럭 벗어나기
      );
      // console.log('secondBacktickToTag', secondBacktickToTag);

      const tempBlockContents = [...blockContents];
      tempBlockContents[currentIndex].text = secondBacktickToTag;
      setBlockContents(tempBlockContents);

      // setPrevInputTextIncludedHTML(tempBlockContents[currentIndex].text);
    }
    // else {
    //   const lastWord = inputHtml.replace(prevInputText, ''); // Input의 텍스트 비교로 lastWord 만듦, prevInputText는 리액트가 관리해 여기서는 이전 상태
    //   console.log('lastWord', lastWord);

    //   setPrevInputTextIncludedHTML(prevInputTextIncludedHTML + lastWord); // 리액트로 렌더링은 안 함. HTML 코드 포함돼 있지만, Input과 동기화된 상태.
    // }

    ////////////////////////////////////////////
    // else {
    //   const lastWord = inputText.replace(prevInputText, '');
    //   console.log('lastWord', lastWord);

    //   const tempBlockContents = [...blockContents];
    //   tempBlockContents[currentIndex].text += lastWord;
    //   setBlockContents(tempBlockContents);

    //   setPrevInputText(tempBlockContents[currentIndex].text);

    // }
    // onIput에 '새롭게 추가되는 문자열'만 content 뒤쪽에 계속 업데이트
    // 1) 현재 들어온 inputText에서 prevInputText(-> 이 컴포넌트의 useState 활용!)의 모든 텍스트 제거한 뒤
    // 2) content 뒤쪽에 추가시켜줌.

    // const tempBlockContents = [...blockContents];
    // tempBlockContents[currentIndex].text = e.target.innerText;
    // setBlockContents(tempBlockContents);
    // console.log(text);
    // console.log(innerText);
    // 각 컴포넌트에서 업데이트 사항을 저장만 해두고,
    // '블럭이 바뀌는' 시점에 위 코드를 이용해 부모의 blockContents 업데이트!
  };

  // const [startPosition, setStartPosition] = useState<number>();
  const onKeyPress = (e: KeyboardEvent<HTMLParagraphElement>) => {
    // console.log(e);
    // console.log('e.key', e.key);

    if (e.key === 'Enter') {
      e.preventDefault();
      blurBlock();
      addBlock();
    }

    if (e.key === '`') {
      // 순서상 onInput에서 처리해줘야 리액트와 렌더링 순서 일치
      // console.log(prevText);
    }
  };

  // 최초 foucus 및
  // [blockContents]는 백틱 변환 이후 blockContents 변화 감지해 커서 강제 이동 위해 필요.
  useEffect(() => {
    // console.log('useEffect');
    ref.current && focusContentEditableTextToEnd(ref.current);
  }, [content.text]);

  // console.log('prevInputText', prevInputText);
  // console.log('react-content.text', content.text);

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
