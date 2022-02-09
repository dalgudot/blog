import { useEffect } from 'react';
import { updateTotalVisitors } from '../../service/firebase/realtime-db';

export const useUpdateVisitors = () => {
  useEffect(() => {
    const unSubscribeOnValueRealtimeDB = updateTotalVisitors(); // 방문자 수 업데이트할지 안 할지도 결정

    return () => {
      unSubscribeOnValueRealtimeDB && unSubscribeOnValueRealtimeDB();
    };
  }, []);
};
