import { MutableRefObject } from 'react';

// https://gdtbgl93.tistory.com/175
export const paste = (
  tempEachBlockStateText: string,
  setPasteData: (newHtml: string) => void,
  eachRef: MutableRefObject<any>
) => {
  navigator.clipboard.readText().then((clipText) => {
    // Selection의 anchor는 텍스트 선택을 시작한 지점, focus는 선택을 끝낸 지점
    let newHtml = '';
    const selection = window.getSelection();
    const smallOffset =
      selection && Math.min(selection.anchorOffset, selection.focusOffset);
    const largeOffset =
      selection && Math.max(selection.anchorOffset, selection.focusOffset);
    // console.log(smallOffset, largeOffset);

    const isNotNullOffset = largeOffset !== null && smallOffset !== null;
    const rangeLength = isNotNullOffset && largeOffset - smallOffset;
    const isSelectionPaste = rangeLength !== false && rangeLength !== 0;

    // 문자열을 배열로
    const tempEachBlockStateTextArray = tempEachBlockStateText
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .split('');
    // 길이 동기화시키기 위해 reverse replace
    // console.log('before', tempEachBlockStateTextArray);

    if (isSelectionPaste) {
      // // 드래그된 텍스트 있으면 해당 텍스트 지우고 가장 붙여넣기 > selection 있으면 그 영역 삭제
      isNotNullOffset &&
        tempEachBlockStateTextArray.splice(smallOffset, rangeLength);
    }

    // 붙여넣기
    smallOffset !== null &&
      tempEachBlockStateTextArray.splice(smallOffset, 0, clipText);

    // 배열을 문자열로
    const selectionRemovedtempEachBlockStateText =
      tempEachBlockStateTextArray.join('');

    // &부터 해야 뒤쪽 <, > replace에 영향 없음!
    newHtml = `${selectionRemovedtempEachBlockStateText}`
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    setPasteData(newHtml);
    focusCaretAfterClipText(eachRef, smallOffset, clipText, selection);
    // setPasteData 데이터 업데이트 이후에 caret 위치 조정
  });
};

const focusCaretAfterClipText = (
  eachRef: MutableRefObject<any>,
  smallOffset: number | null,
  clipText: string,
  selection: Selection | null
) => {
  const targetNode = eachRef.current.childNodes[0];
  const newCaretPosition =
    smallOffset !== null && smallOffset + clipText.length;
  // !== null 해야 0일 때도 작동 -> 0은 false!
  // replace 처리된 htmlClipText가 아닌 clipText 원본으로 해야 length 정확히 맞음

  const newRange = document.createRange();
  newCaretPosition && newRange.setStart(targetNode, newCaretPosition);
  newCaretPosition && newRange.setEnd(targetNode, newCaretPosition);
  // 앞쪽 셀렉션 지점(smallOffset)에서 붙여넣는 텍스트 길이만큼 뒤쪽에 커서 위치

  selection && selection.removeAllRanges();
  selection && selection.addRange(newRange);
};
