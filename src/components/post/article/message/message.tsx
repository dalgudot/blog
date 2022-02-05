import { useRouter } from 'next/router';
import { FC } from 'react';
import styles from './message.module.scss';

type Props = {};

const Message: FC<Props> = () => {
  const router = useRouter();
  const query = router.query;
  const field = query.category === 'design' ? '디자인' : '개발';

  return (
    <div className={styles.message}>
      <span />
      <p>{field} 경험을 공유합니다.</p>
    </div>
  );
};

export default Message;
