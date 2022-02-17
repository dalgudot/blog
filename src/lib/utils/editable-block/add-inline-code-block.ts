import { MutableRefObject } from 'react';
import { getNewHtml, getNodeArray } from './node';

export const frontTag = '<code class="inline__code__block">';
export const backTag = '</code>\u00A0';

export const addInlineCodeBlock = (
  eachBlockRef: MutableRefObject<HTMLElement>,
  updateDataWithInlineBlock: (inputHtml: string) => void
) => {
  const eachBlockChildNodes: NodeListOf<ChildNode> =
    eachBlockRef.current.childNodes;
  const eachBlockChildNodesLength: number = eachBlockChildNodes.length;
  const nodeArray = getNodeArray(eachBlockChildNodes);

  const getNewNodesWithInlineCodeHtml = () => {
    let twoBacktickNodeIndex: number | null = null;

    for (let i = 0; i < eachBlockChildNodesLength; i++) {
      //
      if (eachBlockChildNodes[i].nodeName === '#text') {
        const textContent = eachBlockChildNodes[i].textContent;
        const isContinuousBacktick: boolean | undefined =
          textContent?.includes('``');
        const numberOfBacktick: number = textContent?.match(/`/g)?.length ?? 0;

        if (numberOfBacktick === 2) {
          //
          if (isContinuousBacktick) {
            twoBacktickNodeIndex = i;
            // 2개 연속(``)이면 빈 inline Code Block 생성
            nodeArray[i].textContent = textContent?.replace(
              '``',
              `${frontTag}\u00A0${backTag}`
            );
          }
          //
          else {
            twoBacktickNodeIndex = i;
            // 첫 번째 `는 <code>로 두 번째 `는 </code>로!
            nodeArray[i].textContent = textContent
              ?.replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace('`', frontTag)
              .replace('`', backTag);
          }
        }
      }
    }

    return twoBacktickNodeIndex;
  };

  const twoBacktickNodeIndex = getNewNodesWithInlineCodeHtml();

  if (twoBacktickNodeIndex !== null) {
    const newHtml = getNewHtml(nodeArray);
    updateDataWithInlineBlock(newHtml);

    return twoBacktickNodeIndex; // null이면 코드 변환이 되지 않음.
  }
};
