import DOMPurify from 'dompurify';
import { useEffect, useRef } from 'react';
import { IParagraphData } from '../../redux-toolkit/model/post-data-model';
import { focusContentEditableTextToEnd } from '../utils/focus-content-editable-text-to-end';

export const useEditable = (
  html: string,
  syncTempPostWithPasteText: (newInnerPasteText: string) => void,
  addBlockFocusUseEffectDependency?: IParagraphData,
  removeCurrentBlockFocusUseEffectDependency?: IParagraphData
) => {
  const ref = useRef<HTMLHeadingElement | HTMLParagraphElement | any>(null);

  // 블록 안에 ``을 추가하거나 블록을 지울 때의 focusing은 여기가 아닌 <EditableElementSwitch />에서 관리해야 함.

  useEffect(() => {
    const getTextDataFromClipboard = (e: ClipboardEvent) => {
      e.preventDefault();
      const pastedData = e.clipboardData;
      const textData = pastedData?.getData('Text');

      // contentEditable의 innerHtml, TempRef, setText 모두 동기화!
      if (ref.current) {
        // (TODO) 가장 뒤에 붙여넣기가 되므로 고칠 필요가 있음. -> 셀렉션 커서 혹은 영역을 찾아서 각각 대응해줘야 함.
        // const newInnerPasteText = DOMPurify.sanitize(
        //   `${ref.current.innerHTML}${textData}`
        // );
        const newInnerPasteText = `${ref.current.innerHTML}${textData}`;
        ref.current.innerText = newInnerPasteText;

        syncTempPostWithPasteText(newInnerPasteText); // 데이터 싱크를 위해 dispatch 및 setText(EditableElementSwitch 이용하는 경우 onKeyDown에서 text useState() 필요) 함수를 받아와 실행
        focusContentEditableTextToEnd(ref.current);
      }
    };

    ref.current?.addEventListener('paste', (e: ClipboardEvent) => {
      getTextDataFromClipboard(e);
    });

    return ref.current?.removeEventListener('paste', (e: ClipboardEvent) => {
      getTextDataFromClipboard(e);
    });
  }, []);

  // 새로 생성된 블럭의 커서 위치, 다음 블럭이 지워졌을 때 focus()
  useEffect(() => {
    ref.current && focusContentEditableTextToEnd(ref.current);
    // *** html은 제목에서도 `` 쓸 수 있도록 하기 위해서
    // datas[currentIndex]은 `` 등 요소로 리렌더될 때 커서 위치 선정
    // datas[currentIndex + 1]은 다음 블럭 지워진 걸 감지하는 의존성 배열 요소. 여기서 받아온 datas는 초기화 및 블럭의 생성과 삭제만 담당하는 클라이언트 데이터(post), 따라서 삭제된 시점을 정확히 알 수 있음.
  }, [
    html,
    addBlockFocusUseEffectDependency,
    removeCurrentBlockFocusUseEffectDependency,
  ]);

  return ref;
};
