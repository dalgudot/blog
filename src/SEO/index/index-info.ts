import { NextRouter } from 'next/router';

export const indexInfo = (router: NextRouter) => {
  const info = {
    title:
      router.pathname === '/ux-collection'
        ? 'UX 수집 | 경험의 기록'
        : router.pathname === '/story'
        ? '이야기 | 경험의 기록'
        : router.pathname === '/contact'
        ? '연락처 | 경험의 기록'
        : '경험의 기록',

    url:
      router.pathname === '/ux-collection'
        ? 'https://blog.dalgu.app/ux-collection'
        : router.pathname === '/story'
        ? 'https://blog.dalgu.app/story'
        : router.pathname === '/contact'
        ? 'https://blog.dalgu.app/contact'
        : 'https://blog.dalgu.app/',

    type: 'website',

    thumbnail:
      router.pathname === '/ux-collection'
        ? '/images/ux-collection-thumbnail.jpg'
        : '/images/default-thumbnail.jpg',

    description:
      router.pathname === '/ux-collection'
        ? '사용자 경험(UX)을 수집하고 공유합니다.'
        : '디자인과 개발 경험을 기록하고 공유합니다.',
  };

  return info;
};
