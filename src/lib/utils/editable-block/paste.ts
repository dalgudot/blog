import { MutableRefObject } from 'react';

// https://gdtbgl93.tistory.com/175
export const paste = (
  tempEachBlockStateText: string,
  setPasteData: (newHtml: string) => void,
  eachRef: MutableRefObject<any>
) => {
  navigator.clipboard.readText().then((clipText) => {
    // const htmlClipText = clipText
    //   ?.replace(/&/g, '&amp;') // &부터 해야 뒤쪽 <, > replace에 영향 없음!
    //   .replace(/</g, '&lt;')
    //   .replace(/>/g, '&gt;');

    // Selection의 anchor는 텍스트 선택을 시작한 지점, focus는 선택을 끝낸 지점
    const selection = window.getSelection();
    const smallOffset =
      selection &&
      ((selection?.anchorOffset < selection?.focusOffset
        ? selection?.anchorOffset
        : selection?.focusOffset) as number);
    const largeOffset =
      selection &&
      ((selection?.anchorOffset < selection?.focusOffset
        ? selection?.focusOffset
        : selection?.anchorOffset) as number);

    console.log(smallOffset, largeOffset);

    const isNotNullOffset = largeOffset !== null && smallOffset !== null;
    const rangeLength = isNotNullOffset && largeOffset - smallOffset;
    const isSelectionPaste = rangeLength !== false && rangeLength !== 0;

    let newHtml = '';

    // 드래그된 텍스트 있으면 해당 텍스트 지우고 가장 붙여넣기
    if (isSelectionPaste) {
      const tempEachBlockStateTextArray = tempEachBlockStateText
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .split('');
      // console.log('before', tempEachBlockStateTextArray);

      isNotNullOffset &&
        tempEachBlockStateTextArray.splice(
          smallOffset,
          largeOffset - smallOffset
        );

      smallOffset !== null &&
        tempEachBlockStateTextArray.splice(smallOffset, 0, clipText);

      // console.log('after', tempEachBlockStateTextArray);

      const selectionRemovedtempEachBlockStateText =
        tempEachBlockStateTextArray.join('');

      // &부터 해야 뒤쪽 <, > replace에 영향 없음!
      newHtml = `${selectionRemovedtempEachBlockStateText}`
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      // selection?.getRangeAt(0).insertNode(document.createTextNode(newHtml));
    } else {
      const htmlClipText = clipText
        ?.replace(/&/g, '&amp;') // &부터 해야 뒤쪽 <, > replace에 영향 없음!
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      newHtml = `${tempEachBlockStateText}${htmlClipText}`;
    }

    setPasteData(newHtml);

    // setPasteData(newHtml); 이후에
    if (isSelectionPaste) {
      // console.log(eachRef.current);
      const targetNode = eachRef.current.childNodes[0];
      // console.log('targetNode', targetNode);

      console.log(clipText, '///', newHtml);
      const newCaretPosition =
        smallOffset !== null && smallOffset + clipText.length;
      // replace 처리된 htmlClipText가 아닌 clipText 원본으로 해야 length 정확히 맞음
      // console.log('newCaretPosition', newCaretPosition);

      const newRange = document.createRange();
      // !== null 해야 0일 때도 작동 -> 0은 false!
      newCaretPosition && newRange.setStart(targetNode, newCaretPosition); // 앞쪽 셀렉션 지점(smallOffset)에서 붙여넣는 텍스트 길이만큼 뒤쪽에 커서 위치
      // smallOffset && newRange.setEnd(targetNode, smallOffset);

      selection && selection.removeAllRanges();
      selection && selection.addRange(newRange);
    }
  });
};
