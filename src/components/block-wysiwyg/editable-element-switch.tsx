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
import { ICodeData } from '../../redux-toolkit/model/code-data-model';
import { paste } from '../../lib/utils/editable-block/paste';
import { useEditable } from '../../lib/hooks/useEditable';
import { addSpacing__afterInlineCode } from '../../lib/utils/editable-block/add-spacing-after-inline-code';
import { moveCaret__betweenInlineCodeAndSpacing } from '../../lib/utils/editable-block/move-caret-between-inline-code-and-spacing';
import styles from './editable-element.module.scss';

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
  // 업데이트는 각 컴포넌트의 setTempEachBlockStateHtml, setEachBlockStateHtml로 컴포넌트별 렌더링으로 성능 극대화
  const [type, setType] = useState<TBlockType>(data.blockType);
  const [tempEachBlockStateHtml, setTempEachBlockStateHtml] = useState<string>(
    data.html
  ); // block 지울 때 활용
  const [eachBlockStateHtml, setEachBlockStateHtml] = useState<string>(
    data.html
  ); // add inline code block처럼 전체 렌더링이 아닌 블럭 개별 렌더링만 할 때
  const dispatch = useAppDispatch();
  const datasLength = datas.length;

  useEffect(() => {
    setType(data.blockType);
  }, [data.blockType]);
  // console.log(currentIndex, data.blockType, type);

  useEffect(() => {
    setTempEachBlockStateHtml(data.html);
    setEachBlockStateHtml(data.html);
  }, [data.html]);
  // console.log(currentIndex, tempEachBlockStateHtml, eachBlockStateHtml);

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

  const [indexAddedSpacing, setIndexAddedSpacing] = useState<
    number | undefined
  >(undefined);

  useEffect(() => {
    if (indexAddedSpacing !== undefined) {
      const selection: Selection | null = window.getSelection();

      const setCaret__newSpacing = () => {
        const targetNode = eachBlockRef.current?.childNodes[indexAddedSpacing];
        const newRange = document.createRange();
        newRange.setStart(targetNode, 1); // 코드 블럭 한 칸 뒤쪽 위치

        selection && selection.removeAllRanges();
        selection && selection.addRange(newRange);
      };
      setCaret__newSpacing();
      setIndexAddedSpacing(undefined);
    }
  }, [indexAddedSpacing]);

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    // html 텍스트가 없고, 블록이 2개 이상이고, Backspace를 누른 경우
    if (
      tempEachBlockStateHtml === '' &&
      datasLength > 1 &&
      e.key === 'Backspace'
    ) {
      e.preventDefault();
      removeBlock();
    }

    if (type !== 'Code') {
      // 붙여넣기 command + v
      if (e.metaKey && e.key === 'v') {
        e.preventDefault();
        paste(eachBlockRef, setData__withForcedReactRendering);
      }

      const childeNodes: NodeListOf<ChildNode> =
        eachBlockRef.current?.childNodes;

      // 2번째엔 caret targetNode가 undefined > 이유는 모르겠지만 아래 조건문으로 보완, 해결됨.
      if (e.key === 'ArrowRight') {
        addSpacing__afterInlineCode(
          childeNodes,
          e,
          setData__withForcedReactRendering,
          setIndexAddedSpacing
        );
      }

      // 위 조건 보완!
      // 선택 영역(isSelection)으로 지웠을 때
      // 렌더링 없이, 인라인 코드 블럭 오른쪽 한 칸 삭제 못하도록 하고, 커서 이동
      if (e.key === 'Backspace') {
        moveCaret__betweenInlineCodeAndSpacing(childeNodes, e);
      }
    }

    if (e.metaKey && e.key === 'a') {
      // 전체 선택
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

    // https://stackoverflow.com/questions/15015019/prevent-chrome-from-wrapping-contents-of-joined-p-with-a-span
  };

  const setData__withForcedReactRendering = (newHtml: string) => {
    setEachBlockStateHtml(''); // ***중요*** 같은 문자열 복사 후 지우고 다시 붙여넣으면 리액트에서 같다고 판단해 렌더링하지 않는 문제 해결
    setCurrentBlockTempPostHtmlData(newHtml);
    setTempEachBlockStateHtml(newHtml);
    setEachBlockStateHtml(newHtml); // 현재 블록만 렌더링
  };

  // onInput에서 이용
  const setCurrentBlockTempPostHtmlData = (inputHtml: string) => {
    if (wysiwygType === 'Link') {
      dispatch(setCurrentLinkBlockTempHtml({ inputHtml, currentIndex }));
    } else {
      dispatch(setCurrentBlockTempHtml({ inputHtml, currentIndex }));
    }

    setTempEachBlockStateHtml(inputHtml); // 리덕스에서 tempHtml을 가져오면 계속 전체 리렌더가 일어나기 때문에 해당 컴포넌트의 state로 관리
  };

  // updateDataWithInlineBlock에서 이용
  const setCurrentBlockPostHtmlData = (inputHtml: string) => {
    setEachBlockStateHtml(inputHtml); // 현재 블록만 렌더링
  };

  const addBlockFocusUseEffectDependency = datas[currentIndex];
  const removeCurrentBlockFocusUseEffectDependency = datas[currentIndex + 1];

  const eachBlockRef = useEditable(
    eachBlockStateHtml,
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
            html={eachBlockStateHtml}
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
            html={eachBlockStateHtml}
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
            html={eachBlockStateHtml}
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
            blockId={data.blockId}
            eachBlockRef={eachBlockRef}
            contentEditable={contentEditable}
            html={eachBlockStateHtml}
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
      {contentEditable && wysiwygType !== 'Link' && (
        <div className={styles.edit__block__type__editable__element__switch}>
          <span className={styles.currentIndex}>{currentIndex}</span>
          <select value={type} onChange={changeBlockType}>
            <option value='Paragraph'>Paragraph</option>
            <option value='Heading1'>Heading1</option>
            <option value='Heading2'>Heading2</option>
            <option value='Heading3'>Heading3</option>
            <option value='Image'>Image</option>
            <option value='Code'>Code</option>
            <option value='Link'>Link</option>
          </select>
        </div>
      )}
      {switchBlocks()}
    </>
  );
};

export default EditableElementSwitch;
