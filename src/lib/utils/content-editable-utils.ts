import DOMPurify from 'dompurify';
import { ChangeEvent } from 'react';

export const onInputChange = (
  e: ChangeEvent<HTMLHeadingElement | HTMLParagraphElement>,
  setTempData: (inputPureHtml: string) => void,
  updateInlineBlock: (inputPureHtml: string) => void
) => {
  // const inputPureHtml = DOMPurify.sanitize(e.target.innerHTML);
  const inputPureHtml = e.target.innerHTML;
  setTempData(inputPureHtml);

  const countBacktick = inputPureHtml.match(/`/g)?.length; // ` 개수
  if (countBacktick === 2) {
    addInlineCodeBlock(inputPureHtml, updateInlineBlock);
  }
};

const addInlineCodeBlock = (
  inputPureHtml: string,
  updateInlineBlock: (inputPureHtml: string) => void
) => {
  const isContinuousBacktick: boolean = inputPureHtml.includes('``');

  if (isContinuousBacktick) {
    // 2개 연속(``)이면 빈 inline Code Block 생성
    const emptyCodeInlineBlock = inputPureHtml.replace(
      '``',
      '&nbsp<code>&nbsp</code>&nbsp'
    );

    // 새로운 내용 전달 위해 전체 리렌더
    updateInlineBlock(emptyCodeInlineBlock);
  } else {
    // 첫 번째 `는 <code>로 두 번째 `는 </code>로!
    const firstBacktickToTag = inputPureHtml.replace('`', '&nbsp<code>'); // &nbsp is for design
    const secondBacktickToTag = firstBacktickToTag.replace(
      '`',
      `</code>&nbsp` // &nbsp로 코드 블럭 벗어나기
    );

    updateInlineBlock(secondBacktickToTag);
  }
};
