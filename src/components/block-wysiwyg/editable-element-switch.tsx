import { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import { TBlockType } from '../../redux-toolkit/model/text-data-model';
import {
  addNewBlock,
  addNewLinkBlock,
  removeCurrentBlock,
  removeLinkBlock,
  setBlockTypeData,
  setCurrentBlockHtml,
  setCurrentLinkBlockHtml,
} from '../../redux-toolkit/slices/post-slice';
import {
  addTempNewBlock,
  addTempNewLinkBlock,
  removeTempCurrentBlock,
  removeTempLinkBlock,
  setCurrentBlockTempHtml,
  setCurrentLinkBlockTempHtml,
  setTempBlockTypeData,
} from '../../redux-toolkit/slices/temp-post-slice';
import { useAppDispatch } from '../../redux-toolkit/store';
import EditableTextBlock from './editable-element/text/editable-text-block';
import { IParagraphData } from '../../redux-toolkit/model/post-data-model';
import EditableLinkBlock from './editable-element/link/editable-link-block';
import { ILinkData } from '../../redux-toolkit/model/link-data-model';
import EditableCodeBlock from './editable-element/code/editable-code-block';

type Props = {
  wysiwygType: 'Normal' | 'Link';
  blockType: TBlockType;
  contentEditable: boolean;
  data: IParagraphData;
  datas: IParagraphData[];
  currentIndex: number;
};

const EditableElementSwitch: FC<Props> = ({
  wysiwygType,
  blockType,
  contentEditable,
  data,
  datas,
  currentIndex,
}) => {
  const [text, setText] = useState<string>(data.html);
  const [type, setType] = useState<TBlockType>(blockType);
  const dispatch = useAppDispatch();
  const datasLength = datas.length;

  const changeBlockType = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const newBlockType = e.target.value as TBlockType;

    // 해당 blockType만 업데이트하고 렌더링하기 위해
    // tempPost 데이터의 html 가져오면 모든 블럭이 업데이트됨.
    setType(newBlockType);
    dispatch(setTempBlockTypeData({ newBlockType, currentIndex }));
    // 다른 업데이트에서 post 데이터에는 html이 업데이트되지 않았기 때문에 여기서는 동기화시켜줘야 타입을 바꿔도 html 유지!
    dispatch(setCurrentBlockHtml({ inputHtml: text, currentIndex }));
    dispatch(setBlockTypeData({ newBlockType, currentIndex }));
  };

  const addBlock = () => {
    const isEnd: boolean = currentIndex === datasLength - 1;

    if (wysiwygType === 'Link') {
      dispatch(addNewLinkBlock({ currentIndex, isEnd }));
      dispatch(addTempNewLinkBlock({ currentIndex, isEnd }));
    } else {
      // wysiwygType === 'Normal'인 일반적인 경우
      // 새로운 블럭 그리기 위해
      dispatch(addNewBlock({ currentIndex, isEnd }));
      // 데이터 저장하기 위해
      dispatch(addTempNewBlock({ currentIndex, isEnd }));
    }
  };

  const removeBlock = () => {
    if (wysiwygType === 'Link') {
      dispatch(removeLinkBlock({ currentIndex }));
      dispatch(removeTempLinkBlock({ currentIndex }));
    } else {
      dispatch(removeCurrentBlock({ currentIndex }));
      dispatch(removeTempCurrentBlock({ currentIndex }));
    }
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

  // onInput에서 이용
  const setCurrentBlockTempPostHtmlData = (inputHtml: string) => {
    // currentIndex 인자로 넣어 props로 전달
    // map 안 쓰는 block에서는 다른 함수로 props 전달
    if (wysiwygType === 'Link') {
      dispatch(setCurrentLinkBlockTempHtml({ inputHtml, currentIndex }));
    } else {
      dispatch(setCurrentBlockTempHtml({ inputHtml, currentIndex }));
    }

    setText(inputHtml);
  };

  // updateInlineBlock에서 이용
  const setCurrentBlockPostHtmlData = (inputHtml: string) => {
    // currentIndex 인자로 넣어 props로 전달
    // map 안 쓰는 block에서는 다른 함수로 props 전달
    if (wysiwygType === 'Link') {
      dispatch(setCurrentLinkBlockHtml({ inputHtml, currentIndex }));
    } else {
      dispatch(setCurrentBlockHtml({ inputHtml, currentIndex }));
    }
  };

  const switchBlocks = () => {
    switch (type) {
      case 'Link':
        return (
          <EditableLinkBlock
            wysiwygType={wysiwygType}
            contentEditable={contentEditable}
            data={data as ILinkData}
            currentIndex={currentIndex}
            setTempPostHtmlData={setCurrentBlockTempPostHtmlData}
            setPostHtmlData={setCurrentBlockPostHtmlData}
            onKeyPress={onKeyPress}
            onKeyDown={onKeyDown}
            addBlockFocusUseEffectDependency={datas[currentIndex]}
            removeCurrentBlockFocusUseEffectDependency={datas[currentIndex + 1]}
            placeholder='링크 제목 입력'
          />
        );

      case 'Code':
        return (
          <EditableCodeBlock
            contentEditable={contentEditable}
            html={data.html}
            setTempPostHtmlData={setCurrentBlockTempPostHtmlData}
            // setPostHtmlData={setCurrentBlockPostHtmlData}
            onKeyPress={onKeyPress}
            onKeyDown={onKeyDown}
            addBlockFocusUseEffectDependency={datas[currentIndex]}
            removeCurrentBlockFocusUseEffectDependency={datas[currentIndex + 1]}
            placeholder='코드 입력'
          />
        );

      default:
        return (
          <EditableTextBlock
            blockType={type}
            contentEditable={contentEditable}
            html={data.html}
            setTempPostHtmlData={setCurrentBlockTempPostHtmlData}
            setPostHtmlData={setCurrentBlockPostHtmlData} // `` 때문에 필요
            onKeyPress={onKeyPress}
            onKeyDown={onKeyDown}
            addBlockFocusUseEffectDependency={datas[currentIndex]}
            removeCurrentBlockFocusUseEffectDependency={datas[currentIndex + 1]}
            placeholder='텍스트 입력'
          />
        );
    }
  };

  return (
    <>
      {contentEditable && wysiwygType !== 'Link' && (
        <select value={type} onChange={changeBlockType}>
          <option value='Paragraph'>Paragraph</option>
          <option value='Heading1'>Heading1</option>
          <option value='Heading2'>Heading2</option>
          <option value='Heading3'>Heading3</option>
          <option value='Code'>Code</option>
          <option value='Link'>Link</option>
        </select>
      )}

      {switchBlocks()}
    </>
  );
};

export default EditableElementSwitch;
