import {
  ChangeEvent,
  Dispatch,
  FC,
  KeyboardEvent,
  SetStateAction,
  useEffect,
  useRef,
} from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { focusContentEditableTextToEnd } from '../../../../lib/utils/focus-content-editable-text-to-end';
import { IParagraphData } from '../../../../redux-toolkit/model/post-data-model';
import { useAppDispatch } from '../../../../redux-toolkit/store';
import styles from './editable-code-block.module.scss';

type Props = {
  codeString: string;
  setCodeString: Dispatch<SetStateAction<string>>;
  setTempPostHtmlData: (inputHtml: string) => void;
  onKeyPress: (e: KeyboardEvent<HTMLElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLElement>) => void;
  addBlockFocusUseEffectDependency?: IParagraphData;
  removeCurrentBlockFocusUseEffectDependency?: IParagraphData;
  placeholder: string;
};

const CodeTextarea: FC<Props> = ({
  codeString,
  setCodeString,
  setTempPostHtmlData,
  onKeyPress,
  onKeyDown,
  addBlockFocusUseEffectDependency,
  removeCurrentBlockFocusUseEffectDependency,
  placeholder,
}) => {
  const ref = useRef(null);
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCodeString(e.target.value);
    setTempPostHtmlData(e.target.value);
  };

  useEffect(() => {
    ref.current && focusContentEditableTextToEnd(ref.current);
  }, [
    addBlockFocusUseEffectDependency,
    removeCurrentBlockFocusUseEffectDependency,
  ]);

  return (
    <>
      <textarea
        className={styles.code__textarea}
        ref={ref}
        value={codeString}
        onChange={handleChange}
        onKeyPress={onKeyPress}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        // minRows={3}
        // minLength={6}
        // maxLength={3000}
      />
    </>
  );
};

export default CodeTextarea;
