import { useToast } from '@dalgu/react-toast';
import { NextPage } from 'next';
import ContentEditableElement from '../components/post/block-wysiwyg/content-editable-element/content-editable-element';
import Response from '../components/post/response/response';

const TestPage: NextPage = () => {
  const { showToast } = useToast();
  return (
    <>
      {/* <h1>Test!</h1> */}
      {/* <Response /> */}
      <ContentEditableElement
        blockType='Code'
        language='tsx'
        codeString={`const ContentEditableElement: FC<Props> = ({
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
        <></>
      );
    case 'Link':
      return <ContentEditableLink blockType='Link' />;
    default:
      return <ContentEditableParagraph blockType='Paragraph' />;
  }
};

export default ContentEditableElement;`}
      />
      {/* <button onClick={() => showToast('hi')}>토스트</button> */}
    </>
  );
};

export default TestPage;
