import classNames from 'classnames';
import DOMPurify from 'dompurify';
import { ChangeEvent, FC, KeyboardEvent } from 'react';
import { useEditable } from '../../lib/hooks/useEditable';
import { addInlineCodeBlock } from '../../lib/utils/editable-block/add-inline-code-block';
import { IParagraphData } from '../../redux-toolkit/model/post-data-model';
import styles from './editable-element.module.scss';

type Props = {
  TagName: 'h1' | 'h2' | 'h3' | 'p' | 'code' | 'figcaption';
  contentEditable: boolean;
  html: string;
  setTempPostHtmlData: (inputHtml: string) => void;
  setPostHtmlData: (inputHtml: string) => void;
  onKeyPress?: (e: KeyboardEvent<HTMLElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLElement>) => void;
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
  setTempPostHtmlData,
  setPostHtmlData,
  onKeyPress,
  onKeyDown,
  addBlockFocusUseEffectDependency,
  removeCurrentBlockFocusUseEffectDependency,
  placeholder = '',
  customClassName,
}) => {
  // setTempPostHtmlData과 setPostHtmlData는 모두 current index와 관련있으므로 switch에서 처리하고 props로 넘겨받음!
  const onInput = (
    e: ChangeEvent<HTMLHeadingElement | HTMLParagraphElement>
  ) => {
    const inputHtml = e.target.innerHTML;
    setTempPostHtmlData(inputHtml);
    addInlineCodeBlock(inputHtml, setTempPostHtmlData, setPostHtmlData);
  };

  const ref = useEditable(
    html,
    setTempPostHtmlData,
    addBlockFocusUseEffectDependency,
    removeCurrentBlockFocusUseEffectDependency
  );

  // 특정 코드(<code> 등)만 html로 변환하기 위해, 나중에 <b> 등도 추가
  const hasCodeElement = html.includes('</code>');
  const switchHtml = hasCodeElement ? (
    <TagName
      ref={ref}
      contentEditable={contentEditable}
      suppressContentEditableWarning={contentEditable}
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
      onInput={onInput}
      onKeyPress={onKeyPress} // optional, 블록 추가
      onKeyDown={onKeyDown} // optional, 블록 삭제
      spellCheck={false}
      placeholder={contentEditable ? placeholder : undefined}
      className={classNames(styles.editable__element, customClassName)}
    />
  ) : (
    <TagName
      ref={ref}
      contentEditable={contentEditable}
      suppressContentEditableWarning={contentEditable}
      // dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
      onInput={onInput}
      onKeyPress={onKeyPress} // optional, 블록 추가
      onKeyDown={onKeyDown} // optional, 블록 삭제
      spellCheck={false}
      placeholder={contentEditable ? placeholder : undefined}
      className={classNames(styles.editable__element, customClassName)}
    >
      {html}
    </TagName>
  );

  return <>{switchHtml}</>;
};

export default EditableElement;
