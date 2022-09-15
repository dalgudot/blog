import { NextPage } from 'next';
import Image from 'next/image';
import Author, { AuthorAppLink } from '../components/post/author/author';
import Subscription from '../components/post/subscription/subscription';
import { useUpdateVisitors } from '../lib/hooks/useUpdateVisitors';
import IconPlantFamilyLogo24 from '../svg/icon-plant-family-logo-24';
import IconTodayToDoLogo24 from '../svg/icon-today-todo-logo-24';
import IconYoonSeulLogo24 from '../svg/icon-yoonseul-logo-24';
import s from '../views/screens/ux-collection/list.module.scss';

type UxCollectionDataT = {
  dateTime: string;
  text: string;
  imagePath: string;
  appLink?: '윤슬' | '오늘 할 일' | '식물 가족';
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
        {uxCollectionData.map((data, idx) => (
          <>
            <li key={`${data.dateTime}-${data.text}`} className={s.li}>
              <time dateTime={data.dateTime}>
                {getDisplayDateTime(data.dateTime)}
              </time>
              <p className={s.text}>{data.text}</p>
              {data.appLink && getAppLink(data.appLink)}
              <Image
                src={data.imagePath}
                alt={data.text}
                layout='fill'
                priority
              />
            </li>

            {idx === 3 && (
              <>
                <Subscription />
                <Author />
              </>
            )}
          </>
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
    dateTime: '2022-09-15',
    text: "디즈니 플러스를 구독하게 되면서 가장 흥미로웠던 건 '구독'을 해야 디즈니 플러스 앱을 쓸 수 있다는 점이었다. 넷플릭스도 마찬가지라 어찌보면 당연하긴 하지만, 그래도 '결제'를 해야만 서비스를 이용할 수 있도록 결정할 수 있었던 건 탄탄한 '브랜드'와 훌륭한 '콘텐츠'에 대한 확신이 있었기 때문일 것이다. 회원가입을 넘어 결제까지 해야 하는 디즈니 플러스의 구독 전환율은 얼마나 될까? 무척 궁금하다.",
    imagePath: '/ux-collection/4.jpg',
  },
  {
    dateTime: '2022-09-15',
    text: "프로덕트를 만들 때 흔히 하는 착각이 '스스로가 사용자라고 생각하는 것'이다. 이런 착각을 하게 되는 이유는 본인의 경험과 취향을 바탕으로 한 생각이 스스로에게 '아주' 강한 설득력을 갖고 있기 때문이 아닐까 생각한다. 내가 운영하고 있는 '윤슬' iOS 앱을 만들 때도 내가 사용자라 착각하고 넓은 여백이 좋다고 생각해 기록 목록을 디자인했었다. 그런데 2명의 사용자에게 여백을 좁혀달라는 피드백을 받았다. 그렇다. 나는 사용자가 아니다.",
    imagePath: '/ux-collection/3.jpg',
    appLink: '윤슬',
  },
  {
    dateTime: '2022-09-12',
    text: "오늘 아침 애플 뮤직 앱에서 음악을 재생하다가 아래 화면에서 '재생' 버튼과 '임의 재생' 버튼 사이의 간격이 꽤 넓다는 걸 발견했다. 난 수평으로 나란히 나열된 2개의 버튼을 디자인할 때 버튼 크기가 충분히 크다면 버튼 사이 간격을 보통 8~12px(pt, dp) 사이로 정했었다. 아래 디자인에서 각 버튼의 크기가 충분히 크더라도 두 버튼 사이 간격이 20px(pt, dp)인 게 상당히 흥미롭다. 시각적인 구별을 더 명확히 하고 터치를 더 정확하게 하도록 하기 위한 의도가 담긴 디자인이 아닐까?",
    imagePath: '/ux-collection/2.jpg',
  },
  {
    dateTime: '2022-08-25',
    text: "쿠팡에서 주문한 올인원 로션. '리필 용기 디자인'에 대한 후기가 눈에 띄었다. 리필 용기 겉모습이 젤리 음료수가 들어있을 것 같아서 아이들에게 먹는 게 아니라고 알려주었다는 내용이었는데, 확실히 아이들을 키우고 있는 집에서는 사고를 유발할지도 모르는 디자인일 수도 있겠다 싶었다. 난 '리필'이라는 본연의 기능을 볼 때 편리함을 주는 좋은 디자인이라 생각했는데, 사용자에 따라 그 관점이 달라진다는 게 흥미로웠다. 편리함에서 한 발 더 나아간 디자인은 어떤 디자인인지 고민하는 계기가 됐다.",
    imagePath: '/ux-collection/1.jpg',
  },
];

function getAppLink(appLink: '윤슬' | '오늘 할 일' | '식물 가족'): JSX.Element {
  switch (appLink) {
    case '윤슬':
      return (
        <AuthorAppLink
          link='https://apps.apple.com/kr/app/%EC%9C%A4%EC%8A%AC/id1618657913'
          icon={<IconYoonSeulLogo24 />}
          name='윤슬 iOS 앱'
        />
      );
    case '오늘 할 일':
      return (
        <AuthorAppLink
          link='https://apps.apple.com/kr/app/%EC%98%A4%EB%8A%98-%ED%95%A0-%EC%9D%BC-%EC%A2%8B%EC%9D%80-%EC%8A%B5%EA%B4%80-%EB%A7%8C%EB%93%A4%EA%B8%B0/id1622514232'
          icon={<IconTodayToDoLogo24 />}
          name='오늘 할 일 iOS 앱'
        />
      );
    case '식물 가족':
      return (
        <AuthorAppLink
          link='https://apps.apple.com/kr/app/plant-family-water-reminder/id1633937579'
          icon={<IconPlantFamilyLogo24 />}
          name='식물 가족 iOS 앱'
        />
      );
  }
}
