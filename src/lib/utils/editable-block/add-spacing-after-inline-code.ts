import { Dispatch, KeyboardEvent, SetStateAction } from 'react';
import {
  getNewHtml,
  getNodeArray,
  getSelectionEndIndex,
  TMyNode,
} from './node';

export const addSpacing__afterInlineCode = (
  childeNodes: NodeListOf<ChildNode>,
  e: KeyboardEvent<HTMLElement>,
  setData__withForcedReactRendering: (newHtml: string) => void,
  setIndexAddedSpacing: Dispatch<SetStateAction<number | undefined>>
) => {
  const selection: Selection | null = window.getSelection();
  const range = selection?.getRangeAt(0);
  const endContainr: Node | undefined = range?.endContainer; // 커서, 셀렉션인 경우 모두 대비 가능
  const endOffset = range?.endOffset;
  const selectionEndIndex = getSelectionEndIndex(childeNodes, selection);
  const nextIndex = selectionEndIndex + 1;

  const isCodeNode: boolean = endContainr?.parentNode?.nodeName === 'CODE';
  const isEndText: boolean = endContainr?.textContent?.length === endOffset;
  const isEmptyNextNode: boolean = childeNodes[nextIndex] === undefined;

  if (isCodeNode && isEndText && isEmptyNextNode) {
    e.preventDefault();
    const nodeArray: TMyNode[] = getNodeArray(childeNodes);
    const spacing = '\u00A0';

    const currentHtml = getNewHtml(nodeArray);
    const addSpacing__afterCurrentHtml = `${currentHtml}${spacing}`;

    setData__withForcedReactRendering(addSpacing__afterCurrentHtml);

    setIndexAddedSpacing(nextIndex);
  }
};
