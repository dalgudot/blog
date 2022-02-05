import classNames from 'classnames';
import { ChangeEvent, FC, KeyboardEvent } from 'react';
import { ILinkData } from '../../../../redux-toolkit/model/link-data-model';
import { IParagraphData } from '../../../../redux-toolkit/model/post-data-model';
import IconNewTap24 from '../../../../svg/icon-new-tap-24';
import EditableElement from '../../editable-element';
import styles from './editable-link-block.module.scss';
import UrlInput from './url-input';

type Props = {
  wysiwygType: 'Normal' | 'Link';
  linkBlockType: 'Paragraph' | 'Reference';
  contentEditable: boolean;
  data: ILinkData;
  currentIndex: number;
  setTempPostHtmlData: (inputHtml: string) => void;
  setPostHtmlData: (inputHtml: string) => void;
  onKeyPress?: (e: KeyboardEvent<HTMLElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLElement>) => void;
  addBlockFocusUseEffectDependency?: IParagraphData;
  removeCurrentBlockFocusUseEffectDependency?: IParagraphData;
  placeholder: string;
};

const EditableLinkBlock: FC<Props> = ({
  wysiwygType,
  linkBlockType,
  contentEditable,
  data,
  currentIndex,
  setTempPostHtmlData,
  setPostHtmlData,
  onKeyPress,
  onKeyDown,
  addBlockFocusUseEffectDependency,
  removeCurrentBlockFocusUseEffectDependency,
  placeholder,
}) => {
  const onInput = (e: ChangeEvent<HTMLParagraphElement>) => {
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
          '&nbsp<code>&nbsp</code>&nbsp'
        );

        updateInlineBlock(emptyCodeInlineBlock);
      } else {
        // 첫 번째 `는 <code>로 두 번째 `는 </code>로!
        const firstBacktickToTag = inputHtml.replace(
          '`',
          '&nbsp<code class="inline__code__block">'
        ); // &nbsp is for design
        const secondBacktickToTag = firstBacktickToTag.replace(
          '`',
          `</code>&nbsp` // &nbsp로 코드 블럭 벗어나기
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
      <li
        className={classNames(
          styles.editable__link__block__li,
          linkBlockType === 'Reference'
            ? styles.border__bottom__for__Reference__list__type
            : styles.box__for__Paragraph__list__type
        )}
      >
        <a
          href={contentEditable ? undefined : data.url}
          target='_blank'
          rel='noreferrer'
        >
          <EditableElement
            TagName='p'
            contentEditable={contentEditable}
            html={data.html}
            onInput={onInput} // 필수
            onKeyPress={onKeyPress} // optional, 블록 추가
            onKeyDown={onKeyDown} // optional, 블록 삭제
            syncTempPostWithPasteText={syncTempPostWithPasteText} // 필수
            addBlockFocusUseEffectDependency={addBlockFocusUseEffectDependency}
            removeCurrentBlockFocusUseEffectDependency={
              removeCurrentBlockFocusUseEffectDependency
            }
            placeholder={placeholder}
          />
          <IconNewTap24 color='var(--g4)' />
        </a>
      </li>
      {contentEditable && (
        <UrlInput
          wysiwygType={wysiwygType}
          linkUrl={data.url}
          onKeyPress={onKeyPress}
          currentIndex={currentIndex}
        />
      )}
    </>
  );
};

export default EditableLinkBlock;
