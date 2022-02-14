import { MutableRefObject } from 'react';

// selection / range 속성, 메소드 정리 >> https://jungpaeng.tistory.com/86
// https://gdtbgl93.tistory.com/175
export const paste = (
  tempEachBlockStateText: string,
  setPasteData: (newHtml: string) => void,
  eachBlockRef: MutableRefObject<HTMLElement>
) => {
  navigator.clipboard.readText().then((clipText) => {
    // Selection의 anchor는 텍스트 선택을 시작한 지점, focus는 선택을 끝낸 지점
    let newHtml: string = '';
    const selection = window.getSelection(); // 셀렉션이 있는 노드들 모두

    const eachBlockChildNodes: NodeListOf<ChildNode> =
      eachBlockRef.current.childNodes;
    let eachBlockChildNodesLength = eachBlockChildNodes.length;
    let isRemovedSomeNode: boolean = false;
    const removeChildNode = (index: number) => {
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

    // https://jungpaeng.tistory.com/86
    // range.startContainer: 범위가 시작하는 부분을 포함하고 있는 노드
    // range.endContainter: 범위가 끝나는 부분을 포함하고 있는 노드
    // range.startOffset: startContainer에서 범위가 시작하는 지점의 offset
    // // // // // startContainer가 TEXT_NODE라면 문자의 갯수
    // // // // // startContainer가 ELEMENT_NODE라면 자식 노드의 인덱스
    // range.endOffset: endContainer에서 범위가 끝나는 지점의 offset
    // // // // // startOffset과 동일한 규칙이 적용
    // range.collapsed: Range의 시작점과 끝점이 같은 위치인지 알 수 있는 boolean 값을 반환

    // 1. 커서 하나일 때, if(collapsed === true) 2. 선택 영역이 있을 때, if(collapsed === false)

    // 정확한 위치에 clipText를 붙여넣으려면?
    // 1) tempEachBlockStateText가 아닌, 즉 전체 텍스트를 이용하는 게 아닌 커서가 있는 노드의 텍스트를 바꿔줘아 한다.
    // 2) 그리고 다시 전체로 구성해줘야 한다.

    let endNodeIndex: number = 0; // eachBlockChildNodesLength === 0일 떄 대비 가능
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
      // console.log('myNodeArray.length', myNodeArray.length);

      const nodeWithCaretTextContent = myNodeArray[endNodeIndex].textContent;

      // console.log('nodeWithCaretTextContent', nodeWithCaretTextContent);

      const nodeWithCaretTextContentArray = nodeWithCaretTextContent?.split('');

      // 배열에서 붙여넣기
      endOffset !== undefined &&
        nodeWithCaretTextContentArray?.splice(endOffset, 0, clipText);

      // console.log('nodeWithCaretTextContentArray', nodeWithCaretTextContentArray);

      const textAfterPastedNodeWithCaretIndex =
        nodeWithCaretTextContentArray?.join('');

      // console.log(
      //   'textAfterPastedNodeWithCaretIndex',
      //   textAfterPastedNodeWithCaretIndex
      // );

      myNodeArray[endNodeIndex].textContent = textAfterPastedNodeWithCaretIndex;

      // console.log(
      //   'newTextContent',
      //   myNodeArray[endNodeIndex].textContent
      // );
    }

    // 드래그한 선택 영역 있을 경우
    let startNodeIndex: number = 0;
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

      if (endNodeIndex === startNodeIndex) {
        // 같은 노드에 있다면
        const tempNodeTextArray =
          myNodeArray[endNodeIndex].textContent?.split('');

        // 선택 영역 삭제
        endOffset !== undefined &&
          startOffset !== undefined &&
          tempNodeTextArray?.splice(startOffset, endOffset - startOffset);

        // cliptText 붙여넣기
        startOffset !== undefined &&
          tempNodeTextArray?.splice(startOffset, 0, clipText);

        const finalNodeText = tempNodeTextArray?.join('');

        myNodeArray[endNodeIndex].textContent = finalNodeText;

        console.log(myNodeArray[endNodeIndex].textContent);
      } else if (endNodeIndex - startNodeIndex === 1) {
        // 하나 차이가 나는 노드에 있다면
        // Start 노드는 startOffset부터 끝까지, 두 번째 노드는 처음부터 endOffset까지

        // Start 노드 - 삭제만 - CODE인데 Textcontent가 없다면 <code> 노드 삭제
        const tempStartNodeTextArray =
          myNodeArray[startNodeIndex].textContent?.split('');

        // Start 노드 선택 영역 삭제
        const startNodeLength = myNodeArray[startNodeIndex].textContent?.length;
        const startNodeRemoveRange =
          startNodeLength !== undefined &&
          startOffset !== undefined &&
          startNodeLength - startOffset;

        startOffset !== undefined &&
          startNodeRemoveRange !== false &&
          tempStartNodeTextArray?.splice(startOffset, startNodeRemoveRange);

        const tempStartNodeTextArrayAfterRemoveLength =
          tempStartNodeTextArray?.length; // *** 길이 0일 떄 CODE 요소 삭제하기 위해 필요

        console.log(
          'tempStartNodeTextArrayAfterRemoveLength',
          tempStartNodeTextArrayAfterRemoveLength
        );

        // Start 노드 cliptText 붙여넣기 ***No*** - 삭제만
        // startOffset !== undefined &&
        //   tempStartNodeTextArray?.splice(startOffset, 0, clipText);

        // 하단 if문에서 필요없으므로 밑 2줄은 나중에 삭제
        // const finalStartNodeText = tempStartNodeTextArray?.join('');
        // myNodeArray[startNodeIndex].textContent = finalStartNodeText; // 내가 만든 Array에 textContent 넣기

        // End 노드, End 노드는 처음부터 endOffset까지 삭제
        // 스트링 배열로
        const tempEndNodeTextArray =
          myNodeArray[endNodeIndex].textContent?.split('');

        const tempEndNodeTextArrayAfterRemoveLength =
          tempEndNodeTextArray?.length; // *** 길이 0일 떄 CODE 요소 삭제하기 위해 필요

        // End 노드 영역 삭제
        endOffset !== undefined && tempEndNodeTextArray?.splice(0, endOffset); // End 노드는 처음부터 endOffset까지 삭제

        // End 노드 offset 0부터 cliptText 붙여넣기
        endOffset !== undefined && tempEndNodeTextArray?.splice(0, 0, clipText); // End 노드는 0부터 붙여야 함

        // 복사한 내용이 ' '이고 End가 CODE이면 ' ' -> '으로 반환
        const finalEndNodeText =
          tempEndNodeTextArray?.join('') === ' ' // 한 칸 띄어쓰기
            ? ''
            : tempEndNodeTextArray?.join('');

        // const finalEndNodeText = '';
        console.log('finalEndNodeText', `테스트${finalEndNodeText}테스트`);

        myNodeArray[endNodeIndex].textContent = finalEndNodeText; // 내가 만든 Array에 textContent 넣기

        // 아래 if문은 위 두 줄 코드를 포함해 start 노드의 텍스트가 없어질 경우 노드 삭제하고, 텍스트가 있을 경우삭제만 하는 코드
        // *** 허나 여기서 index를 바꾸면 위쪽 End 노드 코드에 endNodeIndex 변화로 영향 끼치기 때문에 End 노드 작업 이후에 여기서!
        if (
          tempStartNodeTextArrayAfterRemoveLength === 0 &&
          myNodeArray[startNodeIndex].nodeName === 'CODE'
        ) {
          // CODE 노드를 삭제하면 기존에 startNodeIndex, endNodeIndex를 쓸 수 없게 때문에 2중 if문으로 숫자 계산해서 한꺼번에 처리
          if (
            tempEndNodeTextArrayAfterRemoveLength === 0 &&
            myNodeArray[endNodeIndex].nodeName === 'CODE'
          ) {
            removeChildNode(startNodeIndex);
            removeChildNode(endNodeIndex - 1); // 이미 startNodeIndex 제거했으므로 -1
          } else {
            removeChildNode(startNodeIndex);
          }
          //
        } else if (
          finalEndNodeText === '' &&
          myNodeArray[endNodeIndex].nodeName === 'CODE'
        ) {
          console.log('CODE 동작');
          //
          if (
            tempStartNodeTextArrayAfterRemoveLength === 0 &&
            myNodeArray[startNodeIndex].nodeName === 'CODE'
          ) {
            removeChildNode(startNodeIndex);
            removeChildNode(endNodeIndex - 1); // 이미 startNodeIndex 제거했으므로 -1
          } else {
            removeChildNode(endNodeIndex);
          }
          //
        } else {
          const finalStartNodeText = tempStartNodeTextArray?.join('');
          myNodeArray[startNodeIndex].textContent = finalStartNodeText; // 내가 만든 Array에 textContent 넣기
        }
        //
      } else if (endNodeIndex - startNodeIndex > 1) {
        // 둘 이상 차이가 나는 노드에 있다면
      } else {
        throw new Error('Error');
      }
    }

    // console.log('Final myNodeArray', myNodeArray);

    // ***중요*** (불변성 이슈 - let을 안 쓸 수 있는가?)제거된 노드가 있다면, 업데이트된 eachBlockChildNodes.length를, 아니라면 할당된 eachBlockChildNodesLength를(그래야 아무런 노드 없을 때도 작동)
    const finalEachBlockChildNodeLength = isRemovedSomeNode
      ? eachBlockChildNodes.length
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

    console.log('newHtml', newHtml);

    setPasteData(newHtml);

    // setPasteData 데이터 업데이트 이후에 caret 위치 조정
    // focusCaretAfterClipText(
    //   eachBlockRef,
    //   endNodeIndex,
    //   endOffset,
    //   clipText,
    //   selection
    // );
  });
};

// & === < === >

// 이게 노드를 기준으로 하기 때문에 문제가 생긴다.
const focusCaretAfterClipText = (
  eachBlockRef: MutableRefObject<any>,
  endNodeIndex: number,
  endOffset: number | undefined,
  clipText: string,
  selection: Selection | null
) => {
  const targetNode = eachBlockRef.current.childNodes[endNodeIndex];
  const newCaretPosition =
    endOffset !== undefined && endOffset + clipText.length;

  const newRange = document.createRange();
  if (newCaretPosition !== false) {
    if (eachBlockRef.current.childNodes[endNodeIndex].nodeName === 'CODE') {
      newRange.setStart(targetNode.childNodes.item(0), newCaretPosition); // CODE의 경우 childeNode(#text)로 캐럿 위치 조정
    } else {
      newRange.setStart(targetNode, newCaretPosition);
    }
  }

  selection && selection.removeAllRanges();
  selection && selection.addRange(newRange);
};
