import { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import {
  ITextData,
  TBlockType,
  TextDataModel,
} from '../../redux-toolkit/model/text-data-model';
import {
  addNewBlock,
  removeCurrentBlock,
  setCurrentBlockHtml,
} from '../../redux-toolkit/slices/post-slice';
import {
  addTempNewBlock,
  removeTempCurrentBlock,
  setCurrentBlockTempHtml,
  setTempSwitchBlockTypeData,
} from '../../redux-toolkit/slices/temp-post-slice';
import { useAppDispatch } from '../../redux-toolkit/store';
import EditableTextBlock from './editable-element/text/editable-text-block';
import { IParagraphData } from '../../redux-toolkit/model/post-data-model';

type Props = {
  blockType: TBlockType;
  contentEditable: boolean;
  data: IParagraphData;
  datas: IParagraphData[];
  datasLength: number;
  currentIndex: number;
};

const EditableElementSwitch: FC<Props> = ({
  blockType,
  contentEditable,
  data,
  datas,
  datasLength,
  currentIndex,
}) => {
  const [text, setText] = useState<string>(data.html);
  const [type, setType] = useState<TBlockType>(blockType);
  const dispatch = useAppDispatch();

  const changeBlockType = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const newBlockType = e.target.value as TBlockType;

    // 해당 blockType만 업데이트하고 렌더링하기 위해
    setType(newBlockType);
    // post 데이터를 업데이트하는 건 불필요 -> 즉, tempPost 데이터만 업데이트하면 됨
    dispatch(setTempSwitchBlockTypeData({ newBlockType, currentIndex }));
  };

  const addBlock = () => {
    const newTextBlock: ITextData = new TextDataModel().createNewTextData();
    const isEnd: boolean = currentIndex === datasLength - 1;

    // 새로운 블럭 그리기 위해
    dispatch(addNewBlock({ newBlock: newTextBlock, currentIndex, isEnd }));
    // 데이터 저장하기 위해
    dispatch(addTempNewBlock({ newBlock: newTextBlock, currentIndex, isEnd }));
  };

  const removeBlock = () => {
    dispatch(removeCurrentBlock({ currentIndex }));
    dispatch(removeTempCurrentBlock({ currentIndex }));
  };

  const onKeyPress = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addBlock();
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    // html 텍스트가 없고, 블록이 2개 이상이고, Backspace를 누른 경우
    if (text === '' && datasLength > 1 && e.key === 'Backspace') {
      e.preventDefault();
      removeBlock();
    }
  };

  const setCurrentBlockTempHtmlData = (inputHtml: string) => {
    // currentIndex 인자로 넣어 props로 전달
    // map 안 쓰는 block에서는 다른 함수로 props 전달
    dispatch(setCurrentBlockTempHtml({ inputHtml, currentIndex }));
    setText(inputHtml);
  };

  const setCurrentBlockHtmlData = (inputHtml: string) => {
    // currentIndex 인자로 넣어 props로 전달
    // map 안 쓰는 block에서는 다른 함수로 props 전달
    dispatch(setCurrentBlockHtml({ inputHtml, currentIndex }));
  };

  const switchBlocks = () => {
    switch (type) {
      case 'Link':
        return <>Link</>;

      case 'Code':
        return <>Code</>;

      default:
        return (
          <EditableTextBlock
            blockType={type}
            contentEditable={contentEditable}
            html={data.html}
            onKeyPress={onKeyPress}
            onKeyDown={onKeyDown}
            setTempPostHtmlData={setCurrentBlockTempHtmlData}
            setPostHtmlData={setCurrentBlockHtmlData}
            addBlockFocusUseEffectDependency={datas[currentIndex]}
            removeCurrentBlockFocusUseEffectDependency={datas[currentIndex + 1]}
            placeholder='입력'
          />
        );
    }
  };

  return (
    <>
      <select value={type} onChange={changeBlockType}>
        <option value='Paragraph'>Paragraph</option>
        <option value='Heading1'>Heading1</option>
        <option value='Heading2'>Heading2</option>
        <option value='Heading3'>Heading3</option>
        <option value='Code'>Code</option>
        <option value='Link'>Link</option>
      </select>
      {switchBlocks()}
    </>
  );
};

export default EditableElementSwitch;
