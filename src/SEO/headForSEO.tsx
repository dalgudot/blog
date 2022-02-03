import Head from 'next/head';
import { FC } from 'react';

export type TInfoForSEO = {
  info: {
    title: string;
    url: string;
    type: string;
    thumbnail: string;
    description: string;
  };
};

const HeadForSEO: FC<TInfoForSEO> = ({ info }) => {
  // Common
  const icoImage = 'record.ico';
  const author = '김경환';
  const keywords =
    '김경환, 디자이너, 프로덕트 디자이너, designer, product designer, 디자인, 프로덕트 디자인, 디지털 프로덕트 디자인, design, product design, digital product design, UI, UX, 디자인, UI/UX, UX/UI, UI/UX 디자인, UX/UI 디자인, 블로그, 디자인 블로그, 기술 블로그, 브런치, 디자인 아티클, blog, brunch, Typescript, React, NextJS, HTML, CSS, Javascript';

  return (
    <Head>
      {/* 모바일 대응 meta tag, viewport-fit=cover는 아이폰 Safe-Area 대응 가능*/}
      {/* <meta
        name='viewport'
        content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
      /> */}
      {/* 기본 내장 */}
      {/* <meta charSet='utf-8' /> */}

      <title>{info.title}</title>
      <meta name='author' content={author} />
      <meta name='description' content={info.description} />
      <meta name='keywords' content={keywords} />

      <meta property='og:url' content={info.url} />
      <meta property='og:title' content={info.title} />
      <meta property='og:description' content={info.description} />
      <meta property='og:image' content={info.thumbnail} />
      {/* 페이스북 권장 사이즈 1200 : 630 = 1.9 : 1(약) */}
      <meta property='og:image:width' content='1200' />
      <meta property='og:image:height' content='630' />
      <meta property='og:type' content={info.type} />
      {/* locale은 ko_KR라는 형식 맞춰야 함*/}
      <meta property='og:locale' content='ko_KR' />
      {/* <meta property="og:locale:alternate" content="en_US" /> */}

      <meta name='twitter:card' content='summary' />
      <meta name='twitter:url' content={info.url} />
      <meta name='twitter:title' content={info.title} />
      <meta name='twitter:description' content={info.description} />
      <meta name='twitter:image' content={info.thumbnail} />

      <link rel='icon' href={icoImage} />
    </Head>
  );
};

export default HeadForSEO;
