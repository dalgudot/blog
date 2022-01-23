import { useMounted } from '@dalgu/react-utility-hooks';
import DOMPurify from 'dompurify';
import { FC } from 'react';
import styles from './editable-element.module.scss';

type Props = {
  TagName: 'h1' | 'h2' | 'h3' | 'p' | 'code';
  contentEditable: boolean;
  html: string;
  spellCheck?: boolean;
  placeholder?: string;
  customClassName?: string;
};

const EditableElement: FC<Props> = ({
  TagName,
  contentEditable,
  html,
  spellCheck = false,
  placeholder = '',
  customClassName = styles.editable__element,
}) => {
  const mounted = useMounted(); // for SSR

  return (
    <>
      {mounted && (
        <TagName
          contentEditable={contentEditable}
          suppressContentEditableWarning={contentEditable}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
          spellCheck={spellCheck}
          placeholder={placeholder}
          className={customClassName}
        />
      )}
    </>
  );
};

export default EditableElement;
