import { KeyboardEvent } from 'react';
import { getSelectionStartIndex } from './node';

export const moveCaret__betweenInlineCodeAndSpacing = (
  childeNodes: NodeListOf<ChildNode>,
  e: KeyboardEvent<HTMLElement>
) => {
  // 이 경우 커서만 이동할 뿐 서버에 저장될 데이터는 전후로 동일함.
  // 즉 커서만 이동할 뿐 데이터는 동기화된 상태
  const selection: Selection | null = window.getSelection();
  const range = selection?.getRangeAt(0);
  const collapsed = range?.collapsed;

  const selectionStartIndex = getSelectionStartIndex(childeNodes, selection);

  if (
    collapsed &&
    selectionStartIndex !== 0 &&
    // 내부 블럭 오른쪽 빈 칸은 지울 수 없도록 한다
    // childeNodes[selectionStartIndex].textContent ===
    //   ('\u00A0' || '&nbsp;' || ' ') &&
    childeNodes[selectionStartIndex - 1].nodeName === 'CODE'
  ) {
    e.preventDefault();
    const targetNode = childeNodes[selectionStartIndex - 1].childNodes[0];
    const newCaretPosition = targetNode.textContent?.length;

    if (newCaretPosition !== undefined) {
      const newRange = document.createRange();
      newRange.setStart(targetNode, newCaretPosition); // 코드 블럭 한 칸 뒤쪽 위치

      selection && selection.removeAllRanges();
      selection && selection.addRange(newRange);
    }
  }
};
