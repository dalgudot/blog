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
  setRefTitleData,
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
  const [text, setText] = useState<string>(data.title);

  const onInput = (
    e: ChangeEvent<HTMLHeadingElement | HTMLParagraphElement>
  ) => {
    const inputPureHtml = DOMPurify.sanitize(e.target.innerHTML);
    dispatch(setTempRefTitleData({ inputPureHtml, currentIndex }));
    setText(inputPureHtml); // onKeyDown의 removeBlock() 조건 + 렌더링 성능 위해

    const countBacktick = inputPureHtml.match(/`/g)?.length; // ` 개수
    if (countBacktick === 2) {
      addInlineCodeBlock(inputPureHtml);
    }
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

  const addInlineCodeBlock = (inputPureHtml: string) => {
    const isContinuousBacktick: boolean = inputPureHtml.includes('``');

    if (isContinuousBacktick) {
      // 2개 연속(``)이면 빈 Block으로 생성
      const emptyCodeInlineBlock = inputPureHtml.replace(
        '``',
        '&nbsp<code>&nbsp</code>&nbsp'
      );

      // 새로운 내용 전달 위해 전체 리렌더
      dispatch(
        setRefTitleData({
          inputPureHtml: emptyCodeInlineBlock,
          currentIndex,
        })
      );
      dispatch(
        setTempRefTitleData({
          inputPureHtml: emptyCodeInlineBlock,
          currentIndex,
        })
      );
      setText(emptyCodeInlineBlock); // onKeyDown의 removeBlock() 조건 + 렌더링 성능 위해
    } else {
      // 첫 번째 `는 <code>로 두 번째 `는 </code>로!
      const firstBacktickToTag = inputPureHtml.replace('`', '&nbsp<code>'); // &nbsp is for design
      const secondBacktickToTag = firstBacktickToTag.replace(
        '`',
        `</code>&nbsp` // &nbsp로 코드 블럭 벗어나기
      );

      dispatch(
        setRefTitleData({
          inputPureHtml: secondBacktickToTag,
          currentIndex,
        })
      );
      dispatch(
        setTempRefTitleData({
          inputPureHtml: secondBacktickToTag,
          currentIndex,
        })
      );
      setText(secondBacktickToTag); // onKeyDown의 removeBlock() 조건 + 렌더링 성능 위해
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
