import DOMPurify from 'dompurify';
import { ChangeEvent, FC, KeyboardEvent, useEffect, useRef } from 'react';
import { focusContentEditableTextToEnd } from '../../lib/utils/focus-content-editable-text-to-end';
import styles from './editable-element.module.scss';

type Props = {
  TagName: 'h1' | 'h2' | 'h3' | 'p';
  contentEditable: boolean;
  html: string;
  onInput?: (e: ChangeEvent<HTMLHeadingElement | HTMLParagraphElement>) => void;
  onKeyPress?: (e: KeyboardEvent<HTMLElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLElement>) => void;
  syncPasteText: (newInnerPurePasteText: string) => void;
  spellCheck?: boolean;
  placeholder?: string;
  customClassName?: string;
};

// 개별로 쓸 수 있도록 만들거나, map()으로 블록 만들 때도 쓸 수 있도록 만든 컴포넌트 > 아마 텍스트에만 쓰일 듯.
const EditableElement: FC<Props> = ({
  TagName,
  contentEditable,
  html,
  onInput,
  onKeyPress,
  onKeyDown,
  syncPasteText,
  spellCheck = false,
  placeholder = '',
  customClassName = styles.editable__element,
}) => {
  const ref = useRef<HTMLHeadingElement | HTMLParagraphElement>(null);

  // 블록 안에 ``을 추가하거나 블록을 지울 때의 focusing은 여기가 아닌 <EditableElementSwitch />에서 관리해야 함.

  useEffect(() => {
    const getTextDataFromClipboard = (e: ClipboardEvent) => {
      e.preventDefault();
      const pastedData = e.clipboardData;
      const textData = pastedData?.getData('Text');

      // contentEditable의 innerHtml, TempRef, setText 모두 동기화!
      if (ref.current) {
        // (TODO) 가장 뒤에 붙여넣기가 되므로 고칠 필요가 있음. -> 셀렉션 커서 혹은 영역을 찾아서 각각 대응해줘야 함.
        const newInnerPurePasteText = DOMPurify.sanitize(
          `${ref.current.innerHTML}${textData}`
        );
        ref.current.innerHTML = newInnerPurePasteText;

        syncPasteText(newInnerPurePasteText); // 데이터 싱크를 위해 dispatch 및 setText 함수를 받아와 실행
        focusContentEditableTextToEnd(ref.current);
      }
    };

    ref.current?.addEventListener('paste', (e: ClipboardEvent) => {
      getTextDataFromClipboard(e);
    });

    return ref.current?.removeEventListener('paste', (e: ClipboardEvent) => {
      getTextDataFromClipboard(e);
    });
  }, []);

  return (
    <>
      <TagName
        ref={ref}
        contentEditable={contentEditable}
        suppressContentEditableWarning={contentEditable}
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
        onInput={onInput}
        onKeyPress={onKeyPress} // optional, 블록 추가
        onKeyDown={onKeyDown} // optional, 블록 삭제
        spellCheck={spellCheck}
        placeholder={placeholder}
        className={customClassName}
      />
    </>
  );
};

export default EditableElement;
