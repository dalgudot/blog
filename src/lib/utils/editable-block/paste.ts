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
    const clipTextLength = clipText.length;
    const eachBlockChildNodes = eachBlockRef.current.childNodes;
    const nodeArray: TMyNode[] = getNodeArray(eachBlockChildNodes);

    const selection: Selection | null = window.getSelection();
    const range = selection?.getRangeAt(0);
    const startContainer = range?.startContainer; // 무조건 왼쪽, 오른쪽
    const endContainer = range?.endContainer; // 무조건 왼쪽, 오른쪽
    const startOffset = range?.startOffset ?? 0; // 무조건 왼쪽, 오른쪽 // ?? 0으로 undefined 없애 코드량 감소시킴. 있을 것이 보장됨.
    const endOffset = range?.endOffset ?? 0; // 무조건 왼쪽, 오른쪽 // ?? 0으로 undefined 없애 코드량 감소시킴. 있을 것이 보장됨.
    const isSelection = !range?.collapsed; // isSelection 맥락 위해 !

    const { selectionStartIndex, selection__startNode__textArray } =
      getSelectionStart(eachBlockChildNodes, nodeArray, selection);

    // ***공통*** 아래 함수 속 for문을 통해 마지막 노드(선택 영역 없는 경우 커서 1개) 커서가 있는 노드 식별!

    // 여기서만 쓰이는 공통 함수, export 하려면 고쳐야 함.
    const pasteClipText__toSelection__startNode = () => {
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
      pasteClipText__toSelection__startNode();
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

        const pasteClipText__toSelection__startNode__afterDeleteSelection =
          () => {
            deleteSelection__startNode(startOffset, endOffset);
            pasteClipText__toSelection__startNode();
            setText__startNode__afterPaste();
          };

        pasteClipText__toSelection__startNode__afterDeleteSelection();
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

        pasteClipText__toSelection__startNode();
        // 이후 if문에서 조건에 따라 setText__startNode__afterPaste()
        // ***paste되면서 길이가 달라지기 때문!

        // 2. End 노드 영역 삭제
        const endNode__length__afterDeleteRange = deleteSelection__endNode(
          0,
          endOffset
        ); // End 노드는 처음부터 endOffset까지 삭제

        const finalEndNodeText = setText__endNode();

        // 3. 중간 노드 있다면 삭제
        // 아래 if문은 위 두 줄 코드를 포함해 start 노드의 텍스트가 없어질 경우 노드 삭제하고, 텍스트가 있을 경우 텍스트 삭제만 하는 코드
        const removeChildeNode__byCondition = () => {
          const middleNodeCount = selectionEndIndex - selectionStartIndex - 1;

          const removeChildNode = (index: number) => {
            eachBlockChildNodes[index].remove(); // 실제 노드 삭제
            nodeArray.splice(index, 1); // 내가 만든 배열 요소 삭제
          };

          const removeMiddleNode = () => {
            // ***중요*** 큰 index부터 시작해야 삭제 순서가 꼬이지 않음 > 큰 index 요소부터 삭제한다는 뜻
            for (let i = selectionEndIndex - 1; i > selectionStartIndex; i--) {
              removeChildNode(i);
            }
          };
          // 여기서 removeMiddleNode() 실행시키면 아래 if문 조건에서 selectionEndIndex, selectionStartIndex를 쓸 수 없게 됨.
          // > 각 조건에서 각각 실행시켜줘야 함!

          if (
            startNode__length__afterDeleteRange === 0 &&
            nodeArray[selectionStartIndex].nodeName === 'CODE'
          ) {
            // CODE 노드를 삭제하면 기존에 selectionStartIndex, selectionEndIndex를 쓸 수 없게 때문에 2중 if문으로 숫자 계산해서 한꺼번에 처리
            if (
              endNode__length__afterDeleteRange === 0 &&
              nodeArray[selectionEndIndex].nodeName === 'CODE'
            ) {
              removeMiddleNode();
              removeChildNode(selectionStartIndex);
              removeChildNode(selectionEndIndex - middleNodeCount - 1); // 이미 selectionStartIndex 제거했으므로 -1
            } else {
              removeMiddleNode();
              removeChildNode(selectionStartIndex);
            }
          }
          //
          else if (
            (finalEndNodeText === '' || finalEndNodeText === ' ') &&
            nodeArray[selectionEndIndex].nodeName === 'CODE'
          ) {
            if (
              startNode__length__afterDeleteRange === 0 &&
              nodeArray[selectionStartIndex].nodeName === 'CODE'
            ) {
              removeMiddleNode();
              removeChildNode(selectionStartIndex);
              removeChildNode(selectionEndIndex - middleNodeCount - 1); // 이미 selectionStartIndex 제거했으므로 -1
            } else {
              setText__startNode__afterPaste(); // start 노드 업데이트된 텍스트 여기서는 삭제되지 않으므로, 넣어줘야
              removeMiddleNode();
              removeChildNode(selectionEndIndex - middleNodeCount);
            }
          }
          //
          else {
            removeMiddleNode(); // 여기선 인덱스가 변하지 않음.
            setText__startNode__afterPaste(); // 내가 만든 Array에 textContent 넣기
          }
        };
        removeChildeNode__byCondition();
      }
    }

    const newHtml = getNewHtml(nodeArray);
    setPasteData(newHtml);

    // setPasteData 데이터 업데이트 이후에 caret 위치 조정
    if (!isSelection) {
      focus__afterClipText__whenCollapsed(
        eachBlockRef,
        selectionStartIndex,
        clipTextLength,
        startOffset,
        selection
      );
    }

    if (isSelection) {
      focus__afterClipText__whenNotCollapsed();
    }
  });
};

const focus__afterClipText__whenCollapsed = (
  eachBlockRef: MutableRefObject<HTMLElement>,
  // ***붙여넣기가 끝난 뒤의 current를 봐야 하므로*** eachBlockChildNodes가 아닌 eachBlockRef을 받아와야 함.
  selectionStartIndex: number,
  clipTextLength: number,
  startOffset: number,
  selection: Selection | null
) => {
  const targetNode =
    eachBlockRef.current.childNodes[selectionStartIndex].nodeName === 'CODE'
      ? eachBlockRef.current.childNodes[selectionStartIndex].childNodes[0]
      : eachBlockRef.current.childNodes[selectionStartIndex];

  const newCaretPosition = startOffset + clipTextLength;

  const newRange = document.createRange();
  newCaretPosition && newRange.setStart(targetNode, newCaretPosition); // 코드 블럭 한 칸 뒤쪽 위치

  selection && selection.removeAllRanges();
  selection && selection.addRange(newRange);
};

const focus__afterClipText__whenNotCollapsed = () => {
  // console.log('isSelection');
};
