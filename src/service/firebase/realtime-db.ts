import { ref, set, onValue, push, Unsubscribe } from 'firebase/database';
import { Dispatch, SetStateAction } from 'react';
import { objectToArray } from '../../lib/utils/data';
import { getDate } from '../../lib/utils/get-date';
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

  const unSubscribeOnValueRealtimeDB: Unsubscribe = onValue(
    dbRef,
    (snapshot) => {
      const data = snapshot.val();
      const dataArray = data && objectToArray(data);
      data && setResponseList(dataArray);
    }
  );
  // 새로운 댓글 생성할 때마다 실시간 업데이트

  return unSubscribeOnValueRealtimeDB;
};

/**
 *
 * updateNumberRealtimeDB()
 * 통계 재사용 함수
 *
 */
export const updateNumberRealtimeDB = (path: string) => {
  const dbRef = ref(realtimeDB, path);

  const unSubscribeOnValueRealtimeDB: Unsubscribe = onValue(
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

  return unSubscribeOnValueRealtimeDB;
};

const { year, month, date } = getDate();
const totalVisitorsRef = 'Visitors/Total/All';
const visitorsByYear = `Visitors/Total/All on ${year}`;
const visitorsByMonth = `Visitors/${year}/${month}/All`;
const visitorsByDay = `Visitors/${year}/${month}/${date}`;

export const updateTotalVisitors = () => {
  const visited = sessionStorage.getItem('visitDuringSession');

  if (process.env.NODE_ENV === 'production' && !visited) {
    const unSubscribeOnValueTotalVisitors: Unsubscribe =
      updateNumberRealtimeDB(totalVisitorsRef);

    const unSubscribeOnValueVisitorsByYear: Unsubscribe =
      updateNumberRealtimeDB(visitorsByYear);

    const unSubscribeOnValueVisitorsByMonth: Unsubscribe =
      updateNumberRealtimeDB(visitorsByMonth);

    const unSubscribeOnValueVisitorsByDay: Unsubscribe =
      updateNumberRealtimeDB(visitorsByDay);

    sessionStorage.setItem('visitDuringSession', 'yes');

    const unSubscribeOnValueRealtimeDB = () => {
      unSubscribeOnValueTotalVisitors();
      unSubscribeOnValueVisitorsByYear();
      unSubscribeOnValueVisitorsByMonth();
      unSubscribeOnValueVisitorsByDay();
    };

    return unSubscribeOnValueRealtimeDB;
  }
};

export const getTodayVisitors = (
  setTodayVisitors: Dispatch<SetStateAction<number | 'Loading'>>
) => {
  const dbRef = ref(realtimeDB, visitorsByDay);

  const unSubscribeOnValueRealtimeDB = onValue(dbRef, (snapshot) => {
    const data = snapshot.val();
    setTodayVisitors(Number(data));
  });

  return unSubscribeOnValueRealtimeDB;
};

export const getTotalVisitors = (
  setTotalVisitors: Dispatch<SetStateAction<number | 'Loading'>>
) => {
  const dbRef = ref(realtimeDB, totalVisitorsRef);

  const unSubscribeOnValueRealtimeDB = onValue(dbRef, (snapshot) => {
    const data = snapshot.val();
    setTotalVisitors(Number(data));
  });

  return unSubscribeOnValueRealtimeDB;
};
