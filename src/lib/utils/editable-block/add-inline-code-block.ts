import { Dispatch, MutableRefObject, SetStateAction } from 'react';

export const addInlineCodeBlock = (
  updateDataWithInlineBlock: (inputHtml: string) => void,
  eachBlockRef: MutableRefObject<HTMLElement>,
  prevBackticCount: number,
  setPrevBackticCount: Dispatch<SetStateAction<number>>
) => {
  const frontTag = '<code class="inline__code__block">';
  const backTag = '</code>\u00A0';

  const eachBlockChildNodes: NodeListOf<ChildNode> =
    eachBlockRef.current.childNodes;
  const eachBlockChildNodesLength: number = eachBlockChildNodes.length;
  // console.log('eachBlockChildNodes', eachBlockChildNodes);

  const getNodeArray = () => {
    let nodeArray: {
      nodeName: '#text' | 'CODE';
      textContent: string | null | undefined;
    }[] = [];

    // 아무런 텍스트도 없는 노드일 경우(eachBlockRef.current.childNodes)
    if (eachBlockChildNodesLength === 0) {
      // 아무런 노드도 없는 경우 array 및 length 초기화
      nodeArray = [
        {
          nodeName: '#text',
          textContent: '',
        },
      ];
    } else {
      for (let i = 0; i < eachBlockChildNodesLength; i++) {
        nodeArray.push({
          nodeName: eachBlockChildNodes[i].nodeName as '#text' | 'CODE',
          textContent: eachBlockChildNodes[i].textContent,
        }); // nodeValue 대신 TextContent로 해야, <code></code> 안의 텍스트 가져옴
      }
    }

    return nodeArray;
  };
  const nodeArray = getNodeArray();

  // console.log('nodeArray', nodeArray);

  const getNewNodesWithInlineCodeHtml = () => {
    let twoBacktickNodeIndex: number | null = null;

    for (let i = 0; i < eachBlockChildNodesLength; i++) {
      //
      if (eachBlockChildNodes[i].nodeName === '#text') {
        const textContent = eachBlockChildNodes[i].textContent;
        const isContinuousBacktick: boolean | undefined =
          textContent?.includes('``');
        const numberOfBacktick: number = textContent?.match(/`/g)?.length ?? 0;
        console.log('numberOfBacktick', i, numberOfBacktick);
        // console.log('prevBackticCount', prevBackticCount);

        if (numberOfBacktick === 2 && numberOfBacktick > prevBackticCount) {
          console.log('동작');

          if (isContinuousBacktick) {
            twoBacktickNodeIndex = i;
            // 2개 연속(``)이면 빈 inline Code Block 생성
            nodeArray[i].textContent = textContent?.replace(
              '``',
              `${frontTag}\u00A0${backTag}`
            );
          } else {
            twoBacktickNodeIndex = i;
            // 첫 번째 `는 <code>로 두 번째 `는 </code>로!
            nodeArray[i].textContent = textContent
              ?.replace('`', frontTag)
              .replace(
                '`',
                backTag
                // (&nbsp;)로 코드 블럭 벗어나기
              );
          }
          setPrevBackticCount(0); // 코드가 실행된 뒤에는 0이 돼야 함.
        } else {
          setPrevBackticCount(numberOfBacktick);
        }
      }
    }

    return twoBacktickNodeIndex;
  };

  const twoBacktickNodeIndex = getNewNodesWithInlineCodeHtml();

  if (twoBacktickNodeIndex !== null) {
    const getNewHtml = () => {
      let newHtml: string = '';

      for (let i = 0; i < eachBlockChildNodesLength; i++) {
        if (nodeArray[i].nodeName === '#text') {
          newHtml = `${newHtml}${nodeArray[i].textContent}`;
          // console.log('for', '#text', newHtml);
        }

        if (nodeArray[i].nodeName === 'CODE') {
          newHtml = `${newHtml}${frontTag}${
            nodeArray[i].textContent
          }${backTag.replace(/\u00A0/, '')}`;
          // console.log('for', 'CODE', newHtml);
        }
      }

      return newHtml;
    };

    const newHtml = getNewHtml();

    // console.log('newHtml', newHtml);

    updateDataWithInlineBlock(newHtml);

    return twoBacktickNodeIndex; // null이면 코드 변환이 되지 않음.
  }
};
