import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { ChangeEvent, FC, KeyboardEvent } from 'react';
import { IParagraphData } from '../../../../redux-toolkit/model/post-data-model';
import { TBlockTextType } from '../../../../redux-toolkit/model/text-data-model';
import EditableElement from '../../editable-element';
import styles from './editable-text-block.module.scss';

type Props = {
  blockType: TBlockTextType;
  contentEditable: boolean;
  html: string;
  onKeyPress?: (e: KeyboardEvent<HTMLElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLElement>) => void;
  setTempPostHtmlData: (inputHtml: string) => void;
  // ActionCreatorWithPayload<
  //   {
  //     inputHtml: string;
  //   },
  //   string
  // >;
  setPostHtmlData: (inputHtml: string) => void;
  // ActionCreatorWithPayload<
  //   {
  //     inputHtml: string;
  //   },
  //   string
  // >;
  addBlockFocusUseEffectDependency?: IParagraphData;
  removeCurrentBlockFocusUseEffectDependency?: IParagraphData;
  placeholder?: string;
};

const EditableTextBlock: FC<Props> = ({
  blockType,
  contentEditable,
  html,
  onKeyPress,
  onKeyDown,
  setTempPostHtmlData,
  setPostHtmlData,
  addBlockFocusUseEffectDependency,
  removeCurrentBlockFocusUseEffectDependency,
  placeholder,
}) => {
  const TagName =
    blockType === 'Heading1'
      ? 'h1'
      : blockType === 'Heading2'
      ? 'h2'
      : blockType === 'Heading3'
      ? 'h3'
      : 'p';

  const onInput = (
    e: ChangeEvent<HTMLHeadingElement | HTMLParagraphElement>
  ) => {
    // const inputHtml = DOMPurify.sanitize(e.target.innerHTML);
    const inputHtml = e.target.innerHTML;
    setTempPostHtmlData(inputHtml);
    addInlineCodeBlock(inputHtml);
  };

  const addInlineCodeBlock = (inputHtml: string) => {
    const countBacktick = inputHtml.match(/`/g)?.length;

    if (countBacktick === 2) {
      const isContinuousBacktick: boolean = inputHtml.includes('``');

      if (isContinuousBacktick) {
        // 2개 연속(``)이면 빈 inline Code Block 생성
        const emptyCodeInlineBlock = inputHtml.replace(
          '``',
          '&nbsp<code>&nbsp</code>&nbsp'
        );

        updateInlineBlock(emptyCodeInlineBlock);
      } else {
        // 첫 번째 `는 <code>로 두 번째 `는 </code>로!
        const firstBacktickToTag = inputHtml.replace('`', '&nbsp<code>'); // &nbsp is for design
        const secondBacktickToTag = firstBacktickToTag.replace(
          '`',
          `</code>&nbsp` // &nbsp로 코드 블럭 벗어나기
        );

        updateInlineBlock(secondBacktickToTag);
      }
    }
  };

  const updateInlineBlock = (inputHtml: string) => {
    setTempPostHtmlData(inputHtml);
    setPostHtmlData(inputHtml);
  };

  const syncTempPostWithPasteText = (newInnerPurePasteText: string) => {
    setTempPostHtmlData(newInnerPurePasteText);
  };

  return (
    <>
      <EditableElement
        TagName={TagName}
        contentEditable={contentEditable}
        html={html}
        onInput={onInput} // 필수
        onKeyPress={onKeyPress} // optional, 블록 추가
        onKeyDown={onKeyDown} // optional, 블록 삭제
        syncTempPostWithPasteText={syncTempPostWithPasteText} // 필수
        addBlockFocusUseEffectDependency={addBlockFocusUseEffectDependency}
        removeCurrentBlockFocusUseEffectDependency={
          removeCurrentBlockFocusUseEffectDependency
        }
        placeholder={placeholder}
        customClassName={styles.editable__text__block}
      />
    </>
  );
};

export default EditableTextBlock;
