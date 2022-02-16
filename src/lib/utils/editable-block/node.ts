import { backTag, frontTag } from './add-inline-code-block';

export type TMyNode = {
  nodeName: '#text' | 'CODE';
  textContent: string | null | undefined;
};

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

export const getSelectionEndIndex = (nodeList: NodeListOf<ChildNode>) => {
  const nodesLength = nodeList.length;
  let selectionEndIndex: number = 0;

  const selection = window.getSelection();
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
      endContainer?.isSameNode(nodeList[i].childNodes.item(0))
    ) {
      selectionEndIndex = i;
    }

    if (selectionEndIndex !== 0) {
      break;
    }
  }

  return selectionEndIndex;
};

export const getSelectionStartIndex = (nodeList: NodeListOf<ChildNode>) => {
  const nodesLength = nodeList.length;
  let selectionStartIndex: number = 0;

  const selection = window.getSelection();
  const range = selection?.getRangeAt(0);
  const startContainer = range?.startContainer;

  for (let i = 0; i < nodesLength; i++) {
    if (
      nodeList[i].nodeName === '#text' &&
      startContainer?.isSameNode(nodeList[i])
    ) {
      selectionStartIndex = i;
    }

    if (
      nodeList[i].nodeName === 'CODE' &&
      startContainer?.isSameNode(nodeList[i].childNodes.item(0))
    ) {
      selectionStartIndex = i;
    }

    if (selectionStartIndex !== 0) {
      break;
    }
  }

  return selectionStartIndex;
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

  return newHtml;
};
