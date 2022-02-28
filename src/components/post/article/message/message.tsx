import { useRouter } from 'next/router';
import { FC } from 'react';
import styles from './message.module.scss';

const Message: FC = () => {
  const router = useRouter();
  const query = router.query;
  const field = query.category === 'dev' ? '개발' : '디자인';

  return (
    <section className={styles.message}>
      <span />
      <p>{query.category !== 'story' && field} 경험을 공유합니다.</p>
    </section>
  );
};

export default Message;
