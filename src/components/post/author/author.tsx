import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import IconNewTap24 from '../../../svg/icon-new-tap-24';
import IconYoonSeulLogo24 from '../../../svg/icon-yoonseul-logo-24';
import styles from './author.module.scss';

const Author: FC = () => {
  const description: string =
    "순간의 감정과 생각을 기록하는 일기장 '윤슬'을 디자인하고 개발하고 있습니다.";

  return (
    <>
      <section className={styles.author__section}>
        <h2>글쓴이</h2>
        <Link href='/contact'>
          <a className={styles.author__img}>
            <Image
              src='/common/profile-photo.jpg'
              alt='김경환의 프로필 사진'
              layout='fill'
            />
            <div>
              <h4>김경환 · 프로덕트 디자이너</h4>
              <p>{description}</p>
            </div>
          </a>
        </Link>

        <a
          className={styles.yoonseul__link}
          href='https://apps.apple.com/kr/app/%EC%9C%A4%EC%8A%AC/id1618657913'
          target='_blank'
          rel='noreferrer'
        >
          <div className={styles.left}>
            <div className={styles.logo}>
              <IconYoonSeulLogo24 />
            </div>
            <p>윤슬 iOS 앱</p>
          </div>
          <IconNewTap24 color='var(--g1)' />
        </a>
      </section>
    </>
  );
};

export default Author;
