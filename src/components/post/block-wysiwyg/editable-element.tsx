import DOMPurify from 'dompurify';
import { ChangeEvent, FC, KeyboardEvent, useEffect, useRef } from 'react';
import styles from './editable-element.module.scss';

type Props = {
  TagName: 'h1' | 'h2' | 'h3' | 'p';
  contentEditable: boolean;
  html: string;
  onInput?: (e: ChangeEvent<HTMLHeadingElement | HTMLParagraphElement>) => void;
  onKeyPress?: (
    e: KeyboardEvent<HTMLHeadingElement | HTMLParagraphElement>,
    blurBlock: () => void
  ) => void;
  spellCheck?: boolean;
  placeholder?: string;
  customClassName?: string;
};

const EditableElement: FC<Props> = ({
  TagName,
  contentEditable,
  html,
  onInput,
  onKeyPress,
  spellCheck = false,
  placeholder = '',
  customClassName = styles.editable__element,
}) => {
  const ref = useRef<HTMLHeadingElement | HTMLParagraphElement>(null);

  const focusBlock = () => {
    ref.current?.focus();
  };

  const blurBlock = () => {
    ref.current?.blur();
  };

  // 새로 생성된 블럭의 커서 위치
  useEffect(() => {
    ref.current && focusContentEditableTextToEnd(ref.current);
  }, []);

  const keyPress = (
    e: KeyboardEvent<HTMLHeadingElement | HTMLParagraphElement>
  ) => {
    onKeyPress && onKeyPress(e, blurBlock);
  };

  return (
    <>
      <TagName
        ref={ref}
        contentEditable={contentEditable}
        suppressContentEditableWarning={contentEditable}
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
        onInput={onInput}
        onKeyPress={keyPress}
        spellCheck={spellCheck}
        placeholder={placeholder}
        className={customClassName}
      />
    </>
  );
};

export default EditableElement;

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
