import classNames from 'classnames';
import { FC } from 'react';
import IconNewTap24 from '../../../svg/icon-new-tap-24';
import IconYoonSeulLogo24 from '../../../svg/icon-yoonseul-logo-24';
import styles from './author.module.scss';

const Author: FC = () => {
  const downloadLinkText: string =
    '지금을 기록하는 일기장, 윤슬을 디자인하고 개발합니다.';

  return (
    <>
      <section>
        <a
          className={classNames(styles.link)}
          href='https://apps.apple.com/kr/app/%EC%9C%A4%EC%8A%AC/id1618657913'
          target='_blank'
          rel='noreferrer'
        >
          <div className={styles.left}>
            <div className={styles.logo}>
              <IconYoonSeulLogo24 />
            </div>
            <p>{downloadLinkText}</p>
          </div>
          <IconNewTap24 color='var(--g1)' />
        </a>
      </section>
    </>
  );
};

export default Author;
