import Link from 'next/link';
import { FC } from 'react';
import styles from './footer.module.scss';

const RightSide: FC = () => {
  const socialList = [
    { label: 'GitHub', href: 'https://github.com/dalgudot' },
    { label: 'Brunch', href: 'https://brunch.co.kr/@dalgudot' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/dalgudot' },
    // { label: 'Instagram', href: 'https://www.instagram.com/dalgu_dot/' },
    // { label: 'Facebook', href: 'https://www.facebook.com/dalgudot' },
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
      <Link href='/contact'>
        <a className={styles.right__side__copyright}>
          ⓒ KyungHwan Kim. All rights reserved
        </a>
      </Link>
    </div>
  );
};

export default RightSide;
