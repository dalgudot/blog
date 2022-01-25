import DOMPurify from 'dompurify';
import { ChangeEvent, FC, KeyboardEvent, useEffect, useRef } from 'react';
import { IRefData } from '../../../redux-toolkit/model/ref-data-model';
import styles from './editable-element.module.scss';

type Props = {
  TagName: 'h1' | 'h2' | 'h3' | 'p';
  contentEditable: boolean;
  datas: IRefData[];
  currentIndex: number;
  html: string;
  onInput?: (e: ChangeEvent<HTMLHeadingElement | HTMLParagraphElement>) => void;
  onKeyPress?: (e: KeyboardEvent<HTMLElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLElement>) => void;
  spellCheck?: boolean;
  placeholder?: string;
  customClassName?: string;
};

const EditableElement: FC<Props> = ({
  TagName,
  contentEditable,
  datas,
  currentIndex,
  html,
  onInput,
  onKeyPress,
  onKeyDown,
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

  // 새로 생성된 블럭의 커서 위치, 다음 블럭이 지워졌을 때 focus()
  useEffect(() => {
    contentEditable &&
      ref.current &&
      focusContentEditableTextToEnd(ref.current);

    // 다음 블럭 지워진 걸 감지하는 의존성 배열
    // 여기서 받아온 datas는 초기화 및 블럭의 생성과 삭제만 담당하는 클라이언트 데이터, 따라서 삭제된 시점을 정확히 알 수 있음.
  }, [datas[currentIndex + 1]]);

  return (
    <>
      <TagName
        ref={ref}
        contentEditable={contentEditable}
        suppressContentEditableWarning={contentEditable}
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
        onInput={onInput}
        onKeyPress={onKeyPress}
        onKeyDown={onKeyDown}
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
