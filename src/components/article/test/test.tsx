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
  const [text, setText] = useState('');
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
    // content를 e.target.innerText로 업데이트해줘야 함.

    // const tempBlockContents = [...blockContents];
    // tempBlockContents[currentIndex].text = e.target.innerText;
    // setBlockContents(tempBlockContents);
    // 새로 렌더링하니 커서가 맨 앞으로 이동하는 문제 발생

    // setText(e.target.innerText);
    // const isBacktick: boolean = e.target.innerText.includes('`');
    // let removeBacktick;
    // if (isBacktick) {
    //   removeBacktick = e.target.innerText.replace('`', '');
    //   innerText = removeBacktick;
    // } else {
    //   innerText = e.target.innerText;
    // }

    // innerText = e.target.innerText;
    // console.log('onInput', e.target.innerText);
    // prevText = e.target.innerText;
    const inputText = e.target.innerText;
    console.log('inputText', inputText);

    const countBacktick = inputText.match(/`/g)?.length;
    console.log('countBacktick', countBacktick);

    const includesBacktick: boolean = inputText.includes('`'); // e.key === '`' 이벤트 대체

    if (countBacktick === 2) {
      // console.log('` 입력', 'if (includesBacktick) 내부 inputText', inputText);

      // 첫 번째 `는 <code>로 두 번째 `는 </code>로!
      const firstBacktickToTag = inputText.replace('`', '<code>');
      const secondBacktickToTag = firstBacktickToTag.replace('`', '</code>');
      console.log('secondBacktickToTag', secondBacktickToTag);

      const tempBlockContents = [...blockContents];
      tempBlockContents[currentIndex].text = secondBacktickToTag;
      setBlockContents(tempBlockContents);
    }

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

    if (e.key === 'Enter') {
      e.preventDefault();
      blurBlock();
      addBlock();
    }

    if (e.key === '`' && innerText) {
      // `를 시작점으로 해서 `로 끝나면 코드 블럭으로 바꾸기
      // const range = document.createRange();

      console.log('입력 `', 'innerText', innerText);
      const currentText = `${innerText}\``;
      console.log('currentText', currentText);

      const checkAlreadyBacktick = (): boolean => {
        const isBacktick: boolean = innerText.includes('`');
        return isBacktick;
      };
      const isAlreadyBacktick = checkAlreadyBacktick();
      console.log('isAlreadyBacktick', isAlreadyBacktick);

      if (isAlreadyBacktick) {
        // 첫 번째 `는 <code>로 두 번째 `는 </code>로!
        const firstBacktickToTag = currentText.replace('`', '<code>');
        const secondBacktickToTag = firstBacktickToTag.replace('`', '</code>');
        console.log('secondBacktickToTag', secondBacktickToTag);

        const tempBlockContents = [...blockContents];
        tempBlockContents[currentIndex].text = secondBacktickToTag;
        setBlockContents(tempBlockContents);

        // setText(secondBacktickToTag);
        // 여기서만 업데이트해야 아래 useEffect(~, [text])가 정상 동작
      }
    }

    if (e.key === '`') {
      // console.log(prevText);
    }
  };

  // 최초 foucus 및
  // [blockContents]는 백틱 변환 이후 blockContents 변화 감지해 커서 강제 이동 위해 필요.
  useEffect(() => {
    // const removeBacktickInnerText = innerText?.replace(/\`/g, '');
    // console.log('in useEffect', removeBacktickInnerText);
    // 현재 셀렉션에서 ` 찾아서 제거!
    // <code></code> 밖으로 커서 이동
    // console.log('useEffect');
    ref.current && focusContentEditableTextToEnd(ref.current);
  }, [content.text]); // 리액트에서 텍스트 관리하기 위해 강제 이동
  // }, []);

  console.log('react-content.text', content.text);

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
        dangerouslySetInnerHTML={{ __html: content.text }}
        // dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content.text) }}
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
