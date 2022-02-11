// https://gdtbgl93.tistory.com/175
export const paste = (
  tempEachBlockStateText: string,
  setPasteData: (newHtml: string) => void
) => {
  navigator.clipboard.readText().then((clipText) => {
    const htmlClipText = clipText
      ?.replace(/&/g, '&amp;') // &부터 해야 뒤쪽 <, > replace에 영향 없음!
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

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

    const isNotNullOffset = largeOffset !== null && smallOffset !== null;
    const rangeLength = isNotNullOffset && largeOffset - smallOffset;
    const isSelectionPaste = rangeLength !== false && rangeLength !== 0;

    let newHtml = '';

    // 드래그된 텍스트 있으면 해당 텍스트 지우고 가장 붙여넣기
    if (isSelectionPaste) {
      const tempEachBlockStateTextArray = tempEachBlockStateText.split('');
      // console.log('before', tempEachBlockStateTextArray);

      isNotNullOffset &&
        tempEachBlockStateTextArray.splice(
          smallOffset,
          largeOffset - smallOffset
        );

      smallOffset !== null &&
        tempEachBlockStateTextArray.splice(smallOffset, 0, htmlClipText);

      // console.log('after', tempEachBlockStateTextArray);

      const selectionRemovedtempEachBlockStateText =
        tempEachBlockStateTextArray.join('');

      newHtml = `${selectionRemovedtempEachBlockStateText}`;
    } else {
      newHtml = `${tempEachBlockStateText}${htmlClipText}`;
    }

    setPasteData(newHtml);
  });
};
