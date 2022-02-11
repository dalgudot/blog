import { useEffect } from 'react';

export const usePreventRightClick = () => {
  useEffect(() => {
    // 마우스 오른쪽 클릭(oncontextmenu), 왼쪽 마우스 이미지 드래그(ondragstart), 왼쪽 마우스 문자 드래그(onselectstart), 키보드 단축키 복사(onkeydown) 막기
    // document.onkeydown은 확대 축소를 못하므로 제외

    // document.ondragstart =
    // document.onselectstart =
    document.oncontextmenu = () => {
      return false;
    };
  }, []);
};
