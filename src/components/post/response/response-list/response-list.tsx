import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import {
  getResponseDataFromRealtimeDB,
  TResponseData,
} from '../../../../service/firebase/realtime-db';
import styles from './response-list.module.scss';

const ResponseList: FC = () => {
  const [responseList, setResponseList] = useState<TResponseData[]>([]);
  const router = useRouter();
  const asPath = router.asPath;

  useEffect(() => {
    getResponseDataFromRealtimeDB(asPath, setResponseList);
  }, []);

  return (
    <>
      <ul className={styles.ul}>
        {responseList.map((list, idx) => (
          <li key={`${list.responseText}${idx}`}>
            <div className={styles.anonymous__profile__left__div}>
              <span
                style={{
                  background: `linear-gradient(${list.profileGradient})`,
                }}
              />
              <p>{list.date}</p>
            </div>
            <p className={styles.response__text}>{list.responseText}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ResponseList;
