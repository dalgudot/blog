import { FC } from 'react';
import styles from './footer.module.scss';

const RightSide: FC = () => {
  const socialList = [
    { label: 'Brunch', href: 'https://brunch.co.kr/@dalgudot' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/dalgudot' },
    { label: 'Facebook', href: 'https://www.facebook.com/dalgudot' },
    { label: 'GitHub', href: 'https://github.com/dalgudot' },
  ];

  return (
    <div className={styles.right__side}>
      <ul>
        <li>
          {socialList.map((list) => (
            <a
              key={list.label}
              href={list.href}
              target='_blank'
              rel='noreferrer'
            >
              {list.label}
            </a>
          ))}
        </li>
      </ul>
      <a
        href='https://share-design.kr/contact'
        target='_blank'
        rel='noreferrer'
        className={styles.right__side__copyright}
      >
        ⓒ KyungHwan Kim. All rights reserved
      </a>
    </div>
  );
};

export default RightSide;
