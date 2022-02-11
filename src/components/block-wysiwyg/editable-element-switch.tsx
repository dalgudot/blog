import {
  ChangeEvent,
  FC,
  KeyboardEvent,
  memo,
  useEffect,
  useState,
} from 'react';
import {
  addNewBlock,
  addNewLinkBlock,
  removeCurrentBlock,
  removeLinkBlock,
  setBlockTypeData,
  setCurrentBlockHtml,
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
import {
  IParagraphData,
  TBlockType,
} from '../../redux-toolkit/model/post-data-model';
import EditableLinkBlock from './editable-element/link/editable-link-block';
import { ILinkData } from '../../redux-toolkit/model/link-data-model';
import EditableCodeBlock from './editable-element/code/editable-code-block';
import EditableImageBlock from './editable-element/image/editable-image-block';
import styles from './editable-element.module.scss';
import { ICodeData } from '../../redux-toolkit/model/code-data-model';

type Props = {
  wysiwygType: 'Normal' | 'Link';
  linkBlockType: 'Paragraph' | 'Reference';
  contentEditable: boolean;
  data: IParagraphData;
  datas: IParagraphData[];
  currentIndex: number;
};

const EditableElementSwitch: FC<Props> = ({
  wysiwygType,
  linkBlockType,
  contentEditable,
  data,
  datas,
  currentIndex,
}) => {
  const [type, setType] = useState<TBlockType>('Paragraph');
  const [tempEachBlockStateText, setTempEachBlockStateText] =
    useState<string>(''); // block 지울 때 활용
  const [eachBlockStateText, setEachBlockStateText] = useState<string>(''); // block 지울 때 활용
  const dispatch = useAppDispatch();
  const datasLength = datas.length;

  // new -> draft로 이동 시 첫 번째 블럭이 paragraph로 남는 현상 해결
  useEffect(() => {
    setType(data.blockType);
  }, [data.blockType]);

  useEffect(() => {
    setTempEachBlockStateText(data.html);
    setEachBlockStateText(data.html);
  }, [data.html]);

  const changeBlockType = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const newBlockType = e.target.value as TBlockType;

    // 해당 blockType만 업데이트하고 렌더링하기 위해
    // tempPost 데이터의 html 가져오면 모든 블럭이 업데이트됨.
    setType(newBlockType);
    dispatch(setTempBlockTypeData({ newBlockType, currentIndex }));
    // 다른 업데이트에서 post 데이터에는 html이 업데이트되지 않았기 때문에 여기서는 동기화시켜줘야 타입을 바꿔도 html 유지!
    dispatch(
      setCurrentBlockHtml({ inputHtml: tempEachBlockStateText, currentIndex })
    );
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
    if (
      tempEachBlockStateText === '' &&
      datasLength > 1 &&
      e.key === 'Backspace'
    ) {
      e.preventDefault();
      removeBlock();
    }

    // 붙여넣기 command + c
    if (e.metaKey && e.key === 'v') {
      console.log('----------------Paste----------------');
      e.preventDefault();
      paste();
    }
  };

  const paste = () => {
    navigator.clipboard.readText().then((clipText) => {
      const htmlData = clipText
        ?.replace(/&/g, '&amp;') // &부터 해야 뒤쪽 <, > replace에 영향 없음!
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      // 커서나 selection 위치에 따라 붙여넣는 위치 조정 필요
      const newInnerPasteHtml = `${tempEachBlockStateText}${htmlData}`;

      setCurrentBlockTempPostHtmlData(newInnerPasteHtml);
      setEachBlockStateText(newInnerPasteHtml); // 각 블록 렌더링
    });
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

    // 리덕스에서 tempHtml을 가져오면 계속 전체 리렌더가 일어나기 때문에 해당 컴포넌트의 state로 관리
    setTempEachBlockStateText(inputHtml);
  };

  // updateInlineBlock에서 이용
  const setCurrentBlockPostHtmlData = (inputHtml: string) => {
    // currentIndex 인자로 넣어 props로 전달
    // map 안 쓰는 block에서는 다른 함수로 props 전달
    setEachBlockStateText(inputHtml);
    if (wysiwygType === 'Link') {
      // dispatch(setCurrentLinkBlockHtml({ inputHtml, currentIndex }));
    } else {
      // dispatch(setCurrentBlockHtml({ inputHtml, currentIndex }));
    }
  };

  const addBlockFocusUseEffectDependency = datas[currentIndex];
  const removeCurrentBlockFocusUseEffectDependency = datas[currentIndex + 1];

  const switchBlocks = () => {
    switch (type) {
      case 'Image':
        return (
          <EditableImageBlock
            blockId={data.blockId}
            contentEditable={contentEditable}
            html={eachBlockStateText}
            imageDownloadURL={data.url}
            currentIndex={currentIndex}
            setTempPostHtmlData={setCurrentBlockTempPostHtmlData}
            setPostHtmlData={setCurrentBlockPostHtmlData}
            onKeyPress={onKeyPress}
            onKeyDown={onKeyDown}
            addBlockFocusUseEffectDependency={addBlockFocusUseEffectDependency}
            removeCurrentBlockFocusUseEffectDependency={
              removeCurrentBlockFocusUseEffectDependency
            }
            placeholder={data.url ? '캡션 입력' : '버튼을 눌러 이미지 업로드'}
          />
        );

      case 'Link':
        return (
          <EditableLinkBlock
            wysiwygType={wysiwygType}
            linkBlockType={linkBlockType}
            contentEditable={contentEditable}
            html={eachBlockStateText}
            data={data as ILinkData}
            currentIndex={currentIndex}
            setTempPostHtmlData={setCurrentBlockTempPostHtmlData}
            setPostHtmlData={setCurrentBlockPostHtmlData}
            onKeyPress={onKeyPress}
            onKeyDown={onKeyDown}
            addBlockFocusUseEffectDependency={addBlockFocusUseEffectDependency}
            removeCurrentBlockFocusUseEffectDependency={
              removeCurrentBlockFocusUseEffectDependency
            }
            placeholder='링크 제목 입력'
          />
        );

      case 'Code':
        return (
          <EditableCodeBlock
            contentEditable={contentEditable}
            data={data as ICodeData}
            html={eachBlockStateText}
            currentIndex={currentIndex}
            setTempPostHtmlData={setCurrentBlockTempPostHtmlData}
            // setPostHtmlData={setCurrentBlockPostHtmlData}
            onKeyPress={onKeyPress}
            onKeyDown={onKeyDown}
            addBlockFocusUseEffectDependency={addBlockFocusUseEffectDependency}
            removeCurrentBlockFocusUseEffectDependency={
              removeCurrentBlockFocusUseEffectDependency
            }
            placeholder='코드 입력'
          />
        );

      default:
        return (
          <EditableTextBlock
            blockType={type}
            contentEditable={contentEditable}
            html={eachBlockStateText}
            setTempPostHtmlData={setCurrentBlockTempPostHtmlData}
            setPostHtmlData={setCurrentBlockPostHtmlData} // `` 때문에 필요
            onKeyPress={onKeyPress}
            onKeyDown={onKeyDown}
            addBlockFocusUseEffectDependency={addBlockFocusUseEffectDependency}
            removeCurrentBlockFocusUseEffectDependency={
              removeCurrentBlockFocusUseEffectDependency
            }
            placeholder='텍스트 입력'
          />
        );
    }
  };

  return (
    <>
      {contentEditable && wysiwygType !== 'Link' ? (
        <div className={styles.edit__block__type__editable__element__switch}>
          <select value={type} onChange={changeBlockType}>
            <option value='Paragraph'>Paragraph</option>
            <option value='Heading1'>Heading1</option>
            <option value='Heading2'>Heading2</option>
            <option value='Heading3'>Heading3</option>
            <option value='Image'>Image</option>
            <option value='Code'>Code</option>
            <option value='Link'>Link</option>
          </select>
          {switchBlocks()}
        </div>
      ) : (
        <>{switchBlocks()}</>
      )}
    </>
  );
};

export default memo(EditableElementSwitch);
