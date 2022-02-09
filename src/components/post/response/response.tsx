import { FC } from 'react';
import ResponseList from './response-list/response-list';
import styles from './response.module.scss';
import WriteResponse from './write-response/write-response';

const Response: FC = () => {
  return (
    <>
      <section className={styles.response__section}>
        <h2>댓글</h2>
        <ResponseList />
        <WriteResponse />
      </section>
    </>
  );
};

export default Response;
