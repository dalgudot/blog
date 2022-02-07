import Image from 'next/image';
import { FC } from 'react';
import styles from './contact.module.scss';

const Profile: FC = () => {
  return (
    <section className={styles.profile__section}>
      {/* https://dev.to/felixhaeberle/responsive-fix-for-the-next-js-image-component-1351 */}
      <Image
        src='/common/profile-photo.jpg'
        alt='김경환의 프로필 사진'
        layout='fill'
        priority
      />
      <h1>김경환</h1>
      <div className={styles.right__div}>
        <p>프로덕트 디자이너</p>
        <span />
        <p>프론트엔드 개발자</p>
      </div>
    </section>
  );
};

export default Profile;
