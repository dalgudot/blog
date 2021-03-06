import classNames from 'classnames';
import { FC, KeyboardEvent, MutableRefObject } from 'react';
import { ILinkData } from '../../../../redux-toolkit/model/link-data-model';
import IconNewTap24 from '../../../../svg/icon-new-tap-24';
import EditableElement from '../../editable-element';
import styles from './editable-link-block.module.scss';
import UrlInput from './url-input';

type Props = {
  wysiwygType: 'Normal' | 'Link';
  linkBlockType: 'Paragraph' | 'Reference';
  eachBlockRef: MutableRefObject<any>;
  contentEditable: boolean;
  html: string;
  data: ILinkData;
  currentIndex: number;
  setCurrentBlockTempPostHtmlData: (inputHtml: string) => void;
  setCurrentBlockPostHtmlData: (inputHtml: string) => void;
  onKeyPress?: (e: KeyboardEvent<HTMLElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLElement>) => void;
  placeholder: string;
};

const EditableLinkBlock: FC<Props> = ({
  wysiwygType,
  linkBlockType,
  eachBlockRef,
  contentEditable,
  html,
  data,
  currentIndex,
  setCurrentBlockTempPostHtmlData,
  setCurrentBlockPostHtmlData,
  onKeyPress,
  onKeyDown,
  placeholder,
}) => {
  const isProduction: boolean = process.env.NODE_ENV === 'production';

  return (
    <>
      <li
        className={classNames(
          styles.editable__link__block__li,
          isProduction && styles.editable__link__block__li__hover,
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
            eachBlockRef={eachBlockRef}
            contentEditable={contentEditable}
            html={html}
            setCurrentBlockTempPostHtmlData={setCurrentBlockTempPostHtmlData}
            setCurrentBlockPostHtmlData={setCurrentBlockPostHtmlData}
            onKeyPress={onKeyPress} // optional, 블록 추가
            onKeyDown={onKeyDown} // optional, 블록 삭제
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
