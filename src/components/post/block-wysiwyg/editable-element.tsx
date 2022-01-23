import { useMounted } from '@dalgu/react-utility-hooks';
import DOMPurify from 'dompurify';
import { ChangeEvent, FC, useEffect, useRef } from 'react';
import styles from './editable-element.module.scss';

type Props = {
  TagName: 'h1' | 'h2' | 'h3' | 'p';
  contentEditable: boolean;
  html: string;
  onInput?: (e: ChangeEvent<HTMLParagraphElement>) => void;
  spellCheck?: boolean;
  placeholder?: string;
  customClassName?: string;
  setData?: any;
};

const EditableElement: FC<Props> = ({
  TagName,
  contentEditable,
  html,
  onInput,
  spellCheck = false,
  placeholder = '',
  customClassName = styles.editable__element,
  setData,
}) => {
  const ref = useRef<HTMLHeadingElement | HTMLParagraphElement>(null);
  const mounted = useMounted(); // for SSR

  // useEffect(() => {
  //   ref.current && ref.current.focus();
  //   ref.current && replaceCaret(ref.current);
  // }, [html]);

  useEffect(() => {
    ref.current?.addEventListener(
      'blur',
      () => {
        setData();
        console.log('blur');
      },
      false
    );
  }, []);

  return (
    <>
      {mounted && (
        <TagName
          ref={ref}
          contentEditable={contentEditable}
          // suppressContentEditableWarning={contentEditable}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
          onInput={onInput}
          spellCheck={spellCheck}
          placeholder={placeholder}
          className={customClassName}
        />
      )}
    </>
  );
};

export default EditableElement;

function replaceCaret(element: HTMLElement) {
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

const focusContentEditableTextToEnd = (element: HTMLElement) => {
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
