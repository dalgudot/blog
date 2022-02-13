import { MutableRefObject } from 'react';

// selection / range 속성, 메소드 정리 >> https://jungpaeng.tistory.com/86
// https://gdtbgl93.tistory.com/175
export const paste = (
  tempEachBlockStateText: string,
  setPasteData: (newHtml: string) => void,
  eachBlockRef: MutableRefObject<any>
) => {
  navigator.clipboard.readText().then((clipText) => {
    // Selection의 anchor는 텍스트 선택을 시작한 지점, focus는 선택을 끝낸 지점
    let newHtml: string = '';
    const selection = window.getSelection(); // 셀렉션이 있는 노드들 모두
    let eachBlockRefNodeLength = eachBlockRef.current.childNodes.length;
    // console.log('eachBlockRefNodeLength', eachBlockRefNodeLength);

    let eachBlockRefNodeArray: {
      nodeName: '#text' | 'CODE';
      textContent: string;
    }[] = [];

    // 아무런 텍스트도 없는 노드일 경우(eachBlockRef.current.childNodes)
    if (eachBlockRefNodeLength === 0) {
      // 아무런 노드도 없는 경우 array 및 length 초기화
      eachBlockRefNodeArray = [
        {
          nodeName: '#text',
          textContent: '',
        },
      ];
    } else {
      for (let i = 0; i < eachBlockRefNodeLength; i++) {
        eachBlockRefNodeArray.push({
          nodeName: eachBlockRef.current.childNodes[i].nodeName,
          textContent: eachBlockRef.current.childNodes[i].textContent,
        }); // nodeValue 대신 TextContent로 해야, <code></code> 안의 텍스트 가져옴
      }
    }

    // console.log('eachBlockRefNodeArray', eachBlockRefNodeArray);

    const range = selection?.getRangeAt(0);
    const startContainer = range?.startContainer;
    const endContainer = range?.endContainer;
    const startOffset = range?.startOffset;
    const endOffset = range?.endOffset;
    const startTextContent = startContainer?.textContent;
    const endTextContent = endContainer?.textContent;
    const collapsed = range?.collapsed;
    console.log('rangeContainer', startContainer, endContainer); // 무조건 왼쪽, 오른쪽
    console.log('rangeOffset', startOffset, endOffset); // 무조건 왼쪽, 오른쪽
    console.log('collapsed', collapsed); // 무조건 왼쪽, 오른쪽
    console.log('textContent', startTextContent, endTextContent); // nodeValue 또는 textContent 이용

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

    let nodeWithEndCaretIndex: number = 0; // eachBlockRefNodeLength === 0일 떄 대비 가능
    // ***공통*** 아래 for문을 통해 마지막 노드(선택 영역 없는 경우 커서 1개) 커서가 있는 노드 식별!
    if (eachBlockRefNodeLength === 0) {
      eachBlockRefNodeLength = 1; // length는 여기서 초기화해야 위  if (eachBlockRefNodeLength === 0) 쓸 수 있음.
    } else {
      for (let i = 0; i < eachBlockRefNodeLength; i++) {
        if (
          eachBlockRef.current.childNodes[i].nodeName === '#text' &&
          endContainer?.isSameNode(eachBlockRef.current.childNodes[i])
        ) {
          // nodeWithCaret = { node: eachBlockRef.current.childNodes[i], nodeIndex: i };
          nodeWithEndCaretIndex = i;
          // console.log('***#text***', eachBlockRef.current.childNodes[i], i);
        }

        if (
          eachBlockRef.current.childNodes[i].nodeName === 'CODE' &&
          endContainer?.isSameNode(
            eachBlockRef.current.childNodes[i].childNodes.item(0) // CODE의 경우 childeNode(#text)로 endContainer와 비교해야 함.
          )
        ) {
          // nodeWithCaret = { node: eachBlockRef.current.childNodes[i], nodeIndex: i };
          nodeWithEndCaretIndex = i;
          // console.log('***CODE***', eachBlockRef.current.childNodes[i], i);
        }

        if (nodeWithEndCaretIndex !== 0) {
          break;
        }
      }
    }
    console.log('nodeWithEndCaretIndex', nodeWithEndCaretIndex);

    if (collapsed === true) {
      // console.log('eachBlockRefNodeArray.length', eachBlockRefNodeArray.length);

      const nodeWithCaretTextContent =
        eachBlockRefNodeArray[nodeWithEndCaretIndex].textContent;

      // console.log('nodeWithCaretTextContent', nodeWithCaretTextContent);

      const nodeWithCaretTextContentArray = nodeWithCaretTextContent.split('');

      // 배열에서 붙여넣기
      endOffset !== undefined &&
        nodeWithCaretTextContentArray.splice(endOffset, 0, clipText);

      // console.log('nodeWithCaretTextContentArray', nodeWithCaretTextContentArray);

      const textAfterPastedNodeWithCaretIndex =
        nodeWithCaretTextContentArray.join('');

      // console.log(
      //   'textAfterPastedNodeWithCaretIndex',
      //   textAfterPastedNodeWithCaretIndex
      // );

      eachBlockRefNodeArray[nodeWithEndCaretIndex].textContent =
        textAfterPastedNodeWithCaretIndex;

      // console.log(
      //   'newTextContent',
      //   eachBlockRefNodeArray[nodeWithEndCaretIndex].textContent
      // );

      // console.log('Final eachBlockRefNodeArray', eachBlockRefNodeArray);
    }

    // 드래그한 선택 영역 있을 경우
    let nodeWithStartCaretIndex: number = 0;
    if (collapsed === false) {
      // 1. 셀렉션 영역 모두 지운다
      // 2. 마지막 노드에 해당 텍스트를 붙여넣는다.

      for (let i = 0; i < eachBlockRefNodeLength; i++) {
        if (
          eachBlockRef.current.childNodes[i].nodeName === '#text' &&
          startContainer?.isSameNode(eachBlockRef.current.childNodes[i])
        ) {
          // nodeWithCaret = { node: eachBlockRef.current.childNodes[i], nodeIndex: i };
          nodeWithStartCaretIndex = i;
          // console.log('***#text***', eachBlockRef.current.childNodes[i], i);
        }

        if (
          eachBlockRef.current.childNodes[i].nodeName === 'CODE' &&
          startContainer?.isSameNode(
            eachBlockRef.current.childNodes[i].childNodes.item(0) // CODE의 경우 childeNode(#text)로 startContainer와 비교해야 함.
          )
        ) {
          // nodeWithCaret = { node: eachBlockRef.current.childNodes[i], nodeIndex: i };
          nodeWithStartCaretIndex = i;
          // console.log('***CODE***', eachBlockRef.current.childNodes[i], i);
        }

        if (nodeWithStartCaretIndex !== 0) {
          break;
        }
      }
      console.log('nodeWithStartCaretIndex', nodeWithStartCaretIndex);

      if (nodeWithEndCaretIndex === nodeWithStartCaretIndex) {
        // 같은 노드에 있다면
        const textToRemove =
          startOffset !== undefined &&
          eachBlockRefNodeArray[nodeWithEndCaretIndex].textContent.substring(
            startOffset,
            endOffset
          );

        console.log(textToRemove);

        const newText =
          textToRemove &&
          eachBlockRefNodeArray[nodeWithEndCaretIndex].textContent.replace(
            textToRemove,
            ''
          );

        // 2/14 clipText 붙여넣기 추가 필요!!!!!

        eachBlockRefNodeArray[nodeWithEndCaretIndex].textContent = newText
          ? newText
          : ''; // 확인 필요

        console.log(eachBlockRefNodeArray[nodeWithEndCaretIndex].textContent);
      } else if (nodeWithEndCaretIndex - nodeWithStartCaretIndex === 1) {
        // 하나 차이가 나는 노드에 있다면
      } else if (nodeWithEndCaretIndex - nodeWithStartCaretIndex > 1) {
        // 둘 이상 차이가 나는 노드에 있다면
      } else {
        throw new Error('Error');
      }

      // 임시
      // newHtml = '둘<code class="inline__code__block">ㅁ</code>둘셋';
    }

    // ***공통*** 붙여넣은 노드 합쳐서 문자열 재조합
    for (let i = 0; i < eachBlockRefNodeLength; i++) {
      const frontTag = '<code class="inline__code__block">';
      const backTag = '</code>';

      if (eachBlockRefNodeArray[i].nodeName === '#text') {
        newHtml = `${newHtml}${eachBlockRefNodeArray[i].textContent}`;
        // console.log('for', '#text', newHtml);
      }

      if (eachBlockRefNodeArray[i].nodeName === 'CODE') {
        newHtml = `${newHtml}${frontTag}${eachBlockRefNodeArray[i].textContent}${backTag}`;
        // console.log('for', 'CODE', newHtml);
      }
    }

    console.log('newHtml', newHtml);

    setPasteData(newHtml);

    // setPasteData 데이터 업데이트 이후에 caret 위치 조정
    // focusCaretAfterClipText(
    //   eachBlockRef,
    //   nodeWithEndCaretIndex,
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
  nodeWithEndCaretIndex: number,
  endOffset: number | undefined,
  clipText: string,
  selection: Selection | null
) => {
  const targetNode = eachBlockRef.current.childNodes[nodeWithEndCaretIndex];
  const newCaretPosition =
    endOffset !== undefined && endOffset + clipText.length;

  const newRange = document.createRange();
  if (newCaretPosition !== false) {
    if (
      eachBlockRef.current.childNodes[nodeWithEndCaretIndex].nodeName === 'CODE'
    ) {
      newRange.setStart(targetNode.childNodes.item(0), newCaretPosition); // CODE의 경우 childeNode(#text)로 캐럿 위치 조정
    } else {
      newRange.setStart(targetNode, newCaretPosition);
    }
  }

  selection && selection.removeAllRanges();
  selection && selection.addRange(newRange);
};
