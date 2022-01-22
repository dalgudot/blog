import { FC } from 'react';
import { TBlockType } from '../../models/article-block';
import ContentEditableCode from './code/content-editable-code';
import ContentEditableHeading from './heading/content-editable-heading';
import ContentEditableLink from './link/content-editable-link';
import ContentEditableParagraph from './paragraph/paragraph';

type Props = {
  blockType: TBlockType;
  language?: 'tsx' | 'typescript' | 'css';
  codeString?: string;
};

const ContentEditableElement: FC<Props> = ({
  blockType,
  language,
  codeString,
}) => {
  const HeadingHtmlTag = // 리액트 컴포넌트 이름으로 쓰기 위해 대문자
    blockType === 'Heading1' ? 'h1' : blockType === 'Heading2' ? 'h2' : 'h3';
  const isCodeBlock = language && codeString;

  switch (blockType) {
    case 'Heading1' || 'Heading2' || 'Heading3':
      return <ContentEditableHeading HeadingHtmlTag={HeadingHtmlTag} />;
    case 'Code':
      return isCodeBlock ? (
        <ContentEditableCode
          blockType='Code'
          language={language}
          codeString={codeString}
        />
      ) : (
        <span>
          ***language & codeString props*** is needed when you use the Code
          Block
        </span>
      );
    case 'Link':
      return <ContentEditableLink blockType='Link' />;
    default:
      return <ContentEditableParagraph blockType='Paragraph' />;
  }
};

export default ContentEditableElement;
