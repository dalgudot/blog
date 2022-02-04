import { useEffect } from 'react';
import { updateTotalVisitors } from '../../service/firebase/realtime-db';

export const useUpdateTotalVisitors = () => {
  useEffect(() => {
    updateTotalVisitors(); // 방문자 수 업데이트할지 안 할지 결정
  }, []);
};
