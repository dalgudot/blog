import { useToast } from '@dalgu/react-toast';
import { FC } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import styles from './contact.module.scss';

const Email: FC = () => {
  const { showToast } = useToast();

  return (
    <section className={styles.email__section}>
      <CopyToClipboard
        text='dalgudot@gmail.com'
        onCopy={() => showToast('메일 주소를 복사했습니다 📮')}
      >
        <button type='button' className={styles.email__button}>
          dalgudot@gmail.com
        </button>
      </CopyToClipboard>

      <div className={styles.button__area}>
        <CopyToClipboard
          text='dalgudot@gmail.com'
          onCopy={() => showToast('메일 주소를 복사했습니다 📮')}
        >
          <button type='button'>메일 복사</button>
        </CopyToClipboard>
        <a href='mailto:dalgudot@gmail.com' target='_blank' rel='noreferrer'>
          메일 보내기
        </a>
      </div>
    </section>
  );
};

export default Email;
