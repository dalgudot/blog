import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import IconNewTap24 from '../../../svg/icon-new-tap-24';
import IconPlantFamilyLogo24 from '../../../svg/icon-plant-family-logo-24';
import IconTodayToDoLogo24 from '../../../svg/icon-today-todo-logo-24';
import IconYoonSeulLogo24 from '../../../svg/icon-yoonseul-logo-24';
import styles from './author.module.scss';

const Author: FC = () => {
  const description: string =
    "많은 기능과 서비스를 갖추고 있는 슈퍼 앱들 사이에서 단순함을 가장 큰 목표로 하는 '작은 앱'이 사람들에게 어떠한 의미로 다가갈지 연구하는 '작은 앱 프로젝트'를 진행하고 있습니다. 현재 운영 중인 앱은 다음과 같습니다.";

  // const router = useRouter();
  // const query = router.query;
  // const career =
  //   query.category === 'design' ? '프로덕트 디자이너' : '프론트엔드 개발자';

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

        <AuthorAppLink
          link='https://apps.apple.com/kr/app/%EC%9C%A4%EC%8A%AC/id1618657913'
          icon={<IconYoonSeulLogo24 />}
          name='윤슬 iOS 앱'
        />

        <AuthorAppLink
          link='https://apps.apple.com/kr/app/%EC%98%A4%EB%8A%98-%ED%95%A0-%EC%9D%BC-%EC%A2%8B%EC%9D%80-%EC%8A%B5%EA%B4%80-%EB%A7%8C%EB%93%A4%EA%B8%B0/id1622514232'
          icon={<IconTodayToDoLogo24 />}
          name='오늘 할 일 iOS 앱'
        />

        <AuthorAppLink
          link='https://apps.apple.com/kr/app/plant-family-water-reminder/id1633937579'
          icon={<IconPlantFamilyLogo24 />}
          name='식물 가족 iOS 앱'
        />
      </section>
    </>
  );
};

export default Author;

type Props = {
  link: string;
  icon: JSX.Element;
  name: string;
};

export const AuthorAppLink: FC<Props> = ({ link, icon, name }) => {
  return (
    <a
      className={styles.yoonseul__link}
      href={link}
      target='_blank'
      rel='noreferrer'
    >
      <div className={styles.left}>
        <div className={styles.logo}>{icon}</div>
        <p>{name}</p>
      </div>
      <IconNewTap24 color='var(--g1)' />
    </a>
  );
};
