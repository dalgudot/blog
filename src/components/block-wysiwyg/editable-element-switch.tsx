import { ChangeEvent, FC, KeyboardEvent, useEffect, useState } from 'react';
import {
  addNewBlock,
  addNewLinkBlock,
  removeCurrentBlock,
  removeLinkBlock,
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
import { paste } from '../../lib/utils/editable-block/paste';
import { useEditable } from '../../lib/hooks/useEditable';
import { getSelectionEndIndex } from '../../lib/utils/editable-block/node';

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
  // console.log(currentIndex, 'data.html', data.html);
  // data.html은 최초 초기화만 해주는 역할. 초기화 이후 어디서도 업데이트하지 않음.
  // 업데이트는 각 컴포넌트의 setTempEachBlockStateText, setEachBlockStateText로 컴포넌트별 렌더링으로 성능 극대화
  const [type, setType] = useState<TBlockType>(data.blockType);
  const [tempEachBlockStateText, setTempEachBlockStateText] = useState<string>(
    data.html
  ); // block 지울 때 활용
  const [eachBlockStateText, setEachBlockStateText] = useState<string>(
    data.html
  ); // add inline code block처럼 전체 렌더링이 아닌 블럭 개별 렌더링만 할 때
  const dispatch = useAppDispatch();
  const datasLength = datas.length;

  useEffect(() => {
    setType(data.blockType);
  }, [data.blockType]);
  // console.log(currentIndex, data.blockType, type);

  useEffect(() => {
    setTempEachBlockStateText(data.html);
    setEachBlockStateText(data.html);
  }, [data.html]);
  // console.log(currentIndex, tempEachBlockStateText, eachBlockStateText);

  const changeBlockType = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const newBlockType = e.target.value as TBlockType;

    setType(newBlockType); // 해당 blockType만 업데이트하고 렌더링하기 위해
    dispatch(setTempBlockTypeData({ newBlockType, currentIndex }));
  };

  // *** [배열 업데이트] 초기화 데이터는 addBlock()과 removeBlock()에서만 업데이트! -> *** 배열 업데이트 위해
  const addBlock = () => {
    const isEnd: boolean = currentIndex === datasLength - 1;

    if (wysiwygType === 'Link') {
      dispatch(addNewLinkBlock({ currentIndex, isEnd }));
      dispatch(addTempNewLinkBlock({ currentIndex, isEnd }));
    } else {
      dispatch(addNewBlock({ currentIndex, isEnd })); // 새로운 블럭 그리기 위해
      dispatch(addTempNewBlock({ currentIndex, isEnd })); // 데이터 저장하기 위해
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
    // shift + Enter는 줄바꿈
    if (!e.shiftKey && e.key === 'Enter') {
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

    // 붙여넣기 command + v
    if (e.metaKey && e.key === 'v') {
      e.preventDefault();
      paste(eachBlockRef, setPasteData);
    }

    // console.log('selectionEndIndex', selectionEndIndex);

    // 렌더링 없이, 인라인 코드 블럭 오른쪽 한 칸 삭제 못하도록 하고, 커서 이동
    if (e.key === 'Backspace') {
      // 이 경우 커서만 이동할 뿐 서버에 저장될 데이터는 전후로 동일함.
      // 즉 커서만 이동할 뿐 데이터는 동기화된 상태
      const selection: Selection | null = window.getSelection();
      const childeNodes = eachBlockRef.current?.childNodes;
      const range = selection?.getRangeAt(0);
      const collapsed = range?.collapsed;

      const selectionEndIndex = getSelectionEndIndex(childeNodes, selection);

      if (
        collapsed &&
        selectionEndIndex !== 0 &&
        childeNodes[selectionEndIndex].textContent ===
          ('\u00A0' || '&nbsp;' || ' ') &&
        childeNodes[selectionEndIndex - 1].nodeName === 'CODE'
      ) {
        e.preventDefault();
        const targetNode = childeNodes[selectionEndIndex - 1].childNodes[0];
        const newCaretPosition = targetNode.textContent.length;

        const newRange = document.createRange();
        newRange.setStart(targetNode, newCaretPosition); // 코드 블럭 한 칸 뒤쪽 위치

        selection && selection.removeAllRanges();
        selection && selection.addRange(newRange);
      }
    }

    // if (
    //   e.key === 'Backspace' &&
    //   endContainer?.parentNode?.nodeName === 'CODE' &&
    //   endContainer?.textContent?.length === 1 // 커서로 하나씩 지우는 경우
    // ) {
    //   // https://pmakesperfect.tistory.com/366
    //   // e.preventDefault();
    //   // 데이터 동기화가 관건
    //   console.log('크롬 버그 동작');
    //   // 앞선 노드의 마지막 글자를 지우고 다시 생성
    //   // 코드 블럭 앞에 #text 노드가 없다면? 이 방법으로 해결 불가

    //   // https://stackoverflow.com/questions/15015019/prevent-chrome-from-wrapping-contents-of-joined-p-with-a-span
    // }
  };

  const setPasteData = (newHtml: string) => {
    setEachBlockStateText(''); // ***중요*** 같은 문자열 복사 후 지우고 다시 붙여넣으면 리액트에서 같다고 판단해 렌더링하지 않는 문제 해결
    setCurrentBlockTempPostHtmlData(newHtml);
    setTempEachBlockStateText(newHtml);
    setEachBlockStateText(newHtml); // 현재 블록만 렌더링
  };

  // onInput에서 이용
  const setCurrentBlockTempPostHtmlData = (inputHtml: string) => {
    if (wysiwygType === 'Link') {
      dispatch(setCurrentLinkBlockTempHtml({ inputHtml, currentIndex }));
    } else {
      dispatch(setCurrentBlockTempHtml({ inputHtml, currentIndex }));
    }

    setTempEachBlockStateText(inputHtml); // 리덕스에서 tempHtml을 가져오면 계속 전체 리렌더가 일어나기 때문에 해당 컴포넌트의 state로 관리
  };

  // updateDataWithInlineBlock에서 이용
  const setCurrentBlockPostHtmlData = (inputHtml: string) => {
    setEachBlockStateText(inputHtml); // 현재 블록만 렌더링
  };

  const addBlockFocusUseEffectDependency = datas[currentIndex];
  const removeCurrentBlockFocusUseEffectDependency = datas[currentIndex + 1];

  const eachBlockRef = useEditable(
    eachBlockStateText,
    addBlockFocusUseEffectDependency,
    removeCurrentBlockFocusUseEffectDependency
  );

  const switchBlocks = () => {
    switch (type) {
      case 'Image':
        return (
          <EditableImageBlock
            blockId={data.blockId}
            eachBlockRef={eachBlockRef}
            contentEditable={contentEditable}
            html={eachBlockStateText}
            imageDownloadURL={data.url}
            currentIndex={currentIndex}
            setCurrentBlockTempPostHtmlData={setCurrentBlockTempPostHtmlData}
            setCurrentBlockPostHtmlData={setCurrentBlockPostHtmlData}
            onKeyPress={onKeyPress}
            onKeyDown={onKeyDown}
            placeholder={data.url ? '캡션 입력' : '버튼을 눌러 이미지 업로드'}
          />
        );

      case 'Link':
        return (
          <EditableLinkBlock
            wysiwygType={wysiwygType}
            linkBlockType={linkBlockType}
            eachBlockRef={eachBlockRef}
            contentEditable={contentEditable}
            html={eachBlockStateText}
            data={data as ILinkData}
            currentIndex={currentIndex}
            setCurrentBlockTempPostHtmlData={setCurrentBlockTempPostHtmlData}
            setCurrentBlockPostHtmlData={setCurrentBlockPostHtmlData}
            onKeyPress={onKeyPress}
            onKeyDown={onKeyDown}
            placeholder='링크 제목 입력'
          />
        );

      case 'Code':
        return (
          <EditableCodeBlock
            eachBlockRef={eachBlockRef}
            contentEditable={contentEditable}
            data={data as ICodeData}
            html={eachBlockStateText}
            currentIndex={currentIndex}
            setCurrentBlockTempPostHtmlData={setCurrentBlockTempPostHtmlData}
            // setCurrentBlockPostHtmlData={setCurrentBlockPostHtmlData}
            onKeyPress={onKeyPress}
            onKeyDown={onKeyDown}
            placeholder='코드 입력'
          />
        );

      default:
        return (
          <EditableTextBlock
            blockType={type}
            eachBlockRef={eachBlockRef}
            contentEditable={contentEditable}
            html={eachBlockStateText}
            setCurrentBlockTempPostHtmlData={setCurrentBlockTempPostHtmlData}
            setCurrentBlockPostHtmlData={setCurrentBlockPostHtmlData}
            onKeyPress={onKeyPress}
            onKeyDown={onKeyDown}
            placeholder='텍스트 입력'
          />
        );
    }
  };

  return (
    <>
      {contentEditable && wysiwygType !== 'Link' ? (
        <>
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
          <span className={styles.currentIndex__wrapper}>
            <span className={styles.currentIndex}>{currentIndex}</span>
          </span>
        </>
      ) : (
        <>{switchBlocks()}</>
      )}
    </>
  );
};

export default EditableElementSwitch;
