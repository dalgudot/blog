import { TStatus } from './../../redux-toolkit/model/post-data-model';

export const getDate = () => {
  const today = new Date();
  const year = String(today.getFullYear());
  // 한 자리 숫자일 경우 앞에 0을 붙여줘 순서대로 데이터가 나올 수 있도록
  const month =
    String(today.getMonth() + 1).length === 1
      ? '0' + String(today.getMonth() + 1)
      : String(today.getMonth() + 1);
  const date =
    String(today.getDate()).length === 1
      ? '0' + String(today.getDate())
      : String(today.getDate());

  const dateForSEO: string = `${year}-${month}-${date}`;
  const dateForDisplay: string = `${year}.${month}.${date}`;

  return { today, year, month, date, dateForSEO, dateForDisplay };
};

export const checkPublishedDate = (status: TStatus, dateTime: string) => {
  // status에 따라 날짜를 갱신할지 하지 않을지 결정
  // published 상태일 때는 갱신하지 않음
  const { dateForSEO, dateForDisplay } = getDate();
  const isStatusPublished = status === 'published';
  const displayDateTime = dateTime && dateTime.replaceAll('-', '.');
  const seoDate: string = isStatusPublished ? dateTime : dateForSEO;
  const displayDate: string = isStatusPublished
    ? displayDateTime
    : dateForDisplay;

  return { seoDate, displayDate };
};
