export const getCaretIndex = (element: HTMLElement) => {
  let position;
  const isSupported = typeof window.getSelection !== 'undefined';

  if (isSupported) {
    const selection = window.getSelection();

    if (selection?.rangeCount !== 0) {
      const range = selection?.getRangeAt(0);
      const preCaretRange = range?.cloneRange();
      preCaretRange?.selectNodeContents(element);
      range && preCaretRange?.setEnd(range.endContainer, range.endOffset);
      position = preCaretRange?.toString().length;
    }
  }
  return position;
};
