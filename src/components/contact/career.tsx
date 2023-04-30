import { FC } from 'react';
import styles from './contact.module.scss';

const Career: FC = () => {
  return (
    <section className={styles.career__section}>
      <ul>
        {careerData.map((data) => (
          <li key={data.label}>
            <h3>{data.label}</h3>
            {data.contents.map((content) => (
              <div key={content.text}>
                <time>{content.term}</time>
                <p>{content.text}</p>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Career;

const careerData = [
  {
    label: '인생 목표',
    contents: [
      {
        term: '',
        text: '좋은 영감이 되는 사람으로 나이 들어가기',
      },
    ],
  },
  {
    label: '경력',
    contents: [
      {
        term: '2019.04.23 ~ 현재',
        text: '프로덕트 디자이너',
      },
      {
        term: '2017.05.26 ~ 현재',
        text: '예술가',
      },
      {
        term: '2015.10.01 ~ 2018.09.28',
        text: '과학 기자',
      },
    ],
  },
  {
    label: '개인 프로젝트',
    contents: [
      {
        term: '2022.03.16 ~ 현재',
        text: "많은 기능과 서비스를 갖추고 있는 슈퍼 앱들 사이에서 단순함을 가장 큰 목표로 하는 '작은 앱'이 사람들에게 어떠한 의미로 다가갈지 연구하는 '작은 앱 프로젝트'를 진행하고 있습니다.",
      },
      {
        term: '2022.01.01 ~ 현재',
        text: "디자인과 개발 경험을 기록하고 공유하는 '경험의 기록' 블로그를 운영하고 있습니다.",
      },
      {
        term: '2020.09.12 ~ 2021.04.18',
        text: "디자인 경험을 전 세계 사람들과 공유하는 '디자인 공유하기' 프로젝트를 진행했습니다.",
      },
      {
        term: '2019.02.21 ~ 현재',
        text: "브런치에 디자인 경험을 공유하고 있습니다. 브런치북 '디자인 독학하기'를 발간했습니다.",
      },
      {
        term: '2017.05.26 ~ 2018.12.20',
        text: "20대의 감정과 이야기를 사진과 글로 남기는 '20대를 남기다' 프로젝트를 진행했습니다.",
      },
    ],
  },
  {
    label: '전시',
    contents: [
      {
        term: '2018.12.14 ~ 12.20',
        text: "[기획전] 'ART-MAS IN PARIS: 20대를 남기다', Studio Galerie B&B, 프랑스 파리",
      },
      {
        term: '2018.07.16 ~ 07.29',
        text: '[기획전] ‘작가의 부재, 20대를 남기다: 불안’, Villa des Arts, 프랑스 파리',
      },
      {
        term: '2018.06.22 ~ 07.22',
        text: '[개인전] ‘20대를 남기다: 첫 번째, 내려놓기’, 사진문화공간 아지트, 대한민국 서울',
      },
    ],
  },
  {
    label: '강연',
    contents: [
      {
        term: '2019.08.27',
        text: '경험을 연결해 나만의 큰 그림 설계하기',
      },
    ],
  },
];
