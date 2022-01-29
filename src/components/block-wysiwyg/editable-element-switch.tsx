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
import { TBlockType } from '../../redux-toolkit/model/paragraph-data-model';
import { IRefData } from '../../redux-toolkit/model/ref-data-model';
import { setTempRefTitleData } from '../../redux-toolkit/slices/temp-post-slice';
import { useAppDispatch } from '../../redux-toolkit/store';
import EditableElement from './editable-element';
import styles from './editable-element-switch.module.scss';

type Props = {
  blockType: TBlockType;
  TagName: 'h1' | 'h2' | 'h3' | 'p';
  contentEditable: boolean;
  datas: IRefData[];
  currentIndex: number;
  html: string;
  onInput?: (e: ChangeEvent<HTMLHeadingElement | HTMLParagraphElement>) => void;
  onKeyPress?: (e: KeyboardEvent<HTMLElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLElement>) => void;
  setText?: Dispatch<SetStateAction<string>>;
  placeholder?: string;
  customClassName?: string;
};

const EditableElementSwitch: FC<Props> = ({
  blockType,
  TagName,
  contentEditable,
  datas,
  currentIndex,
  html,
  onInput,
  onKeyPress,
  onKeyDown,
  setText,
  placeholder = '',
  customClassName = styles.editable__element,
}) => {
  const dispatch = useAppDispatch();

  const syncTempPostWithPasteText = (newInnerPurePasteText: string) => {
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
        addBlockFocusUseEffectDependency={datas[currentIndex]}
        removeBlockFocusUseEffectDependency={datas[currentIndex + 1]}
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
