import Image from 'next/image';
import { FC } from 'react';
import styles from './author.module.scss';

const Author: FC = () => {
  return (
    <>
      <section className={styles.author__section}>
        <h2>글쓴이</h2>
        <div className={styles.author__contents}>
          <Image
            src='/common/profile-photo.jpg'
            alt='김경환의 프로필 사진'
            layout='fill'
            priority
          />
          <div className={styles.right__div}>
            <p>프로덕트 디자이너</p>
            <span />
            <p>프론트엔드 개발자</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Author;
