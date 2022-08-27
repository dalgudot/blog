import { NextPage } from 'next';
import { useUpdateVisitors } from '../lib/hooks/useUpdateVisitors';
import styles from '../components/navigation/post/post-list.module.scss';

type Props = {
  uxCollectionData: {
    dateTime: string;
    text: string;
    imagePath: string;
  }[];
};

// 일단 만들고, 성능 이슈 생기면 추가!
const UXCollection: NextPage<Props> = ({ uxCollectionData }) => {
  useUpdateVisitors();

  return (
    <main className={styles.post__list__main__layout}>
      <ul>
        {uxCollectionData.map((data) => (
          <p key={data.text}>{data.text}</p>
        ))}
      </ul>
    </main>
  );
};

export default UXCollection;

// 방법 1) 무한 스크롤
// https://stackoverflow.com/questions/67624601/how-to-implement-infinite-scroll-in-next-js
export const getStaticProps = async () => {
  // 방법 2) 10~20개 정도만 먼저 가져온 뒤 나머지는 비동기로 가져오기? > 20개짜리 새로운 배열 만들고, useEffect에서 비동기로 뒤에 데이터 받아옴.
  return {
    props: {
      uxCollectionData,
    },
  };
};

const uxCollectionData = [
  {
    dateTime: '2022-08-26',
    text: '모션 디자인은 UX에 어떤 영향을 미칠까?',
    imagePath: '규칙 필요',
  },
];
