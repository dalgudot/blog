import DOMPurify from 'dompurify';
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { ArticleBlock, IArticleBlock } from '../../../models/article-block';
import styles from './paragraph-block.module.scss';

const ParagraphBlock = ({
  content,
  blockContents,
  setBlockContents,
}: {
  content: IArticleBlock;
  blockContents: IArticleBlock[];
  setBlockContents: React.Dispatch<React.SetStateAction<IArticleBlock[]>>;
}) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const currentIndex = blockContents.indexOf(content);
  const nextIndexBlock = blockContents[currentIndex + 1];
  const [text, setText] = useState(''); // addBlock()에서 활용 위해

  // [blockContents]는 백틱 변환 이후 blockContents 변화 감지해 커서 강제 이동 위해 필요.
  useEffect(() => {
    ref.current && replaceCaret(ref.current);
    // 새로 렌더링된 후 caret위치를 caretPosition 이용해서 블록 뒤로 보내기(전체 텍스트 중간의 문자열을 `` 선택 시에도 정상적으로 작동하도록 대비)
  }, [content.text]);

  // 최초 foucus
  // useEffect(() => {
  //   ref.current && ref.current.focus();
  // }, []);

  const blurBlock = () => {
    ref.current?.blur();
  };

  const onInput = (e: ChangeEvent<HTMLParagraphElement>) => {
    // console.log('input');
    // 리액트 상태와 dangerouslySetInnerHTML의 일치가 핵심
    const inputHtml = e.target.innerHTML;
    setText(inputHtml); // addBlock()에서 활용 위해
    // console.log('inputHtml', inputHtml);

    const countBacktick = inputHtml.match(/`/g)?.length; // ` 개수
    if (countBacktick === 2) {
      addInlineCodeBlock(inputHtml);
    }
  };

  const addBlock = () => {
    const block = new ArticleBlock();
    const isEnd = currentIndex === blockContents.length - 1;

    if (isEnd) {
      console.log('isEnd');
      setBlockContents([...blockContents, block]);
    } else {
      const copyBlockContents = [...blockContents];
      copyBlockContents.splice(currentIndex + 1, 0, block);
      console.log(copyBlockContents);
      setBlockContents(copyBlockContents);
    }
  };

  const addInlineCodeBlock = (inputHtml: string) => {
    const isContinuousBacktick: boolean = inputHtml.includes('``');

    if (isContinuousBacktick) {
      // 2개 연속(``)이면 빈 Block으로 생성
      const emptyCodeInlineBlock = inputHtml.replace(
        '``',
        '&nbsp<code>&nbsp</code>&nbsp'
      );

      const tempBlockContents = [...blockContents];
      tempBlockContents[currentIndex].text = emptyCodeInlineBlock;
      setBlockContents(tempBlockContents);
    } else {
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

  // const onKeyDown = (e: KeyboardEvent<HTMLParagraphElement>) => {
  //   if (text === '' && e.key === 'Backspace') {
  //     e.preventDefault();
  //     removeBlock();
  //   }
  // };

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

  return (
    <>
      {/* <button onClick={changeToBold}>선택 영역 볼드</button> */}
      <p
        className={styles.paragraph}
        ref={ref}
        contentEditable={true}
        suppressContentEditableWarning={true}
        spellCheck={false}
        onInput={onInput}
        onKeyPress={onKeyPress}
        // onKeyDown={onKeyDown}
        placeholder='placeholder'
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content.text) }}
      />
    </>
  );
};

export default ParagraphBlock;

function replaceCaret(element: HTMLElement) {
  if (element.innerText.length === 0) {
    element.focus();

    return;
  }

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
