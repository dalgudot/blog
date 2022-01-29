import {
  ChangeEvent,
  Dispatch,
  FC,
  KeyboardEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { focusContentEditableTextToEnd } from '../../lib/utils/focus-content-editable-text-to-end';
import { TBlockType } from '../../redux-toolkit/model/paragraph-data-model';
import {
  IRefData,
  IRefDataModel,
  RefDataModel,
} from '../../redux-toolkit/model/ref-data-model';
import {
  addLinkBlock,
  removeLinkBlock,
} from '../../redux-toolkit/slices/post-slice';
import {
  addTempLinkBlock,
  removeTempLinkBlock,
  setTempLinkTitleData,
} from '../../redux-toolkit/slices/temp-post-slice';
import { useAppDispatch } from '../../redux-toolkit/store';
import EditableElement from './editable-element';
import styles from './editable-element-switch.module.scss';

type Props = {
  blockType: TBlockType;
  contentEditable: boolean;
  datas: IRefData[];
  currentIndex: number;
  html: string;
  onInput?: (e: ChangeEvent<HTMLHeadingElement | HTMLParagraphElement>) => void;
  text?: string;
  setText?: Dispatch<SetStateAction<string>>;
  placeholder?: string;
  customClassName?: string;
};

const EditableElementSwitch: FC<Props> = ({
  blockType,
  contentEditable,
  datas,
  currentIndex,
  html,
  onInput,
  text,
  setText,
  placeholder = '',
  customClassName = styles.editable__element,
}) => {
  const TagName =
    blockType === 'Heading1'
      ? 'h1'
      : blockType === 'Heading2'
      ? 'h2'
      : blockType === 'Heading3'
      ? 'h3'
      : 'p';
  // 'Code' 코드인 경우 추가

  const dispatch = useAppDispatch();
  const dataLength = datas.length;

  const addBlock = () => {
    const refData: IRefDataModel = new RefDataModel();
    const newLinkEditableBlock: IRefData = refData.createNewRefData();
    const isEnd: boolean = currentIndex === dataLength - 1;

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
    // title 텍스트가 없고, 블록이 2개 이상이고, Backspace를 누른 경우
    if (text === '' && dataLength > 1 && e.key === 'Backspace') {
      e.preventDefault();
      removeBlock();
    }
  };

  const syncTempPostWithPasteText = (newInnerPurePasteText: string) => {
    dispatch(
      setTempLinkTitleData({
        inputPureHtml: newInnerPurePasteText,
        currentIndex,
      })
    );
    setText && setText(newInnerPurePasteText); // onKeyDown의 removeBlock() 조건 + 렌더링 성능 위해
  };

  return (
    <>
      <EditableElement
        TagName={TagName}
        contentEditable={contentEditable}
        html={html}
        addBlockFocusUseEffectDependency={datas[currentIndex]} // tempPost가 아닌 post 데이터
        removeBlockFocusUseEffectDependency={datas[currentIndex + 1]} // tempPost가 아닌 post 데이터
        onInput={onInput} // 필수
        onKeyPress={onKeyPress} // 블록 추가
        onKeyDown={onKeyDown} // 블록 삭제
        syncTempPostWithPasteText={syncTempPostWithPasteText}
        placeholder={placeholder}
        customClassName={customClassName}
      />
    </>
  );
};

export default EditableElementSwitch;
