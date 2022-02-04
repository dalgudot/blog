import { FC, useEffect, useState } from 'react';
import { getTotalVisitors } from '../../service/firebase/realtime-db';
import styles from './footer.module.scss';

const LeftSide: FC = () => {
  const [totalVisitors, setTotalVisitors] = useState<number | 'Loading'>(
    'Loading'
  );
  useEffect(() => {
    getTotalVisitors(setTotalVisitors); // 데이터 보여주기 위한

    return () => {
      setTotalVisitors('Loading');
    };
  }, []);

  return (
    <>
      <p className={styles.left__side}>
        {totalVisitors === 'Loading' ? (
          <>Loading...</>
        ) : (
          <>Total Visitors {totalVisitors}</>
        )}
      </p>
    </>
  );
};

export default LeftSide;
