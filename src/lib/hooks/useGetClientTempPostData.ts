import { RootState, useAppSelector } from '../../redux-toolkit/store';

export const useGetClientTempPostData = () => {
  // 데이터 저장 위해(contentEditable 요소가 매번 렌더링될 때마다 생기는 문제 방지)
  const { tempPost } = useAppSelector((state: RootState) => state.tempPost);

  return { tempPost };
};
