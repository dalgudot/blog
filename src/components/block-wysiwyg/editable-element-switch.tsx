import {
  ChangeEvent,
  Dispatch,
  FC,
  KeyboardEvent,
  SetStateAction,
  useEffect,
  useRef,
} from 'react';
import { focusContentEditableTextToEnd } from '../../lib/utils/focus-content-editable-text-to-end';
import { IRefData } from '../../redux-toolkit/model/ref-data-model';
import { setTempRefTitleData } from '../../redux-toolkit/slices/temp-post-slice';
import { useAppDispatch } from '../../redux-toolkit/store';
import EditableElement from './editable-element';
import styles from './editable-element-switch.module.scss';

type Props = {
  // blockType?:
  //   | 'Heading1'
  //   | 'Heading2'
  //   | 'Heading3'
  //   | 'Paragraph'
  //   | 'Code'
  //   | 'Link';
  TagName: 'h1' | 'h2' | 'h3' | 'p';
  contentEditable: boolean;
  datas: IRefData[];
  currentIndex: number;
  html: string;
  onInput?: (e: ChangeEvent<HTMLHeadingElement | HTMLParagraphElement>) => void;
  onKeyPress?: (e: KeyboardEvent<HTMLElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLElement>) => void;
  setText?: Dispatch<SetStateAction<string>>;
  spellCheck?: boolean;
  placeholder?: string;
  customClassName?: string;
};

const EditableElementSwitch: FC<Props> = ({
  // blockType,
  TagName,
  contentEditable,
  datas,
  currentIndex,
  html,
  onInput,
  onKeyPress,
  onKeyDown,
  setText,
  spellCheck = false,
  placeholder = '',
  customClassName = styles.editable__element,
}) => {
  const ref = useRef<HTMLHeadingElement | HTMLParagraphElement>(null);

  // 새로 생성된 블럭의 커서 위치, 다음 블럭이 지워졌을 때 focus()
  useEffect(() => {
    contentEditable &&
      ref.current &&
      focusContentEditableTextToEnd(ref.current);

    // datas[currentIndex]은 `` 등 요소로 리렌더될 때 커서 위치 선정
    // datas[currentIndex + 1]은 다음 블럭 지워진 걸 감지하는 의존성 배열 요소. 여기서 받아온 datas는 초기화 및 블럭의 생성과 삭제만 담당하는 클라이언트 데이터, 따라서 삭제된 시점을 정확히 알 수 있음.
  }, [datas[currentIndex], datas[currentIndex + 1]]);

  const dispatch = useAppDispatch();

  const syncPasteText = (newInnerPurePasteText: string) => {
    dispatch(
      setTempRefTitleData({
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
        onInput={onInput} // 필수
        onKeyPress={onKeyPress} // 블록 추가
        onKeyDown={onKeyDown} // 블록 삭제
        syncPasteText={syncPasteText}
        placeholder={placeholder}
        customClassName={customClassName}
      />
    </>
  );
};

export default EditableElementSwitch;
