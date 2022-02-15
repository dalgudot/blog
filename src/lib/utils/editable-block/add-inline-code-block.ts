import { MutableRefObject } from 'react';

export const addInlineCodeBlock = (
  updateDataWithInlineBlock: (inputHtml: string) => void,
  eachBlockRef: MutableRefObject<HTMLElement>
) => {
  const frontTag = '<code class="inline__code__block">';
  const backTag = '</code>\u00A0';

  const eachBlockChildNodes: NodeListOf<ChildNode> =
    eachBlockRef.current.childNodes;
  const eachBlockChildNodesLength: number = eachBlockChildNodes.length;
  // console.log('eachBlockChildNodes', eachBlockChildNodes);

  const getMyNodeArray = () => {
    let myNodeArray: {
      nodeName: '#text' | 'CODE';
      textContent: string | null | undefined;
    }[] = [];

    // 아무런 텍스트도 없는 노드일 경우(eachBlockRef.current.childNodes)
    if (eachBlockChildNodesLength === 0) {
      // 아무런 노드도 없는 경우 array 및 length 초기화
      myNodeArray = [
        {
          nodeName: '#text',
          textContent: '',
        },
      ];
    } else {
      for (let i = 0; i < eachBlockChildNodesLength; i++) {
        myNodeArray.push({
          nodeName: eachBlockChildNodes[i].nodeName as '#text' | 'CODE',
          textContent: eachBlockChildNodes[i].textContent,
        }); // nodeValue 대신 TextContent로 해야, <code></code> 안의 텍스트 가져옴
      }
    }

    return myNodeArray;
  };
  let myNodeArray = getMyNodeArray();

  // console.log('myNodeArray', myNodeArray);

  const getNewNodesWithInlineCodeHtml = () => {
    let twoBacktickNodeIndex: number | null = null;
    // let inlineCodeHtml: string | undefined = undefined;

    for (let i = 0; i < eachBlockChildNodesLength; i++) {
      if (eachBlockChildNodes[i].nodeName === '#text') {
        const textContent = eachBlockChildNodes[i].textContent;
        const isContinuousBacktick: boolean | undefined =
          textContent?.includes('``');
        const countBacktick: number | undefined =
          textContent?.match(/`/g)?.length;

        if (countBacktick === 2) {
          if (isContinuousBacktick) {
            twoBacktickNodeIndex = i;
            // 2개 연속(``)이면 빈 inline Code Block 생성
            myNodeArray[i].textContent = textContent?.replace(
              '``',
              `${frontTag}\u00A0${backTag}`
            );
          } else {
            twoBacktickNodeIndex = i;
            // 첫 번째 `는 <code>로 두 번째 `는 </code>로!
            myNodeArray[i].textContent = textContent
              ?.replace('`', frontTag)
              .replace(
                '`',
                backTag
                // (&nbsp;)로 코드 블럭 벗어나기
              );
          }
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
        if (myNodeArray[i].nodeName === '#text') {
          newHtml = `${newHtml}${myNodeArray[i].textContent}`;
          // console.log('for', '#text', newHtml);
        }

        if (myNodeArray[i].nodeName === 'CODE') {
          newHtml = `${newHtml}${frontTag}${
            myNodeArray[i].textContent
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
