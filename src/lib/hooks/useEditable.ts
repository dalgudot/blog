import { useEffect, useRef } from 'react';
import { IParagraphData } from '../../redux-toolkit/model/post-data-model';
import { focusContentEditableTextToEnd } from '../utils/focus-content-editable-text-to-end';

export const useEditable = (
  html: string,
  addBlockFocusUseEffectDependency?: IParagraphData,
  removeCurrentBlockFocusUseEffectDependency?: IParagraphData
) => {
  // 블록 안에 ``을 추가하거나 블록을 지울 때의 focusing은 여기가 아닌 <EditableElementSwitch />에서 관리해야 함.
  const ref = useRef<HTMLHeadingElement | HTMLParagraphElement | any>(null);

  // 새로 생성된 블럭의 커서 위치, 다음 블럭이 지워졌을 때 focus()
  useEffect(() => {
    ref.current && focusContentEditableTextToEnd(ref.current);
    // *** html은 붙여넣기, add inline block 등
    // addBlockFocusUseEffectDependency = datas[currentIndex]은 `` 등 요소로 리렌더될 때 커서 위치 선정
    // removeCurrentBlockFocusUseEffectDependency = datas[currentIndex + 1]은 다음 블럭 지워진 걸 감지하는 의존성 배열 요소. 여기서 받아온 datas는 초기화 및 블럭의 생성과 삭제만 담당하는 클라이언트 데이터(post), 따라서 삭제된 시점을 정확히 알 수 있음.
  }, [
    html,
    addBlockFocusUseEffectDependency,
    removeCurrentBlockFocusUseEffectDependency,
  ]);

  return ref;
};
