import { FC } from 'react';
import styles from './content-editable-code.module.scss';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

type Props = {
  blockType: 'Code';
  language: 'tsx' | 'typescript' | 'css';
  codeString: string;
};

const ContentEditableCode: FC<Props> = ({
  blockType,
  language,
  codeString,
}) => {
  return (
    <SyntaxHighlighter
      className={styles.code__block}
      language={language}
      style={vscDarkPlus}
      wrapLines={true}
      wrapLongLines={true}
    >
      {codeString}
    </SyntaxHighlighter>
  );
};

export default ContentEditableCode;
