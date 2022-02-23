import { MutableRefObject, useEffect, useState } from 'react';

export const useSetCaretPosition__afterAddInlineCode = (
  eachBlockRef: MutableRefObject<HTMLElement>
) => {
  const [changeCaretPosition, setCaretPosition] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    // onInput 안에서 inlineCodeBlock이 업데이트되기 때문에,
    // onInput에 대한 렌더링이 완전히 끝난 후 여기서 업데이트!
    if (changeCaretPosition !== undefined) {
      const selection = window.getSelection();
      const targetNode =
        eachBlockRef.current.childNodes.length === 2
          ? eachBlockRef.current.childNodes[changeCaretPosition + 1] // 어떤 노드도 없는 경우에만 length가 2
          : eachBlockRef.current.childNodes[changeCaretPosition + 2]; // 코드 블럭 생기면 2개의 노드가 추가로 생기기 때문

      const newRange = document.createRange();
      newRange.setStart(targetNode, 1); // 코드 블럭 한 칸 뒤쪽 위치

      selection && selection.removeAllRanges();
      selection && selection.addRange(newRange);

      setCaretPosition(undefined); // 초기화
    }
  }, [changeCaretPosition]);

  return setCaretPosition;
};
