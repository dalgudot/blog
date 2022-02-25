import classNames from 'classnames';
import { FC, KeyboardEvent, MutableRefObject } from 'react';
import { TBlockTextType } from '../../../../redux-toolkit/model/text-data-model';
import EditableElement from '../../editable-element';
import styles from './editable-text-block.module.scss';

type Props = {
  blockType: TBlockTextType;
  blockId?: string;
  eachBlockRef: MutableRefObject<any>;
  contentEditable: boolean;
  html: string;
  setCurrentBlockTempPostHtmlData: (inputHtml: string) => void;
  setCurrentBlockPostHtmlData: (inputHtml: string) => void;
  onKeyPress?: (e: KeyboardEvent<HTMLElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLElement>) => void;
  placeholder: string;
  className?: string;
};

const EditableTextBlock: FC<Props> = ({
  blockType,
  blockId,
  eachBlockRef,
  contentEditable,
  html,
  setCurrentBlockTempPostHtmlData,
  setCurrentBlockPostHtmlData,
  onKeyPress,
  onKeyDown,
  placeholder,
  className,
}) => {
  const TagName =
    blockType === 'Heading1'
      ? 'h1'
      : blockType === 'Heading2'
      ? 'h2'
      : blockType === 'Heading3'
      ? 'h3'
      : 'p';

  const customClassName =
    blockType === 'Heading1'
      ? classNames('title1__700')
      : blockType === 'Heading2'
      ? classNames('title2__700', styles.heading2)
      : blockType === 'Heading3'
      ? classNames('title3__700', styles.heading3)
      : classNames('body1__400', styles.paragraph);

  const blockIdForTableOfContents =
    blockType === 'Heading2' || blockType === 'Heading3' ? blockId : undefined;

  return (
    <>
      <EditableElement
        TagName={TagName}
        blockId={blockIdForTableOfContents}
        eachBlockRef={eachBlockRef}
        contentEditable={contentEditable}
        html={html}
        setCurrentBlockTempPostHtmlData={setCurrentBlockTempPostHtmlData}
        setCurrentBlockPostHtmlData={setCurrentBlockPostHtmlData}
        onKeyPress={onKeyPress} // optional, 블록 추가
        onKeyDown={onKeyDown} // optional, 블록 삭제
        placeholder={placeholder}
        customClassName={className ? className : customClassName}
      />
    </>
  );
};

export default EditableTextBlock;
