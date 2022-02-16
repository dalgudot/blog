import {
  ChangeEvent,
  Dispatch,
  FC,
  KeyboardEvent,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import styles from './editable-code-block.module.scss';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { IParagraphData } from '../../../../redux-toolkit/model/post-data-model';
import CodeTextarea from './code-textarea';
import {
  TCodeLanguage,
  ICodeData,
} from '../../../../redux-toolkit/model/code-data-model';
import { useAppDispatch } from '../../../../redux-toolkit/store';
import { setCurrentCodeBlockTempCodeLanguage } from '../../../../redux-toolkit/slices/temp-post-slice';

type Props = {
  eachBlockRef: MutableRefObject<any>;
  contentEditable: boolean;
  data: ICodeData;
  html: string;
  currentIndex: number;
  setCurrentBlockTempPostHtmlData: (inputHtml: string) => void;
  // setCurrentBlockPostHtmlData: (inputHtml: string) => void;
  onKeyPress: (e: KeyboardEvent<HTMLElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLElement>) => void;
  addBlockFocusUseEffectDependency?: IParagraphData;
  removeCurrentBlockFocusUseEffectDependency?: IParagraphData;
  placeholder: string;
};

const EditableCodeBlock: FC<Props> = ({
  eachBlockRef,
  contentEditable,
  data,
  html,
  currentIndex,
  setCurrentBlockTempPostHtmlData,
  // setCurrentBlockPostHtmlData,
  onKeyPress,
  onKeyDown,
  addBlockFocusUseEffectDependency,
  removeCurrentBlockFocusUseEffectDependency,
  placeholder,
}) => {
  const [codeString, setCodeString] = useState<string>('');
  const [codeLanguage, setCodeLanguage] = useState<TCodeLanguage>('tsx');

  useEffect(() => {
    setCodeString(html);
  }, [html]);

  useEffect(() => {
    setCodeLanguage(data.codeLanguage);
  }, [data.codeLanguage]);

  return (
    <>
      {contentEditable && (
        <>
          <LanguageSelector
            codeLanguage={codeLanguage}
            setCodeLanguage={setCodeLanguage}
            currentIndex={currentIndex}
          />
          <CodeTextarea
            codeString={codeString}
            setCodeString={setCodeString}
            setCurrentBlockTempPostHtmlData={setCurrentBlockTempPostHtmlData}
            onKeyPress={onKeyPress}
            onKeyDown={onKeyDown}
            addBlockFocusUseEffectDependency={addBlockFocusUseEffectDependency}
            removeCurrentBlockFocusUseEffectDependency={
              removeCurrentBlockFocusUseEffectDependency
            }
            placeholder={placeholder}
          />
        </>
      )}
      <SyntaxHighlighter
        className={styles.code__block}
        language={codeLanguage}
        style={vscDarkPlus}
        wrapLines={true}
        wrapLongLines={true}
      >
        {codeString}
      </SyntaxHighlighter>
    </>
  );
};

export default EditableCodeBlock;

type LanguageSelectorProps = {
  codeLanguage: TCodeLanguage;
  setCodeLanguage: Dispatch<SetStateAction<TCodeLanguage>>;
  currentIndex: number;
};

const LanguageSelector: FC<LanguageSelectorProps> = ({
  codeLanguage,
  setCodeLanguage,
  currentIndex,
}) => {
  const dispatch = useAppDispatch();

  const changeCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setCodeLanguage(e.target.value as TCodeLanguage);
    dispatch(
      setCurrentCodeBlockTempCodeLanguage({
        codeLanguage: e.target.value as TCodeLanguage,
        currentIndex,
      })
    );
  };

  return (
    <select value={codeLanguage} onChange={changeCategory}>
      <option value='typescript'>typescript</option>
      <option value='tsx'>tsx</option>
      <option value='swift'>swift</option>
      <option value='css'>css</option>
      <option value='sass'>sass</option>
      <option value='scss'>scss</option>
      <option value='javascript'>javascript</option>
      <option value='jsx'>jsx</option>
    </select>
  );
};
