import classNames from 'classnames';
import { FC, KeyboardEvent } from 'react';
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
            setTempPostHtmlData={setTempPostHtmlData}
            setPostHtmlData={setPostHtmlData}
            onKeyPress={onKeyPress} // optional, 블록 추가
            onKeyDown={onKeyDown} // optional, 블록 삭제
            addBlockFocusUseEffectDependency={addBlockFocusUseEffectDependency}
            removeCurrentBlockFocusUseEffectDependency={
              removeCurrentBlockFocusUseEffectDependency
            }
            placeholder={placeholder}
          />
          <IconNewTap24 color='var(--g1)' />
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
