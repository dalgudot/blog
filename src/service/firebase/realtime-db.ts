import { ref, set, onValue, push } from 'firebase/database';
import { Dispatch, SetStateAction } from 'react';
import { objectToArray } from '../../lib/utils/data';
import { realtimeDB } from './config';

export type TResponseData = {
  profileGradient: string;
  date: string;
  responseText: string;
};

export const postResponseRealtimeDB = async (
  asPath: string,
  responseData: TResponseData
) => {
  const dbRef = ref(realtimeDB, `Response/Post${asPath}`);
  const dbRefWithKey = push(dbRef); // 시간순 id 생성
  await set(dbRefWithKey, responseData) //
    .catch((error) => {
      throw new Error(error);
    });
};

export const getResponseDataFromRealtimeDB = (
  asPath: string,
  setResponseList: Dispatch<SetStateAction<TResponseData[]>>
) => {
  const dbRef = ref(realtimeDB, `Response/Post${asPath}`);

  onValue(dbRef, (snapshot) => {
    const data = snapshot.val();
    const dataArray = objectToArray(data);
    setResponseList(dataArray);
  });
  // 새로운 댓글 생성할 때마다 실시간 업데이트
};

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
