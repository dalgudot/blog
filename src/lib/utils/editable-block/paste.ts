import { MutableRefObject } from 'react';

// selection / range 속성, 메소드 정리 >> https://jungpaeng.tistory.com/86
// https://gdtbgl93.tistory.com/175
export const paste = (
  eachBlockRef: MutableRefObject<HTMLElement>,
  setPasteData: (newHtml: string) => void
) => {
  navigator.clipboard.readText().then((clipText) => {
    // Selection의 anchor는 텍스트 선택을 시작한 지점, focus는 선택을 끝낸 지점
    let newHtml: string = '';
    const selection = window.getSelection(); // 셀렉션이 있는 노드들 모두
    const clipTextLength = clipText.length;

    let eachBlockChildNodes = eachBlockRef.current.childNodes;
    let eachBlockChildNodesLength = eachBlockRef.current.childNodes.length;

    let isRemovedSomeNode: boolean = false;
    const removeChildNode = (index: number) => {
      // console.log('eachBlockChildNodes', eachBlockChildNodes);
      eachBlockChildNodes[index].remove(); // 실제 노드 삭제
      myNodeArray.splice(index, 1); // 내가 만든 배열 요소 삭제
      isRemovedSomeNode = true;
    };
    // console.log('eachBlockChildNodesLength', eachBlockChildNodesLength);

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
          nodeName: eachBlockRef.current.childNodes[i].nodeName as
            | '#text'
            | 'CODE',
          textContent: eachBlockRef.current.childNodes[i].textContent,
        }); // nodeValue 대신 TextContent로 해야, <code></code> 안의 텍스트 가져옴
      }
    }

    // console.log('myNodeArray', myNodeArray);
    const range = selection?.getRangeAt(0);
    const startContainer = range?.startContainer;
    const endContainer = range?.endContainer;
    const startOffset = range?.startOffset;
    const endOffset = range?.endOffset;
    const collapsed = range?.collapsed;
    // console.log('rangeContainer', startContainer, endContainer); // 무조건 왼쪽, 오른쪽
    // console.log('rangeOffset', startOffset, endOffset); // 무조건 왼쪽, 오른쪽
    // console.log('collapsed', collapsed); // 무조건 왼쪽, 오른쪽

    // 1. 커서 하나일 때, if(collapsed === true) 2. 선택 영역이 있을 때, if(collapsed === false)

    // 정확한 위치에 clipText를 붙여넣으려면?
    // 1) tempEachBlockStateText가 아닌, 즉 전체 텍스트를 이용하는 게 아닌 커서가 있는 노드의 텍스트를 바꿔줘아 한다.
    // 2) 그리고 다시 전체로 구성해줘야 한다.

    let endNodeIndex: number = 0; // eachBlockChildNodesLength === 0일 떄 대비 가능
    let startNodeIndex: number = 0;
    let middleNodeCount: number = 0;

    // ***공통*** 아래 for문을 통해 마지막 노드(선택 영역 없는 경우 커서 1개) 커서가 있는 노드 식별!
    if (eachBlockChildNodesLength === 0) {
      eachBlockChildNodesLength = 1; // length는 여기서 초기화해야 위  if (eachBlockChildNodesLength === 0) 쓸 수 있음.
    } else {
      for (let i = 0; i < eachBlockChildNodesLength; i++) {
        if (
          eachBlockRef.current.childNodes[i].nodeName === '#text' &&
          endContainer?.isSameNode(eachBlockRef.current.childNodes[i])
        ) {
          // nodeWithCaret = { node: eachBlockRef.current.childNodes[i], nodeIndex: i };
          endNodeIndex = i;
          // console.log('***#text***', eachBlockRef.current.childNodes[i], i);
        }

        if (
          eachBlockRef.current.childNodes[i].nodeName === 'CODE' &&
          endContainer?.isSameNode(
            eachBlockRef.current.childNodes[i].childNodes.item(0) // CODE의 경우 childeNode(#text)로 endContainer와 비교해야 함.
          )
        ) {
          // nodeWithCaret = { node: eachBlockRef.current.childNodes[i], nodeIndex: i };
          endNodeIndex = i;
          // console.log('***CODE***', eachBlockRef.current.childNodes[i], i);
        }

        if (endNodeIndex !== 0) {
          break;
        }
      }
    }
    console.log('endNodeIndex', endNodeIndex);

    if (collapsed === true) {
      const nodeWithCaretTextContent = myNodeArray[endNodeIndex].textContent;
      const nodeWithCaretTextContentArray = nodeWithCaretTextContent?.split('');

      // 배열에서 붙여넣기
      endOffset !== undefined &&
        nodeWithCaretTextContentArray?.splice(endOffset, 0, clipText);

      const textAfterPastedNodeWithCaretIndex =
        nodeWithCaretTextContentArray?.join('');

      myNodeArray[endNodeIndex].textContent = textAfterPastedNodeWithCaretIndex;
    }

    // 드래그한 선택 영역 있을 경우

    if (collapsed === false) {
      // 1. 셀렉션 영역 모두 지운다
      // 2. 마지막 노드에 해당 텍스트를 붙여넣는다.

      for (let i = 0; i < eachBlockChildNodesLength; i++) {
        if (
          eachBlockRef.current.childNodes[i].nodeName === '#text' &&
          startContainer?.isSameNode(eachBlockRef.current.childNodes[i])
        ) {
          // nodeWithCaret = { node: eachBlockRef.current.childNodes[i], nodeIndex: i };
          startNodeIndex = i;
          // console.log('***#text***', eachBlockRef.current.childNodes[i], i);
        }

        if (
          eachBlockRef.current.childNodes[i].nodeName === 'CODE' &&
          startContainer?.isSameNode(
            eachBlockRef.current.childNodes[i].childNodes.item(0) // CODE의 경우 childeNode(#text)로 startContainer와 비교해야 함.
          )
        ) {
          // nodeWithCaret = { node: eachBlockRef.current.childNodes[i], nodeIndex: i };
          startNodeIndex = i;
          // console.log('***CODE***', eachBlockRef.current.childNodes[i], i);
        }

        if (startNodeIndex !== 0) {
          break;
        }
      }
      console.log('startNodeIndex', startNodeIndex);

      // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
      // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
      // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
      if (endNodeIndex === startNodeIndex) {
        // 같은 노드에 있다면
        const nodeTextArray = myNodeArray[endNodeIndex].textContent?.split('');

        // 선택 영역 삭제
        endOffset !== undefined &&
          startOffset !== undefined &&
          nodeTextArray?.splice(startOffset, endOffset - startOffset);

        // cliptText 붙여넣기
        startOffset !== undefined &&
          nodeTextArray?.splice(startOffset, 0, clipText);

        const finalNodeText = nodeTextArray?.join('');

        myNodeArray[endNodeIndex].textContent = finalNodeText;

        console.log(myNodeArray[endNodeIndex].textContent);
      }
      // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
      // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
      // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
      else if (endNodeIndex - startNodeIndex > 0) {
        // Start 노드, 1)텍스트 삭제 2)CODE인데 textContent가 없다면 <code> 노드 삭제
        const startNodeTextArray =
          myNodeArray[startNodeIndex].textContent?.split('');
        const endNodeTextArray =
          myNodeArray[endNodeIndex].textContent?.split('');

        const startNodeArrayLength = startNodeTextArray?.length;

        // Start 노드 선택 영역 삭제
        const startNodeRemoveRange =
          startNodeArrayLength !== undefined &&
          startOffset !== undefined &&
          startNodeArrayLength - startOffset;

        startOffset !== undefined &&
          startNodeRemoveRange !== false &&
          startNodeTextArray?.splice(startOffset, startNodeRemoveRange);

        // 순서는 위 splice 다음
        const startNodeTextArrayAfterRemoveLength = startNodeTextArray?.length; // *** 길이 0일 떄 CODE 요소 삭제하기 위해 필요

        // End 노드, End 노드는 처음부터 endOffset까지 삭제
        // End 노드 영역 삭제
        endOffset !== undefined && endNodeTextArray?.splice(0, endOffset); // End 노드는 처음부터 endOffset까지 삭제

        // 순서는 위 splice 다음
        const endNodeTextArrayAfterRemoveLength = endNodeTextArray?.length; // *** 길이 0일 떄 CODE 요소 삭제하기 위해 필요

        // End 노드 offset 0부터 cliptText 붙여넣기
        endOffset !== undefined && endNodeTextArray?.splice(0, 0, clipText); // End 노드는 0부터 붙여야 함

        // setFinalStartNodeText()만 아래 if문에서 쓰임 -> index 맞추기 위해
        const setFinalStartNodeText = () => {
          const finalStartNodeText = startNodeTextArray?.join('');
          myNodeArray[startNodeIndex].textContent = finalStartNodeText;
        };

        const finalEndNodeText = endNodeTextArray?.join('');
        myNodeArray[endNodeIndex].textContent = finalEndNodeText; // 내가 만든 Array에 textContent 넣기

        const removeMiddleNode = () => {
          // ***중요*** 큰 index부터 시작해야 삭제 순서가 꼬이지 않음 > 큰 index 요소부터 삭제한다는 뜻
          for (let i = endNodeIndex - 1; i > startNodeIndex; i--) {
            console.log('i,', i);
            removeChildNode(i);
          }
        };
        // 여기서 removeMiddleNode() 실행시키면 아래 if문 조건에서 endNodeIndex, startNodeIndex를 쓸 수 없게 됨.
        // > 각 조건에서 각각 실행시켜줘야 함!
        middleNodeCount = endNodeIndex - startNodeIndex - 1;

        // 아래 if문은 위 두 줄 코드를 포함해 start 노드의 텍스트가 없어질 경우 노드 삭제하고, 텍스트가 있을 경우삭제만 하는 코드
        // *** 허나 여기서 index를 바꾸면 위쪽 End 노드 코드에 endNodeIndex 변화로 영향 끼치기 때문에 End 노드 작업 이후에 여기서!
        if (
          startNodeTextArrayAfterRemoveLength === 0 &&
          myNodeArray[startNodeIndex].nodeName === 'CODE'
        ) {
          // CODE 노드를 삭제하면 기존에 startNodeIndex, endNodeIndex를 쓸 수 없게 때문에 2중 if문으로 숫자 계산해서 한꺼번에 처리
          if (
            endNodeTextArrayAfterRemoveLength === 0 &&
            myNodeArray[endNodeIndex].nodeName === 'CODE'
          ) {
            removeMiddleNode();
            removeChildNode(startNodeIndex);
            removeChildNode(endNodeIndex - middleNodeCount - 1); // 이미 startNodeIndex 제거했으므로 -1
          } else {
            removeMiddleNode();
            removeChildNode(startNodeIndex);
          }
          //
        } else if (
          (finalEndNodeText === '' || finalEndNodeText === ' ') &&
          myNodeArray[endNodeIndex].nodeName === 'CODE'
        ) {
          //
          if (
            startNodeTextArrayAfterRemoveLength === 0 &&
            myNodeArray[startNodeIndex].nodeName === 'CODE'
          ) {
            removeMiddleNode();
            removeChildNode(startNodeIndex);
            removeChildNode(endNodeIndex - middleNodeCount - 1); // 이미 startNodeIndex 제거했으므로 -1
          } else {
            setFinalStartNodeText(); // start 노드 업데이트된 텍스트 여기서는 삭제되지 않으므로, 넣어줘야
            removeMiddleNode();
            removeChildNode(endNodeIndex - middleNodeCount);
          }
          //
        } else {
          removeMiddleNode(); // 여기선 인덱스가 변하지 않음.
          setFinalStartNodeText(); // 내가 만든 Array에 textContent 넣기
        }
      }

      // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
      // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
      // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //
      else {
        throw new Error('Error');
      }
    }

    // console.log('Final myNodeArray', myNodeArray);

    // ***중요*** (불변성 이슈 - let을 안 쓸 수 있는가?)제거된 노드가 있다면, 업데이트된 eachBlockChildNodes.length를, 아니라면 할당된 eachBlockChildNodesLength를(그래야 아무런 노드 없을 때도 작동)
    const finalEachBlockChildNodeLength = isRemovedSomeNode
      ? eachBlockRef.current.childNodes.length
      : eachBlockChildNodesLength;

    // ***공통*** 붙여넣은 노드 합쳐서 문자열 재조합
    // for (let i = 0; i < eachBlockChildNodesLength; i++) {
    for (let i = 0; i < finalEachBlockChildNodeLength; i++) {
      const frontTag = '<code class="inline__code__block">';
      const backTag = '</code>';

      if (myNodeArray[i].nodeName === '#text') {
        newHtml = `${newHtml}${myNodeArray[i].textContent}`;
        // console.log('for', '#text', newHtml);
      }

      if (myNodeArray[i].nodeName === 'CODE') {
        newHtml = `${newHtml}${frontTag}${myNodeArray[i].textContent}${backTag}`;
        // console.log('for', 'CODE', newHtml);
      }
    }

    // console.log('newHtml', newHtml);

    setPasteData(newHtml);

    // setPasteData 데이터 업데이트 이후에 caret 위치 조정
    if (collapsed) {
      focusCaretAfterClipText(
        eachBlockRef,
        endNodeIndex,
        clipTextLength,
        startOffset,
        selection
      );
    }

    if (!collapsed) {
      console.log('collapsed', collapsed);
    }
  });
};

const focusCaretAfterClipText = (
  eachBlockRef: MutableRefObject<HTMLElement>,
  endNodeIndex: number,
  clipTextLength: number,
  startOffset: number | undefined,
  selection: Selection | null
) => {
  const targetNode =
    eachBlockRef.current.childNodes[endNodeIndex].nodeName === 'CODE'
      ? eachBlockRef.current.childNodes[endNodeIndex].childNodes[0]
      : eachBlockRef.current.childNodes[endNodeIndex];

  const newCaretPosition =
    startOffset !== undefined && startOffset + clipTextLength;

  const newRange = document.createRange();
  newCaretPosition !== false && newRange.setStart(targetNode, newCaretPosition); // 코드 블럭 한 칸 뒤쪽 위치

  selection && selection.removeAllRanges();
  selection && selection.addRange(newRange);
};

// https://jungpaeng.tistory.com/86
// range.startContainer: 범위가 시작하는 부분을 포함하고 있는 노드
// range.endContainter: 범위가 끝나는 부분을 포함하고 있는 노드
// range.startOffset: startContainer에서 범위가 시작하는 지점의 offset
// // // // // startContainer가 TEXT_NODE라면 문자의 갯수
// // // // // startContainer가 ELEMENT_NODE라면 자식 노드의 인덱스
// range.endOffset: endContainer에서 범위가 끝나는 지점의 offset
// // // // // startOffset과 동일한 규칙이 적용
// range.collapsed: Range의 시작점과 끝점이 같은 위치인지 알 수 있는 boolean 값을 반환
