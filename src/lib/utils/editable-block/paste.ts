import { MutableRefObject } from 'react';
import {
  getNewHtml,
  getNodeArray,
  getSelectionEnd,
  getSelectionStart,
  TMyNode,
} from './node';

export const paste = (
  eachBlockRef: MutableRefObject<HTMLElement>,
  setPasteData: (newHtml: string) => void
) => {
  navigator.clipboard.readText().then((clipText) => {
    const eachBlockChildNodes: NodeListOf<ChildNode> =
      eachBlockRef.current.childNodes;
    const nodeArray: TMyNode[] = getNodeArray(eachBlockChildNodes); // newHtml 만들기 위한 배열

    const selection: Selection | null = window.getSelection();
    const range = selection?.getRangeAt(0);
    const startContainer = range?.startContainer;
    const endContainer = range?.endContainer;
    const startOffset = range?.startOffset ?? 0; // 무조건 왼쪽, 오른쪽 // ?? 0으로 undefined 없애 코드량 감소시킴. 있을 것이 보장됨.
    const endOffset = range?.endOffset ?? 0; // 무조건 왼쪽, 오른쪽 // ?? 0으로 undefined 없애 코드량 감소시킴. 있을 것이 보장됨.
    const isSelection = !range?.collapsed; // isSelection 맥락 위해 !

    const { selectionStartIndex, selection__startNode__textArray } =
      getSelectionStart(eachBlockChildNodes, nodeArray, selection);

    // ***공통*** 아래 함수 속 for문을 통해 마지막 노드(선택 영역 없는 경우 커서 1개) 커서가 있는 노드 식별!

    // 여기서만 쓰이는 공통 함수, export 하려면 고쳐야 함.
    const pasteClipText__toSelectionStartNode = () => {
      // cliptText 붙여넣기
      selection__startNode__textArray.splice(startOffset, 0, clipText); // Start 노드 startOffset부터 붙여넣음
    };

    const setText__startNode__afterPaste = () => {
      // 배열 > 문자열
      const textAfterPaste = selection__startNode__textArray.join('');
      nodeArray[selectionStartIndex].textContent = textAfterPaste;
    };

    // 선택 영역 삭제
    const deleteSelection__startNode = (start: number, end: number): number => {
      const deleteRange = end - start;
      selection__startNode__textArray.splice(start, deleteRange);
      const startNode__length__afterDeleteRange =
        selection__startNode__textArray.length;
      return startNode__length__afterDeleteRange;
    };

    // 커서에서 붙여넣기
    // 정확한 위치에 clipText를 붙여넣으려면?
    // 1) tempEachBlockStateText가 아닌, 즉 전체 텍스트를 이용하는 게 아닌 ***커서가 있는 노드***의 텍스트를 바꿔줘아 한다.
    // 2) 그리고 다시 전체로 구성해줘야 한다.
    if (isSelection === false) {
      pasteClipText__toSelectionStartNode();
      setText__startNode__afterPaste();
    }

    // 드래그한 선택 영역 있을 경우, ***아래 if문은 김***
    // 1. 셀렉션 영역 모두 지운다
    // 2. 마지막 노드에 해당 텍스트를 붙여넣는다.
    if (isSelection === true) {
      // selectionEndIndex는 여기서만 쓰임
      const { selectionEndIndex, selection__endNode__textArray } =
        getSelectionEnd(eachBlockChildNodes, nodeArray, selection);

      const setText__endNode = () => {
        // *** endNode는 paste 없음!
        // 배열 > 문자열
        const finalEndNodeText = selection__endNode__textArray.join('');
        nodeArray[selectionEndIndex].textContent = finalEndNodeText;

        return finalEndNodeText;
      };

      const deleteSelection__endNode = (start: number, end: number): number => {
        const deleteRange = end - start;
        selection__endNode__textArray.splice(start, deleteRange);

        const endNode__length__afterDeleteRange =
          selection__endNode__textArray.length;

        return endNode__length__afterDeleteRange;
      };

      const case__located__sameNode: boolean =
        selectionEndIndex === selectionStartIndex;
      const case__located__differentNode: boolean =
        selectionEndIndex - selectionStartIndex > 0;

      // 같은 노드에 있다면
      if (case__located__sameNode) {
        // ***UX Logic*** '지운다'는 것은 Backspace가 보편적, 뒤에서 앞으로 지워진다. -> ***붙여넣는 위치는 StartIndex

        const pasteClipText__toSelectionStartNode__afterDeleteSelection =
          () => {
            deleteSelection__startNode(startOffset, endOffset);
            pasteClipText__toSelectionStartNode();
            setText__startNode__afterPaste();
          };

        pasteClipText__toSelectionStartNode__afterDeleteSelection();
      }

      if (case__located__differentNode) {
        /**
         * 전체 절차
         *** 1. Start 노드 선택 영역의 텍스트 삭제, Start 노드 전체가 선택됐다면 전체 노드 삭제(CODE인데 textContent가 없다면 <code> 노드 삭제)
         *** 2. End 노드
         *** 3. 중간 노드
         */

        // 1. Start 노드 선택 영역 삭제
        const startNode__length__afterDeleteRange = deleteSelection__startNode(
          startOffset,
          selection__startNode__textArray.length
        ); // *** 길이 0일 떄 CODE 요소 삭제하기 위해 필요

        const startNode__length__afterDeleteRange__and__paste: number =
          startNode__length__afterDeleteRange + clipText.length;

        pasteClipText__toSelectionStartNode();
        // 이후 if문에서 조건에 따라 setText__startNode__afterPaste()
        // ***paste되면서 길이가 달라지기 때문!
        setText__startNode__afterPaste(); // 내가 만든 Array에 textContent 넣기

        // 2. End 노드 영역 삭제
        const endNode__length__afterDeleteRange = deleteSelection__endNode(
          0,
          endOffset
        ); // End 노드는 처음부터 endOffset까지 삭제

        // endNode는 paste 없음.
        const finalEndNodeText = setText__endNode();

        // 3. 중간 노드 있다면 삭제

        // 아래 if문은 위 두 줄 코드를 포함해 start 노드의 텍스트가 없어질 경우 노드 삭제하고, 텍스트가 있을 경우 텍스트 삭제만 하는 코드
        // ***중요*** removeChildNodes__byCondition()를 실행하면 startIndex와 endIndex가 바뀔 수 있음.
        const removeChildNodes__byCondition = () => {
          const removeNode = (index: number): void => {
            eachBlockChildNodes[index].remove(); // 실제 노드 삭제
            nodeArray.splice(index, 1); // 내가 만든 배열 요소 삭제
          };

          // 지우는 순서는 End > Middle > Start
          const removeEndNode = () => {
            removeNode(selectionEndIndex);
          };

          const removeMiddleNode = (): void => {
            // ***중요*** 큰 index부터 시작해야 삭제 순서가 꼬이지 않음 > 큰 index 요소부터 삭제한다는 뜻
            for (let i = selectionEndIndex - 1; selectionStartIndex < i; i--) {
              removeNode(i);
            }
          };

          const removeStartNode = () => {
            removeNode(selectionStartIndex);
          };

          // 'CODE'일 떄 문제가 생기기 때문에 따로 제어해줘야 한다. -> 텍스트 길이가 0일 때 코드 노드를 지워줘야 함.
          // 1) isEmpty__endCODENode
          // 2) clipText === ' '

          const isEmpty__endCODENode: boolean =
            nodeArray[selectionEndIndex].nodeName === 'CODE' &&
            endNode__length__afterDeleteRange === 0;

          if (isEmpty__endCODENode) {
            // console.log('isEmpty__endCODENode');
            removeEndNode();
            removeMiddleNode(); // 지우는 순서는 End > Middle > Start
          }
          // else가 일반적인 경우
          else {
            removeMiddleNode(); // 여기선 인덱스가 변하지 않음.
          }

          const isSpacing__clipText: boolean = clipText === ' ';
          isSpacing__clipText && removeStartNode(); // clipText가 spacing이면 지울 수 없는 코드 블럭이 남기 때문에. // index 순서상 마지막에
        };
        removeChildNodes__byCondition();
      }
    }

    const newHtml = getNewHtml(nodeArray);
    setPasteData(newHtml);

    // setPasteData 데이터 업데이트 이후에 caret 위치 조정
    focus__afterSetClipText(
      eachBlockRef,
      eachBlockChildNodes,
      selectionStartIndex,
      clipText.length,
      startOffset,
      selection
    );
  });
};

const focus__afterSetClipText = (
  eachBlockRef: MutableRefObject<HTMLElement>,
  eachBlockChildNodes: NodeListOf<ChildNode>,
  selectionStartIndex: number,
  clipTextLength: number,
  startOffset: number,
  selection: Selection | null
) => {
  if (eachBlockChildNodes.length === 0 || eachBlockChildNodes === undefined) {
    eachBlockRef.current.focus();
    return;
  }

  const targetNode =
    eachBlockChildNodes[selectionStartIndex].nodeName === 'CODE'
      ? eachBlockChildNodes[selectionStartIndex].childNodes[0]
      : eachBlockChildNodes[selectionStartIndex];

  const newCaretPosition = startOffset + clipTextLength;

  const newRange = document.createRange();
  newCaretPosition && newRange.setStart(targetNode, newCaretPosition); // 코드 블럭 한 칸 뒤쪽 위치

  selection && selection.removeAllRanges();
  selection && selection.addRange(newRange);
};
