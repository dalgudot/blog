import { MutableRefObject } from 'react';
import {
  getNewHtml,
  getNodeArray,
  getSelectionEnd,
  getSelectionEndIndex,
  getSelectionStart,
  getSelectionStartIndex,
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
    const { selectionStartIndex, selectionStartNodeTextArray } =
      getSelectionStart(eachBlockChildNodes, nodeArray);

    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);
    const startContainer = range?.startContainer; // 무조건 왼쪽, 오른쪽
    const endContainer = range?.endContainer; // 무조건 왼쪽, 오른쪽
    const startOffset = range?.startOffset ?? 0; // 무조건 왼쪽, 오른쪽 // ?? 0으로 undefined 없애 코드량 감소시킴. 있을 것이 보장됨.
    const endOffset = range?.endOffset ?? 0; // 무조건 왼쪽, 오른쪽 // ?? 0으로 undefined 없애 코드량 감소시킴. 있을 것이 보장됨.
    const isSelection = !range?.collapsed; // isSelection 맥락 위해 !

    // ***공통*** 아래 함수 속 for문을 통해 마지막 노드(선택 영역 없는 경우 커서 1개) 커서가 있는 노드 식별!

    // 여기서만 쓰이는 공통 함수, export 하려면 고쳐야 함.
    const pasteClipText__toSelectionStartNode = () => {
      // cliptText 붙여넣기
      selectionStartNodeTextArray?.splice(startOffset, 0, clipText);
      // 배열 > 문자열
      const textAfterPaste = selectionStartNodeTextArray?.join('');
      nodeArray[selectionStartIndex].textContent = textAfterPaste;
    };

    // 커서에서 붙여넣기
    // 정확한 위치에 clipText를 붙여넣으려면?
    // 1) tempEachBlockStateText가 아닌, 즉 전체 텍스트를 이용하는 게 아닌 ***커서가 있는 노드***의 텍스트를 바꿔줘아 한다.
    // 2) 그리고 다시 전체로 구성해줘야 한다.
    if (isSelection === false) {
      pasteClipText__toSelectionStartNode();
    }

    // 드래그한 선택 영역 있을 경우, ***아래 if문은 김***
    // 1. 셀렉션 영역 모두 지운다
    // 2. 마지막 노드에 해당 텍스트를 붙여넣는다.
    if (isSelection === true) {
      // selectionEndIndex는 여기서만 쓰임
      const { selectionEndIndex, selectionEndNodeTextArray } = getSelectionEnd(
        eachBlockChildNodes,
        nodeArray
      );

      const caseOfLocatedOnOneNode: boolean =
        selectionEndIndex === selectionStartIndex;
      const caseOfLocatedOnDifferentNode: boolean =
        selectionEndIndex - selectionStartIndex > 0;

      // 같은 노드에 있다면
      if (caseOfLocatedOnOneNode) {
        // ***UX Logic*** '지운다'는 것은 Backspace가 보편적, 뒤에서 앞으로 지워진다. -> ***붙여넣는 위치는 StartIndex
        const deleteSelectionArea = () => {
          const lengthToDelete = endOffset - startOffset;
          selectionStartNodeTextArray?.splice(startOffset, lengthToDelete);
        };

        const pasteClipText__toSelectionStartNode__afterDeleteSelectionArea =
          () => {
            // 선택 영역 삭제
            deleteSelectionArea();
            pasteClipText__toSelectionStartNode();
          };

        pasteClipText__toSelectionStartNode__afterDeleteSelectionArea();
      }

      if (caseOfLocatedOnDifferentNode) {
        /**
         * 전체 절차
         *** 1. Start 노드 선택 영역의 텍스트 삭제, Start 노드 전체가 선택됐다면 전체 노드 삭제(CODE인데 textContent가 없다면 <code> 노드 삭제)
         *** 2. End 노드
         *** 3. 중간 노드 삭제
         */

        // Start 노드 선택 영역 삭제
        const startNodeRemoveRange =
          selectionStartNodeTextArray?.length !== undefined &&
          selectionStartNodeTextArray?.length - startOffset;

        startNodeRemoveRange !== false &&
          selectionStartNodeTextArray?.splice(
            startOffset,
            startNodeRemoveRange
          );

        // 순서는 위 splice 다음
        const selectionStartNodeTextArrayAfterRemoveLength =
          selectionStartNodeTextArray?.length; // *** 길이 0일 떄 CODE 요소 삭제하기 위해 필요

        // End 노드, End 노드는 처음부터 endOffset까지 삭제
        // End 노드 영역 삭제
        endOffset !== undefined &&
          selectionEndNodeTextArray?.splice(0, endOffset); // End 노드는 처음부터 endOffset까지 삭제

        // 순서는 위 splice 다음
        const selectionEndNodeTextArrayAfterRemoveLength =
          selectionEndNodeTextArray?.length; // *** 길이 0일 떄 CODE 요소 삭제하기 위해 필요

        // End 노드 offset 0부터 cliptText 붙여넣기
        endOffset !== undefined &&
          selectionEndNodeTextArray?.splice(0, 0, clipText); // End 노드는 0부터 붙여야 함

        // setFinalStartNodeText()만 아래 if문에서 쓰임 -> index 맞추기 위해
        const setFinalStartNodeText = () => {
          const finalStartNodeText = selectionStartNodeTextArray?.join('');
          nodeArray[selectionStartIndex].textContent = finalStartNodeText;
        };

        const finalEndNodeText = selectionEndNodeTextArray?.join('');
        nodeArray[selectionEndIndex].textContent = finalEndNodeText; // 내가 만든 Array에 textContent 넣기

        const removeChildNode = (index: number) => {
          eachBlockChildNodes[index].remove(); // 실제 노드 삭제
          nodeArray.splice(index, 1); // 내가 만든 배열 요소 삭제
        };

        const removeMiddleNode = () => {
          // ***중요*** 큰 index부터 시작해야 삭제 순서가 꼬이지 않음 > 큰 index 요소부터 삭제한다는 뜻
          for (let i = selectionEndIndex - 1; i > selectionStartIndex; i--) {
            // console.log('i,', i);
            removeChildNode(i);
          }
        };
        // 여기서 removeMiddleNode() 실행시키면 아래 if문 조건에서 selectionEndIndex, selectionStartIndex를 쓸 수 없게 됨.
        // > 각 조건에서 각각 실행시켜줘야 함!
        const middleNodeCount = selectionEndIndex - selectionStartIndex - 1;

        // 아래 if문은 위 두 줄 코드를 포함해 start 노드의 텍스트가 없어질 경우 노드 삭제하고, 텍스트가 있을 경우삭제만 하는 코드
        // *** 허나 여기서 index를 바꾸면 위쪽 End 노드 코드에 selectionEndIndex 변화로 영향 끼치기 때문에 End 노드 작업 이후에 여기서!
        if (
          selectionStartNodeTextArrayAfterRemoveLength === 0 &&
          nodeArray[selectionStartIndex].nodeName === 'CODE'
        ) {
          // CODE 노드를 삭제하면 기존에 selectionStartIndex, selectionEndIndex를 쓸 수 없게 때문에 2중 if문으로 숫자 계산해서 한꺼번에 처리
          if (
            selectionEndNodeTextArrayAfterRemoveLength === 0 &&
            nodeArray[selectionEndIndex].nodeName === 'CODE'
          ) {
            removeMiddleNode();
            removeChildNode(selectionStartIndex);
            removeChildNode(selectionEndIndex - middleNodeCount - 1); // 이미 selectionStartIndex 제거했으므로 -1
          } else {
            removeMiddleNode();
            removeChildNode(selectionStartIndex);
          }
          //
        } else if (
          (finalEndNodeText === '' || finalEndNodeText === ' ') &&
          nodeArray[selectionEndIndex].nodeName === 'CODE'
        ) {
          //
          if (
            selectionStartNodeTextArrayAfterRemoveLength === 0 &&
            nodeArray[selectionStartIndex].nodeName === 'CODE'
          ) {
            removeMiddleNode();
            removeChildNode(selectionStartIndex);
            removeChildNode(selectionEndIndex - middleNodeCount - 1); // 이미 selectionStartIndex 제거했으므로 -1
          } else {
            setFinalStartNodeText(); // start 노드 업데이트된 텍스트 여기서는 삭제되지 않으므로, 넣어줘야
            removeMiddleNode();
            removeChildNode(selectionEndIndex - middleNodeCount);
          }
          //
        } else {
          removeMiddleNode(); // 여기선 인덱스가 변하지 않음.
          setFinalStartNodeText(); // 내가 만든 Array에 textContent 넣기
        }
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
  console.log('isSelection');
};
