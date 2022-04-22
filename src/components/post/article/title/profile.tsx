import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import styles from './title-wysiwyg.module.scss';

const Profile: FC = () => {
  const router = useRouter();
  const query = router.query;
  const career = '프로덕트 디자이너';

  return (
    <Link href='/contact'>
      <a className={styles.profile__a}>
        <Image
          src='/common/profile-photo.jpg'
          alt='프로덕트 디자이너 김경환의 프로필 사진'
          layout='fill'
          priority
        />
        <p>김경환</p>
        {query.category !== 'story' && (
          <>
            <span className={styles.circle__divider} />
            <p>{career}</p>
          </>
        )}
      </a>
    </Link>
  );
};

export default Profile;
