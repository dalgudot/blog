import { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import { onInputChange } from '../../../../lib/utils/content-editable-utils';
import {
  IRefData,
  IRefDataModel,
  RefDataModel,
} from '../../../../redux-toolkit/model/ref-data-model';
import {
  addLinkBlock,
  removeLinkBlock,
  setRefTitleData,
} from '../../../../redux-toolkit/slices/post-slice';
import {
  addTempLinkBlock,
  removeTempLinkBlock,
  setTempRefTitleData,
} from '../../../../redux-toolkit/slices/temp-post-slice';
import { useAppDispatch } from '../../../../redux-toolkit/store';
import EditableElementSwitch from '../../editable-element-switch';
import styles from './editable-link-block.module.scss';
import UrlInput from './url-input';

type Props = {
  contentEditable: boolean;
  datas: IRefData[];
  data: IRefData;
  idx: number;
  refDatasLength: number;
};

const EditableLinkBlock: FC<Props> = ({
  contentEditable,
  datas,
  data,
  idx,
  refDatasLength,
}) => {
  const currentIndex = idx;
  const dispatch = useAppDispatch();
  const [text, setText] = useState<string>(data.title);

  const onInput = (e: ChangeEvent<HTMLParagraphElement>) => {
    onInputChange(e, setTempData, updateInlineBlock);
  };

  const setTempData = (inputPureHtml: string) => {
    dispatch(setTempRefTitleData({ inputPureHtml, currentIndex }));
    setText(inputPureHtml); // onKeyDown의 removeBlock() 조건 + 렌더링 성능 위해
  };

  const updateInlineBlock = (inputPureHtml: string) => {
    dispatch(
      setRefTitleData({
        inputPureHtml,
        currentIndex,
      })
    );
    setTempData(inputPureHtml);
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
    // title 텍스트가 없고, 블록이 1개 이상이고, Backspace를 누른 경우
    if (text === '' && refDatasLength > 1 && e.key === 'Backspace') {
      e.preventDefault();
      removeBlock();
    }
  };

  return (
    <li className={styles.editable__link__li}>
      {contentEditable ? (
        <>
          <EditableElementSwitch
            blockType='Link'
            TagName='p'
            contentEditable={contentEditable}
            datas={datas}
            currentIndex={currentIndex}
            html={data.title}
            onInput={onInput}
            onKeyPress={onKeyPress}
            onKeyDown={onKeyDown}
            setText={setText}
            placeholder='Describe the link'
          />
          <UrlInput
            linkUrl={data.url}
            onKeyPress={onKeyPress}
            currentIndex={currentIndex}
          />
        </>
      ) : (
        <></>
        // <a href={data.url} target='_blank' rel='noreferrer'>
        //   <EditableElementSwitch
        //     TagName='p'
        //     contentEditable={contentEditable}
        //     datas={datas}
        //     currentIndex={currentIndex}
        //     html={data.title}
        //   />
        // </a>
      )}
    </li>
  );
};

export default EditableLinkBlock;
