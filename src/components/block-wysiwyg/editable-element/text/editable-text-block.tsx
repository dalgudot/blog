import classNames from 'classnames';
import { FC, KeyboardEvent } from 'react';
import { IParagraphData } from '../../../../redux-toolkit/model/post-data-model';
import { TBlockTextType } from '../../../../redux-toolkit/model/text-data-model';
import EditableElement from '../../editable-element';
import styles from './editable-text-block.module.scss';

type Props = {
  blockType: TBlockTextType;
  datas: IParagraphData[];
  contentEditable: boolean;
  blockId: string;
  html: string;
  currentIndex: number;
  setTempPostHtmlData: (inputHtml: string) => void;
  setPostHtmlData: (inputHtml: string) => void;
  onKeyPress?: (e: KeyboardEvent<HTMLElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLElement>) => void;
  addBlockFocusUseEffectDependency?: IParagraphData;
  removeCurrentBlockFocusUseEffectDependency?: IParagraphData;
  placeholder: string;
  className?: string;
};

const EditableTextBlock: FC<Props> = ({
  blockType,
  datas,
  contentEditable,
  blockId,
  html,
  currentIndex,
  setTempPostHtmlData,
  setPostHtmlData,
  onKeyPress,
  onKeyDown,
  addBlockFocusUseEffectDependency,
  removeCurrentBlockFocusUseEffectDependency,
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

  return (
    <>
      <EditableElement
        TagName={TagName}
        datas={datas}
        blockId={blockId}
        blockType={blockType}
        contentEditable={contentEditable}
        html={html}
        currentIndex={currentIndex}
        setTempPostHtmlData={setTempPostHtmlData}
        setPostHtmlData={setPostHtmlData}
        onKeyPress={onKeyPress} // optional, 블록 추가
        onKeyDown={onKeyDown} // optional, 블록 삭제
        addBlockFocusUseEffectDependency={addBlockFocusUseEffectDependency}
        removeCurrentBlockFocusUseEffectDependency={
          removeCurrentBlockFocusUseEffectDependency
        }
        placeholder={placeholder}
        customClassName={className ? className : customClassName}
      />
    </>
  );
};

export default EditableTextBlock;
