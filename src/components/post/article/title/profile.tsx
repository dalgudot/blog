import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import styles from './title-wysiwyg.module.scss';

type Props = {};

const Profile: FC<Props> = () => {
  const router = useRouter();
  const query = router.query;
  const career =
    query.category === 'design' ? '프로덕트 디자이너' : '프론트엔드 개발자';

  return (
    <a
      href='https://share-design.kr/contact'
      target='_blank'
      rel='noreferrer'
      className={styles.profile__a}
    >
      <Image
        src='/common/profile-photo.jpg'
        alt='김경환의 프로필 사진'
        width={36}
        height={36}
        priority
        className={styles.profile__image}
      />
      <p>김경환</p>
      <span className={styles.circle__divider} />
      <p>{career}</p>
    </a>
  );
};

export default Profile;
