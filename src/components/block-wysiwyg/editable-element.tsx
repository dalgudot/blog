import classNames from 'classnames';
import { ChangeEvent, FC, KeyboardEvent, useEffect, useRef } from 'react';
import { useEditable } from '../../lib/hooks/useEditable';
import { IParagraphData } from '../../redux-toolkit/model/post-data-model';
import styles from './editable-element.module.scss';

type Props = {
  TagName: 'h1' | 'h2' | 'h3' | 'p' | 'code' | 'figcaption';
  contentEditable: boolean;
  html: string;
  onInput?: (e: ChangeEvent<HTMLHeadingElement | HTMLParagraphElement>) => void;
  onKeyPress?: (e: KeyboardEvent<HTMLElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLElement>) => void;
  syncTempPostWithPasteText: (newInnerPasteText: string) => void;
  addBlockFocusUseEffectDependency?: IParagraphData;
  removeCurrentBlockFocusUseEffectDependency?: IParagraphData;
  placeholder: string;
  customClassName?: string;
};

// 개별로 쓸 수 있도록 만들거나, map()으로 블록 만들 때도 쓸 수 있도록 만든 컴포넌트 > 아마 텍스트에만 쓰일 듯.
const EditableElement: FC<Props> = ({
  TagName,
  contentEditable = false,
  html,
  onInput,
  onKeyPress,
  onKeyDown,
  syncTempPostWithPasteText,
  addBlockFocusUseEffectDependency,
  removeCurrentBlockFocusUseEffectDependency,
  placeholder = '',
  customClassName,
}) => {
  const ref = useEditable(
    html,
    syncTempPostWithPasteText,
    addBlockFocusUseEffectDependency,
    removeCurrentBlockFocusUseEffectDependency
  );
  // code 블럭 등 라이브러리를 쓰는 editable element에서도 로직 재사용하기 위해 훅으로 !

  return (
    <TagName
      ref={ref}
      contentEditable={contentEditable}
      suppressContentEditableWarning={contentEditable}
      dangerouslySetInnerHTML={{ __html: html }}
      onInput={onInput}
      onKeyPress={onKeyPress} // optional, 블록 추가
      onKeyDown={onKeyDown} // optional, 블록 삭제
      spellCheck={false}
      placeholder={contentEditable ? placeholder : undefined}
      className={classNames(styles.editable__element, customClassName)}
    />
  );
};

export default EditableElement;
