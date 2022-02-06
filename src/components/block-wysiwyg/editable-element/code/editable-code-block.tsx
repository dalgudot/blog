import { FC, KeyboardEvent, useEffect, useState } from 'react';
import styles from './editable-code-block.module.scss';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { IParagraphData } from '../../../../redux-toolkit/model/post-data-model';
import CodeTextarea from './code-textarea';

type Props = {
  contentEditable: boolean;
  html: string;
  setTempPostHtmlData: (inputHtml: string) => void;
  // setPostHtmlData: (inputHtml: string) => void;
  onKeyPress: (e: KeyboardEvent<HTMLElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLElement>) => void;
  addBlockFocusUseEffectDependency?: IParagraphData;
  removeCurrentBlockFocusUseEffectDependency?: IParagraphData;
  placeholder: string;
};

const EditableCodeBlock: FC<Props> = ({
  contentEditable,
  html,
  setTempPostHtmlData,
  // setPostHtmlData,
  onKeyPress,
  onKeyDown,
  addBlockFocusUseEffectDependency,
  removeCurrentBlockFocusUseEffectDependency,
  placeholder,
}) => {
  const [codeString, setCodeString] = useState<string>('');
  const language = 'tsx'; // 랭귀지 셀렉터는 여기서 구현

  useEffect(() => {
    setCodeString(html);
  }, [html]);

  return (
    <>
      {contentEditable && (
        <CodeTextarea
          codeString={codeString}
          setCodeString={setCodeString}
          setTempPostHtmlData={setTempPostHtmlData}
          onKeyPress={onKeyPress}
          onKeyDown={onKeyDown}
          addBlockFocusUseEffectDependency={addBlockFocusUseEffectDependency}
          removeCurrentBlockFocusUseEffectDependency={
            removeCurrentBlockFocusUseEffectDependency
          }
          placeholder={placeholder}
        />
      )}
      <SyntaxHighlighter
        className={styles.code__block}
        language={language}
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
