import { FC } from 'react';
import { TBlockType } from '../models/article-block';
import EditableCode from './editable-element/code/editable-code';
import EditableHeading from './editable-element/heading/editable-heading';
import EditableLink from './editable-element/link/editable-link';
import EditableParagraph from './editable-element/paragraph/paragraph';

type Props = {
  contentEditable: boolean;
  blockType: TBlockType;
  language?: 'tsx' | 'typescript' | 'css';
  codeString?: string;
};

const SwitchEditableBlocks: FC<Props> = ({
  contentEditable,
  blockType,
  language,
  codeString,
}) => {
  const HeadingHtmlTag = // 리액트 컴포넌트 이름으로 쓰기 위해 대문자
    blockType === 'Heading1' ? 'h1' : blockType === 'Heading2' ? 'h2' : 'h3';
  const isCodeBlock = language && codeString;

  switch (blockType) {
    // case 'Heading1' || 'Heading2' || 'Heading3':
    //   return <EditableHeading contentEditable={contentEditable} HeadingHtmlTag={HeadingHtmlTag} />;
    // case 'Code':
    //   return isCodeBlock ? (
    //     <EditableCode contentEditable={contentEditable} language={language} codeString={codeString} />
    //   ) : (
    //     <span>
    //       ***language & codeString props*** is needed when you use the Code
    //       Block
    //     </span>
    //   );
    case 'Link':
      return <EditableLink contentEditable={contentEditable} />;
    default:
      return <></>;
    // return <EditableParagraph contentEditable={contentEditable}/>;
  }
};

export default SwitchEditableBlocks;
