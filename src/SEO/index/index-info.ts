import { NextRouter } from 'next/router';

export const indexInfo = (router: NextRouter) => {
  const info = {
    title:
      router.pathname === '/story'
        ? '이야기 | 경험의 기록'
        : router.pathname === '/contact'
        ? '연락처 | 경험의 기록'
        : '경험의 기록',

    url:
      router.pathname === '/story'
        ? 'https://blog.dalgu.app/story'
        : router.pathname === '/contact'
        ? 'https://blog.dalgu.app/contact'
        : 'https://blog.dalgu.app/',

    type: 'website',

    thumbnail: '/images/default-thumbnail.jpg',

    description: '디지털 프로덕트 디자인과 개발 경험을 기록하고 공유합니다.',
  };

  return info;
};
