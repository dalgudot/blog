import { RootState, useAppSelector } from '../../redux-toolkit/store';

export const useGetClientPostData = () => {
  // 초기화 및 map() 상태 관리(새로운 블럭 그리는 일 등)
  const { post } = useAppSelector((state: RootState) => state.post);

  return { post };
};
