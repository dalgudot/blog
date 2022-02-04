import { ref, set, onValue } from 'firebase/database';
import { Dispatch, SetStateAction } from 'react';
import { realtimeDB } from './config';

/**
 *
 * 재사용 함수
 */
export const updateNumberRealtimeDB = (path: string) => {
  const dbRef = ref(realtimeDB, path);

  onValue(
    dbRef,
    (snapshot) => {
      const data = snapshot.val();
      const updateData = Number(data) + 1;
      set(dbRef, updateData);
    },
    {
      onlyOnce: true,
    }
  );
};
/**
 *
 * 재사용 함수
 */

export const updateTotalVisitors = () => {
  const visited = sessionStorage.getItem('visitDuringSession');

  const updateNumberOfTotalVisitors = () => {
    const totalVisitorsRef = 'Visitors/Total/All';
    const updateNumber = updateNumberRealtimeDB(totalVisitorsRef);

    sessionStorage.setItem('visitDuringSession', 'yes');

    return updateNumber;
  };

  process.env.NODE_ENV === 'production' &&
    !visited &&
    updateNumberOfTotalVisitors();
  // updateNumberOfTotalVisitors();
};

export const getTotalVisitors = (
  setTotalVisitors: Dispatch<SetStateAction<number | 'Loading'>>
) => {
  const dbRef = ref(realtimeDB, 'Visitors/Total/All');
  onValue(dbRef, (snapshot) => {
    const data = snapshot.val();
    setTotalVisitors(Number(data));
  });
};
