import classNames from 'classnames';
import DOMPurify from 'dompurify';
import { ChangeEvent, FC, KeyboardEvent, MutableRefObject } from 'react';
import { useEditable } from '../../lib/hooks/useEditable';
import { addInlineCodeBlock } from '../../lib/utils/editable-block/add-inline-code-block';
import { replaceCaret } from '../../lib/utils/focus-content-editable-text-to-end';
import { IParagraphData } from '../../redux-toolkit/model/post-data-model';
import styles from './editable-element.module.scss';

type Props = {
  TagName: 'h1' | 'h2' | 'h3' | 'p' | 'code' | 'figcaption';
  eachBlockRef: MutableRefObject<any>;
  contentEditable: boolean;
  html: string;
  setCurrentBlockTempPostHtmlData: (inputHtml: string) => void;
  setCurrentBlockPostHtmlData: (inputHtml: string) => void;
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
  eachBlockRef,
  contentEditable = false,
  html,
  setCurrentBlockTempPostHtmlData,
  setCurrentBlockPostHtmlData,
  onKeyPress,
  onKeyDown,
  addBlockFocusUseEffectDependency,
  removeCurrentBlockFocusUseEffectDependency,
  placeholder = '',
  customClassName,
}) => {
  // setCurrentBlockTempPostHtmlData과 setCurrentBlockPostHtmlData는 모두 current index와 관련있으므로 switch에서 처리하고 props로 넘겨받음!
  const onInput = (
    e: ChangeEvent<HTMLHeadingElement | HTMLParagraphElement>
  ) => {
    e.preventDefault();
    // https://developer.mozilla.org/ko/docs/Web/API/Element/innerHTML
    // innerHtml은 HTML 태그와 관련된 문자열  (&), (<), (>)를 "&amp;", "&lt;" ,"&gt;"로 보관해 inline 코드로 쓰고 싶을 때만 쓸 수 있도록 한다.
    // 텍스트를 쓰는 동안 바로 코드로 바뀌지 않도록 하기 위해서다.
    // <code class="inline__code__block"></code>는 input 이벤트가 아닌 전체 데이터 상태 업데이트를 통해 갖고 있기 때문에 <> 등이 그대로 남아있다.
    // *** 즉 서버에서 데이터로 가져올 때 내가 원하는 부분만 변환이 가능하다.
    // *** input 이벤트로 들어오는 html은 정규식으로 변환됨!
    // *** [KEY] dangerouslySetInnerHTML로 들어가는 html에서 정규식 변환된 "&amp;", "&lt;" ,"&gt;"는 텍스트로, < > &는 실제 html 요소로 렌더링한다!
    const inputHtml = e.target.innerHTML;
    addInlineCodeBlock(inputHtml, updateInlineBlock, eachBlockRef);
    setCurrentBlockTempPostHtmlData(inputHtml); // 여기 순서가 커서 위치에 문제가 될 수 있음 -> countBacktick 조건을 여기서 해서 조건문 만들면 해결할 수 있을듯.

    // console.log('inputHtml', inputHtml);
  };

  const updateInlineBlock = (inputHtml: string) => {
    setCurrentBlockTempPostHtmlData(inputHtml);
    setCurrentBlockPostHtmlData(inputHtml);
  };

  return (
    <TagName
      ref={eachBlockRef}
      contentEditable={contentEditable}
      suppressContentEditableWarning={contentEditable}
      // *** [KEY] dangerouslySetInnerHTML로 들어가는 html에서 정규식 변환된 "&amp;", "&lt;" ,"&gt;"는 텍스트로, < > &는 html 요소로 렌더링한다!
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
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
