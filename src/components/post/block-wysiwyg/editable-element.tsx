import DOMPurify from 'dompurify';
import {
  ChangeEvent,
  Dispatch,
  FC,
  KeyboardEvent,
  SetStateAction,
  useRef,
  useState,
} from 'react';
import styles from './editable-element.module.scss';

type Props = {
  TagName: 'h1' | 'h2' | 'h3' | 'p';
  contentEditable: boolean;
  html: string;
  onInput?: (
    e: ChangeEvent<HTMLHeadingElement | HTMLParagraphElement>,
    setHtmlContent: Dispatch<SetStateAction<string>>
  ) => void;
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
  const [htmlContent, setHtmlContent] = useState<string>(html);

  const blurBlock = () => {
    ref.current?.blur();
  };

  const input = (e: ChangeEvent<HTMLHeadingElement | HTMLParagraphElement>) => {
    onInput && onInput(e, setHtmlContent);
  };

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
        // suppressContentEditableWarning={contentEditable}
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(htmlContent) }}
        onInput={input}
        onKeyPress={keyPress}
        spellCheck={spellCheck}
        placeholder={placeholder}
        className={customClassName}
      />
    </>
  );
};

export default EditableElement;
