import { FC, useEffect } from 'react';
import { getDate } from '../../../../lib/utils/get-date';
import { TStatus } from '../../../../redux-toolkit/model/post-data-model';
import { setArticleTitleData } from '../../../../redux-toolkit/slices/post-slice';
import {
  setTempArticleDateTimeData,
  setTempArticleTitleData,
} from '../../../../redux-toolkit/slices/temp-post-slice';
import { useAppDispatch } from '../../../../redux-toolkit/store';
import EditableText from '../../../block-wysiwyg/editable-element/text/editable-text-block';
import styles from './title-wysiwyg.module.scss';
import Profile from './profile';

type Props = {
  contentEditable: boolean;
  title: string;
  dateTime: string;
  status: TStatus;
};

const TitleWYSIWYG: FC<Props> = ({
  contentEditable,
  title,
  dateTime,
  status,
}) => {
  // status에 따라 날짜를 갱신할지 하지 않을지 결정
  // published 상태일 때는 갱신하지 않음
  const { dateForSEO, dateForDisplay } = getDate();
  const isStatusPublished = status === 'published';
  const displayDateTime = dateTime.replaceAll('-', '.');
  const seoDate: string = isStatusPublished ? dateTime : dateForSEO;
  const displayDate: string = isStatusPublished
    ? displayDateTime
    : dateForDisplay;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setTempArticleDateTimeData({ seoDate }));
  }, []);

  return (
    <>
      <section className={styles.article__title__section}>
        <time dateTime={seoDate}>
          <p>{displayDate}</p>
        </time>
        <EditableText
          blockType='Heading1'
          contentEditable={contentEditable}
          html={title}
          setTempPostData={setTempArticleTitleData}
          setPostData={setArticleTitleData}
          placeholder='글의 제목을 입력해주세요'
        />
        <Profile />
      </section>
    </>
  );
};

export default TitleWYSIWYG;
