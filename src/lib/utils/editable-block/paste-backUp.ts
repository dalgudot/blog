import { MutableRefObject } from 'react';

// selection / range 속성, 메소드 정리 >> https://jungpaeng.tistory.com/86
// https://gdtbgl93.tistory.com/175
export const paste = (
  tempEachBlockStateText: string,
  setPasteData: (newHtml: string) => void,
  eachRef: MutableRefObject<any>
) => {
  navigator.clipboard.readText().then((clipText) => {
    // Selection의 anchor는 텍스트 선택을 시작한 지점, focus는 선택을 끝낸 지점
    let newHtml = '';
    const selection = window.getSelection(); // 셀렉션이 있는 노드들 모두
    // selection &&
    //   console.log('selection.node', selection.anchorNode, selection.focusNode);

    // const newTextNode = document.createTextNode('');

    // 쓸만한 값: nodeValue! 쓸만한 메소드: hasChildNodes, appendChild(newNode)
    // Node.compareDocumentPosition(otherNode)
    // 쓸만한 인터페이스: NodeList - item(index: number): Node | null;

    const anchorNode = selection?.anchorNode;
    const focusNode = selection?.focusNode;

    // anchorNode &&
    //   focusNode &&
    //   console.log('***nodeOfSelection***', anchorNode, focusNode);

    // console.log('childeNode', selection?.rangeCount);

    const range = selection?.getRangeAt(0);
    range &&
      console.log('rangeContainer', range.startContainer, range.endContainer);

    // 리액트 렌더링과 관계없이 작동
    // console.log('1 selection', selection);

    const smallOffset =
      selection && Math.min(selection.anchorOffset, selection.focusOffset);
    const largeOffset =
      selection && Math.max(selection.anchorOffset, selection.focusOffset);

    // console.log(smallOffset, largeOffset);

    const isNotNullOffset = largeOffset !== null && smallOffset !== null;
    const rangeLength = isNotNullOffset && largeOffset - smallOffset;
    const isSelectionPaste = rangeLength !== false && rangeLength !== 0;

    // console.log('tempEachBlockStateText', tempEachBlockStateText);

    // *** 길이 동기화시키기 위해 reverse replace
    const convertTempEachBlockStateText = tempEachBlockStateText
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&nbsp;/g, '\u00A0') // & 변환 피하기 위해 &nbsp; 대신
      .replace(/&nbsp/g, '\u00A0') // & 변환 피하기 위해 &nbsp; 대신
      .replace(/&amp;/g, '&');

    // console.log('convertTempEachBlockStateText', convertTempEachBlockStateText);

    // 문자열을 배열로
    const tempEachBlockStateTextArray = convertTempEachBlockStateText.split('');

    if (isSelectionPaste) {
      // 드래그된 텍스트 있으면 해당 텍스트 지우기 > selection 있으면 그 영역 삭제
      isNotNullOffset &&
        tempEachBlockStateTextArray.splice(smallOffset, rangeLength);
    }

    // 붙여넣기
    smallOffset !== null &&
      tempEachBlockStateTextArray.splice(smallOffset, 0, clipText);

    // 배열을 문자열로 // &부터 해야 뒤쪽 <, > replace에 영향 없음!
    const selectionRemovedtempEachBlockStateText = tempEachBlockStateTextArray
      .join('')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;') // 여기까지 바꾼 값들을 코드 블럭은 다시 replace해줘서 코드 블럭이 innerHtml에서 유지되도록 해준다.
      .replace(
        /\&lt;code class="inline__code__block"\&gt;/g,
        '<code class="inline__code__block">'
      )
      .replace(/\&lt;\/code\&gt;/g, '</code>');

    newHtml = `${selectionRemovedtempEachBlockStateText}`;
    // console.log('newHtml', newHtml);

    setPasteData(newHtml);

    // setPasteData 데이터 업데이트 이후에 caret 위치 조정
    // focusCaretAfterClipText(
    //   eachRef,
    //   smallOffset,
    //   clipText,
    //   selection,
    //   nodeForCaret
    // );
  });
};

// & === < === >

// 이게 노드를 기준으로 하기 때문에 문제가 생긴다.
const focusCaretAfterClipText = (
  eachRef: MutableRefObject<any>,
  smallOffset: number | null,
  clipText: string,
  selection: Selection | null,
  nodeForCaret: Node | null | undefined
) => {
  // const range = selection?.getRangeAt(0);
  // const childNodesLength = eachRef.current.childNodes.length;

  // for (let i = 0; i < childNodesLength; i++) {
  //   const selectNode = range?.selectNode(eachRef.current.childNodes[i]);
  //   console.log('selectNode', selectNode);
  // }

  // console.log('eachRef.current.childNodes', eachRef.current.childNodes);

  // 리액트 렌더링과 관계없이 작동
  // console.log('2 selection', selection);

  const targetNode = eachRef.current.childNodes[0];
  const newCaretPosition =
    smallOffset !== null && smallOffset + clipText.length;
  // !== null 해야 0일 때도 작동 -> 0은 false!
  // replace 처리된 htmlClipText가 아닌 clipText 원본으로 해야 length 정확히 맞음

  console.log('2 nodeForCaret', nodeForCaret);

  const newRange = document.createRange();
  // newCaretPosition !== false && newRange.setStart(targetNode, newCaretPosition);
  nodeForCaret && newRange.setStart(nodeForCaret, 1);
  // newCaretPosition && newRange.setEnd(targetNode, newCaretPosition);
  // 앞쪽 셀렉션 지점(smallOffset)에서 붙여넣는 텍스트 길이만큼 뒤쪽에 커서 위치

  selection && selection.removeAllRanges();
  selection && selection.addRange(newRange);
};
