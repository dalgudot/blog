import { NextPage } from 'next';
import { useUpdateVisitors } from '../lib/hooks/useUpdateVisitors';
import s from '../views/screens/ux-collection/list.module.scss';

type UxCollectionDataT = {
  dateTime: string;
  text: string;
  imagePath: string;
}[];

// 일단 만들고, 성능 이슈 생기면 추가!
const UXCollection: NextPage = () => {
  useUpdateVisitors();

  function getDisplayDateTime(dateTime: string): string {
    const displayDateTime = dateTime.replace(/-/g, '.');
    return displayDateTime;
  }

  return (
    <main className={s.main}>
      <ul>
        {uxCollectionData.map((data) => (
          <li key={data.text} className={s.li}>
            <time dateTime={data.dateTime}>
              {getDisplayDateTime(data.dateTime)}
            </time>
            <p>{data.text}</p>
            <img src={data.imagePath} alt={data.text} />
          </li>
        ))}
      </ul>
    </main>
  );
};

export default UXCollection;

// 방법 1) 무한 스크롤
// https://stackoverflow.com/questions/67624601/how-to-implement-infinite-scroll-in-next-js
// 방법 2) 10~20개 정도만 먼저 가져온 뒤 나머지는 비동기로 가져오기? > 20개짜리 새로운 배열 만들고, useEffect에서 비동기로 뒤에 데이터 받아옴.

const uxCollectionData: UxCollectionDataT = [
  {
    dateTime: '2022-08-30',
    text: `쿠팡에서 주문한 올인원 로션. '리필 용기 디자인'에 대한 후기가 눈에 띄었다. 리필 용기 겉모습이 젤리 음료수가 들어있을 것 같아서 아이들에게 먹는 게 아니라고 알려주었다는 내용이었는데, 확실히 아이들을 키우고 있는 집에서는 사고를 유발할지도 모르는 디자인일 수도 있겠다 싶었다. 난 '리필'이라는 본연의 기능을 볼 때 편리함을 주는 좋은 디자인이라 생각했는데, 사용자에 따라 그 관점이 달라진다는 게 흥미로웠다. 편리함에서 한 발 더 나아간 디자인은 어떤 디자인인지 고민하는 계기가 됐다.`,
    imagePath: '/ux-collection/1.jpg',
  },
];
