import { FC, useEffect, useState } from 'react';
import {
  getTodayVisitors,
  getTotalVisitors,
} from '../../service/firebase/realtime-db';
import styles from './footer.module.scss';

const LeftSide: FC = () => {
  const [todayVisitors, setTodayVisitors] = useState<number | 'Loading'>(
    'Loading'
  );
  const [totalVisitors, setTotalVisitors] = useState<number | 'Loading'>(
    'Loading'
  );
  useEffect(() => {
    const unSubscribeOnValueTodayVisitors = getTodayVisitors(setTodayVisitors);
    const unSubscribeOnValueTotalVisitors = getTotalVisitors(setTotalVisitors);

    return () => {
      unSubscribeOnValueTodayVisitors();
      unSubscribeOnValueTotalVisitors();
    };
  }, []);

  return (
    <div className={styles.left__side}>
      {totalVisitors === 'Loading' ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>TODAY {todayVisitors}</p>
          <p className={styles.total}>TOTAL {totalVisitors}</p>
        </>
      )}
    </div>
  );
};

export default LeftSide;
