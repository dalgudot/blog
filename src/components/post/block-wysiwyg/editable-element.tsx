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
};

const EditableElement: FC<Props> = ({
  TagName,
  contentEditable,
  html,
  onInput,
  spellCheck = false,
  placeholder = '',
  customClassName = styles.editable__element,
}) => {
  const ref = useRef<HTMLHeadingElement | HTMLParagraphElement>(null);
  const mounted = useMounted(); // for SSR

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
