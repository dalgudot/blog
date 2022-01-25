import DOMPurify from 'dompurify';
import { ChangeEvent, FC, KeyboardEvent, useRef } from 'react';
import {
  IRefData,
  IRefDataModel,
  RefDataModel,
} from '../../../../../redux-toolkit/model/ref-data';
import { addLinkBlock } from '../../../../../redux-toolkit/slices/post-slice';
import {
  addTempLinkBlock,
  setTempRefTitleData,
} from '../../../../../redux-toolkit/slices/temp-post-slice';
import { useAppDispatch } from '../../../../../redux-toolkit/store';
import EditableElement from '../../editable-element';
import styles from './editable-link.module.scss';
import UrlInput from './url-input';

type Props = {
  contentEditable: boolean;
  data: IRefData;
  idx: number;
  refDatasLength: number;
};

const EditableLink: FC<Props> = ({
  contentEditable,
  data,
  idx,
  refDatasLength,
}) => {
  const currentIndex = idx;
  const dispatch = useAppDispatch();

  const onInput = (
    e: ChangeEvent<HTMLHeadingElement | HTMLParagraphElement>
  ) => {
    const inputPureHtml = DOMPurify.sanitize(e.target.innerHTML);
    dispatch(setTempRefTitleData({ inputHtml: inputPureHtml, currentIndex }));
  };

  const addBlock = () => {
    const refData: IRefDataModel = new RefDataModel();
    const newLinkEditableBlock: IRefData = refData.createNewRefData();
    const isEnd: boolean = currentIndex === refDatasLength - 1;

    dispatch(addLinkBlock({ newLinkEditableBlock, currentIndex, isEnd })); // 새로운 블럭 그리기 위해
    dispatch(addTempLinkBlock({ newLinkEditableBlock, currentIndex, isEnd })); // 데이터 저장하기 위해
  };

  const onKeyPress = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addBlock();
    }
  };

  return (
    <li className={styles.editable__link__li}>
      {contentEditable ? (
        <>
          <EditableElement
            TagName='p'
            contentEditable={contentEditable}
            html={data.title}
            onInput={onInput}
            onKeyPress={onKeyPress}
            placeholder='Describe the link'
          />
          <UrlInput
            linkUrl={data.url}
            onKeyPress={onKeyPress}
            currentIndex={currentIndex}
          />
        </>
      ) : (
        <a href={data.url} target='_blank' rel='noreferrer'>
          <EditableElement
            TagName='p'
            contentEditable={contentEditable}
            html={data.title}
          />
        </a>
      )}
    </li>
  );
};

export default EditableLink;
