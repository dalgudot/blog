import classNames from 'classnames';
import { ChangeEvent, FC, KeyboardEvent } from 'react';
import { IParagraphData } from '../../../../redux-toolkit/model/post-data-model';
import { TBlockTextType } from '../../../../redux-toolkit/model/text-data-model';
import EditableElement from '../../editable-element';
import styles from './editable-text-block.module.scss';

type Props = {
  blockType: TBlockTextType;
  contentEditable: boolean;
  html: string;
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
  contentEditable,
  html,
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

  const onInput = (
    e: ChangeEvent<HTMLHeadingElement | HTMLParagraphElement>
  ) => {
    const inputHtml = e.target.innerHTML;
    setTempPostHtmlData(inputHtml);
    addInlineCodeBlock(inputHtml);
  };

  const addInlineCodeBlock = (inputHtml: string) => {
    const countBacktick = inputHtml.match(/`/g)?.length;
    const updateInlineBlock = (inputHtml: string) => {
      setTempPostHtmlData(inputHtml);
      setPostHtmlData(inputHtml);
    };

    if (countBacktick === 2) {
      const isContinuousBacktick: boolean = inputHtml.includes('``');

      if (isContinuousBacktick) {
        // 2개 연속(``)이면 빈 inline Code Block 생성
        const emptyCodeInlineBlock = inputHtml.replace(
          '``',
          '<code>&nbsp</code>&nbsp'
        );

        updateInlineBlock(emptyCodeInlineBlock);
      } else {
        // 첫 번째 `는 <code>로 두 번째 `는 </code>로!
        const firstBacktickToTag = inputHtml.replace(
          '`',
          '<code class="inline__code__block">'
        ); // &nbsp is for design
        const secondBacktickToTag = firstBacktickToTag.replace(
          '`',
          // `</code>`
          `</code>&nbsp`
          // &nbsp로 코드 블럭 벗어나기
        );

        updateInlineBlock(secondBacktickToTag);
      }
    }
  };

  const syncTempPostWithPasteText = (newInnerPasteText: string) => {
    setTempPostHtmlData(newInnerPasteText);
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
        customClassName={className ? className : customClassName}
      />
    </>
  );
};

export default EditableTextBlock;
