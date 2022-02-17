import { backTag, frontTag } from './add-inline-code-block';

export type TMyNode = {
  nodeName: '#text' | 'CODE';
  textContent: string | null | undefined;
};

// newHtml 만들기 위한 배열인 nodeArray 리턴
export const getNodeArray = (nodeList: NodeListOf<ChildNode>): TMyNode[] => {
  const nodesLength = nodeList.length;
  const nodeArray: TMyNode[] = [];

  // 아무 텍스트도 없는 경우, 즉 플레이스 홀더가 보이는 경우
  if (nodesLength === 0) {
    nodeArray.push({
      nodeName: '#text',
      textContent: '',
    });
  } else {
    for (let i = 0; i < nodesLength; i++) {
      nodeArray.push({
        nodeName: nodeList[i].nodeName as '#text' | 'CODE',
        textContent: nodeList[i].textContent, // nodeValue 대신 textContent로 해야, <code></code> 안의 텍스트 가져옴
      });
    }
  }

  return nodeArray;
};

export const getNewHtml = (nodeArray: TMyNode[]) => {
  const nodesLength = nodeArray.length;
  let newHtml: string = '';

  for (let i = 0; i < nodesLength; i++) {
    if (nodeArray[i].nodeName === '#text') {
      newHtml = `${newHtml}${nodeArray[i].textContent}`;
      // console.log('for', '#text', newHtml);
    }

    if (nodeArray[i].nodeName === 'CODE') {
      newHtml = `${newHtml}${frontTag}${
        nodeArray[i].textContent
      }${backTag.replace(/\u00A0/, '')}`;
      // console.log('for', 'CODE', newHtml);
    }
  }

  // console.log('newHtml', newHtml);

  return newHtml;
};

export const getSelectionStart = (
  nodeList: NodeListOf<ChildNode>,
  nodeArray: TMyNode[],
  selection: Selection | null
) => {
  const selectionStartIndex: number = getSelectionStartIndex(
    nodeList,
    selection
  );
  const selectionStartNodeText: string =
    nodeArray[selectionStartIndex].textContent ?? '';
  const selection__startNode__textArray: string[] =
    selectionStartNodeText?.split('') ?? [];

  // console.log('selectionStartIndex', selectionStartIndex);

  return { selectionStartIndex, selection__startNode__textArray };
};

export const getSelectionEnd = (
  nodeList: NodeListOf<ChildNode>,
  nodeArray: TMyNode[],
  selection: Selection | null
) => {
  const selectionEndIndex: number = getSelectionEndIndex(nodeList, selection);
  const selectionEndNodeText: string =
    nodeArray[selectionEndIndex].textContent ?? '';
  const selection__endNode__textArray: string[] =
    selectionEndNodeText?.split('') ?? [];

  // console.log('selectionEndIndex', selectionEndIndex);

  return { selectionEndIndex, selection__endNode__textArray };
};

export const getSelectionStartIndex = (
  nodeList: NodeListOf<ChildNode>,
  selection: Selection | null
) => {
  const nodesLength = nodeList.length;
  const range = selection?.getRangeAt(0);
  const startContainer = range?.startContainer;

  let selectionStartIndex: number = 0;

  for (let i = 0; i < nodesLength; i++) {
    if (
      nodeList[i].nodeName === '#text' &&
      startContainer?.isSameNode(nodeList[i])
    ) {
      selectionStartIndex = i;
    }

    if (
      nodeList[i].nodeName === 'CODE' &&
      startContainer?.isSameNode(nodeList[i].childNodes[0])
    ) {
      selectionStartIndex = i;
    }

    if (selectionStartIndex !== 0) {
      break;
    }
  }

  return selectionStartIndex;
};

export const getSelectionEndIndex = (
  nodeList: NodeListOf<ChildNode>,
  selection: Selection | null
) => {
  const nodesLength = nodeList.length;
  let selectionEndIndex: number = 0;

  const range = selection?.getRangeAt(0);
  const endContainer = range?.endContainer;

  for (let i = 0; i < nodesLength; i++) {
    if (
      nodeList[i].nodeName === '#text' &&
      endContainer?.isSameNode(nodeList[i])
    ) {
      selectionEndIndex = i;
    }

    if (
      nodeList[i].nodeName === 'CODE' &&
      endContainer?.isSameNode(nodeList[i].childNodes[0])
    ) {
      selectionEndIndex = i;
    }

    if (selectionEndIndex !== 0) {
      break;
    }
  }

  return selectionEndIndex;
};

// https://jungpaeng.tistory.com/86
// range.startContainer: 범위가 시작하는 부분을 포함하고 있는 노드
// range.endContainter: 범위가 끝나는 부분을 포함하고 있는 노드
// range.startOffset: startContainer에서 범위가 시작하는 지점의 offset
// // // // // startContainer가 TEXT_NODE라면 문자의 갯수
// // // // // startContainer가 ELEMENT_NODE라면 자식 노드의 인덱스
// range.endOffset: endContainer에서 범위가 끝나는 지점의 offset
// // // // // startOffset과 동일한 규칙이 적용
// range.collapsed: Range의 시작점과 끝점이 같은 위치인지 알 수 있는 boolean 값을 반환

// https://gdtbgl93.tistory.com/175
