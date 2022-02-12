export const focusContentEditableTextToEnd = (element: HTMLElement) => {
  if (element.innerText.length === 0) {
    element.focus();
    return;
  }

  const selection = window.getSelection();
  const newRange = document.createRange();
  newRange.selectNodeContents(element);
  newRange.collapse(false);
  selection?.removeAllRanges();
  selection?.addRange(newRange);
};

export function replaceCaret(element: HTMLElement) {
  if (element.innerText.length === 0) {
    element.focus();
    return;
  }

  // Place the caret at the end of the element
  const target = document.createTextNode('');
  element.appendChild(target);
  // do not move caret if element was not focused
  const isTargetFocused = document.activeElement === element;
  if (target !== null && target.nodeValue !== null && isTargetFocused) {
    const selection = window.getSelection();

    if (selection !== null) {
      const range = document.createRange();
      range.setStart(target, target.nodeValue.length);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    }

    if (element instanceof HTMLElement) element.focus();
  }
}
