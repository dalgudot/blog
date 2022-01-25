import DOMPurify from 'dompurify';
import { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import {
  IRefData,
  IRefDataModel,
  RefDataModel,
} from '../../../../../redux-toolkit/model/ref-data-model';
import {
  addLinkBlock,
  removeLinkBlock,
} from '../../../../../redux-toolkit/slices/post-slice';
import {
  addTempLinkBlock,
  removeTempLinkBlock,
  setTempRefTitleData,
} from '../../../../../redux-toolkit/slices/temp-post-slice';
import { useAppDispatch } from '../../../../../redux-toolkit/store';
import EditableElement from '../../editable-element';
import styles from './editable-link.module.scss';
import UrlInput from './url-input';

type Props = {
  contentEditable: boolean;
  datas: IRefData[];
  data: IRefData;
  idx: number;
  refDatasLength: number;
};

const EditableLink: FC<Props> = ({
  contentEditable,
  datas,
  data,
  idx,
  refDatasLength,
}) => {
  const currentIndex = idx;
  const dispatch = useAppDispatch();
  const [text, setText] = useState(data.title);

  const onInput = (
    e: ChangeEvent<HTMLHeadingElement | HTMLParagraphElement>
  ) => {
    const inputPureHtml = DOMPurify.sanitize(e.target.innerHTML);
    dispatch(setTempRefTitleData({ inputHtml: inputPureHtml, currentIndex }));
    setText(inputPureHtml); // onKeyDown의 removeBlock() 조건 + 렌더링 성능 위해
  };

  const addBlock = () => {
    const refData: IRefDataModel = new RefDataModel();
    const newLinkEditableBlock: IRefData = refData.createNewRefData();
    const isEnd: boolean = currentIndex === refDatasLength - 1;

    dispatch(addLinkBlock({ newLinkEditableBlock, currentIndex, isEnd })); // 새로운 블럭 그리기 위해
    dispatch(addTempLinkBlock({ newLinkEditableBlock, currentIndex, isEnd })); // 데이터 저장하기 위해
  };

  const removeBlock = () => {
    dispatch(removeLinkBlock({ currentIndex }));
    dispatch(removeTempLinkBlock({ currentIndex }));
  };

  const onKeyPress = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addBlock();
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (text === '' && e.key === 'Backspace') {
      e.preventDefault();
      removeBlock();
    }
  };

  return (
    <li className={styles.editable__link__li}>
      {contentEditable ? (
        <>
          <EditableElement
            TagName='p'
            contentEditable={contentEditable}
            datas={datas}
            currentIndex={currentIndex}
            html={data.title}
            onInput={onInput}
            onKeyPress={onKeyPress}
            onKeyDown={onKeyDown}
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
            datas={datas}
            currentIndex={currentIndex}
            html={data.title}
          />
        </a>
      )}
    </li>
  );
};

export default EditableLink;
