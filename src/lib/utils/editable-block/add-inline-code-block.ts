import {
  focusContentEditableTextToEnd,
  replaceCaret,
} from './../focus-content-editable-text-to-end';
import { MutableRefObject } from 'react';

export const addInlineCodeBlock = (
  inputHtml: string,
  setCurrentBlockTempPostHtmlData: (inputHtml: string) => void,
  setCurrentBlockPostHtmlData: (inputHtml: string) => void,
  eachBlockRef: MutableRefObject<any>
) => {
  const countBacktick = inputHtml.match(/`/g)?.length;
  const updateInlineBlock = (inputHtml: string) => {
    setCurrentBlockTempPostHtmlData(inputHtml);
    setCurrentBlockPostHtmlData(inputHtml);
  };

  // console.log('inputHtml', inputHtml);

  const firstBacktickPosition = inputHtml.indexOf('`');
  // console.log('firstBacktickPosition', firstBacktickPosition);
  const secoundBacktickPosition = inputHtml.indexOf(
    '`',
    firstBacktickPosition + 1
  );
  // console.log('secoundBacktickPosition', secoundBacktickPosition);

  const frontTag = '<code class="inline__code__block">';
  const backTag = '</code>\u00A0';
  const frontTagLength = frontTag.length;
  const backTagLength = backTag.length;

  if (countBacktick === 2) {
    const isContinuousBacktick: boolean = inputHtml.includes('``');

    if (isContinuousBacktick) {
      // 2개 연속(``)이면 빈 inline Code Block 생성
      const emptyCodeInlineBlock = inputHtml.replace(
        '``',
        `${frontTag}\u00A0${backTag}`
      );

      updateInlineBlock(emptyCodeInlineBlock);
    } else {
      // 첫 번째 `는 <code>로 두 번째 `는 </code>로!
      const addBacktick = inputHtml.replace('`', frontTag).replace(
        '`',
        backTag
        // (&nbsp;)로 코드 블럭 벗어나기
      );

      updateInlineBlock(addBacktick);
    }

    // console.log(eachBlockRef.current);

    // eachBlockRef.current = inputHtml
    //   .replace(/&lt;/g, '<')
    //   .replace(/&gt;/g, '>')
    //   .replace(/&amp;/g, '&')
    //   .split('');

    // console.log(eachBlockRef.current);
    // console.log('childNodes', eachBlockRef.current.childNodes);
    // console.log('childNodes.length', eachBlockRef.current.childNodes.length);

    // const nodeFromInputHtml = new DOMParser().parseFromString(
    //   inputHtml,
    //   'text/html'
    // );
    // console.log('nodeFromInputHtml', nodeFromInputHtml.body.childNodes);

    // target 노드가 어디인지 알아내면된다.
    // const selection = window.getSelection();

    // const codeList = eachBlockRef.current.querySelectorAll('code');
    // console.log('codeList', codeList);

    // const targetNode = eachBlockRef.current.childNodes[0];
    // console.log('targetNode', targetNode);

    // const newCaretPosition = secoundBacktickPosition;

    // const newRange = document.createRange();
    // newRange.setStart(targetNode, newCaretPosition);

    // selection && selection.removeAllRanges();
    // selection && selection.addRange(newRange);
  }
};
