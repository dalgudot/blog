import { FC } from 'react';
import styles from './response.module.scss';

const Response: FC = () => {
  console.log(styles.response);

  const height = false ? 100 : 500;

  return (
    <>
      <section className={styles.response}>
        <h1>Response</h1>
      </section>

      <style jsx>{`
        section {
          height: ${height}px;
        }

        h1 {
          color: blue;
        }
      `}</style>
    </>
  );
};

export default Response;
