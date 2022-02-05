import { FC, useEffect } from 'react';
import { checkPublishedDate } from '../../../../lib/utils/get-date';
import { TStatus } from '../../../../redux-toolkit/model/post-data-model';
import { setArticleTitleData } from '../../../../redux-toolkit/slices/post-slice';
import {
  setTempArticleDateTimeData,
  setTempArticleTitleData,
} from '../../../../redux-toolkit/slices/temp-post-slice';
import { useAppDispatch } from '../../../../redux-toolkit/store';
import EditableTextBlock from '../../../block-wysiwyg/editable-element/text/editable-text-block';
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
  const { seoDate, displayDate } = checkPublishedDate(status, dateTime);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setTempArticleDateTimeData({ seoDate }));
  }, []);

  const setTempPostHtmlData = (inputHtml: string) => {
    dispatch(setTempArticleTitleData({ inputHtml }));
  };

  const setPostHtmlData = (inputHtml: string) => {
    dispatch(setArticleTitleData({ inputHtml }));
  };

  return (
    <>
      <section className={styles.article__title__section}>
        <time dateTime={seoDate}>{displayDate}</time>
        <EditableTextBlock
          blockType='Heading1'
          contentEditable={contentEditable}
          html={title}
          setTempPostHtmlData={setTempPostHtmlData}
          setPostHtmlData={setPostHtmlData}
          placeholder='글의 제목을 입력해주세요'
        />
        <Profile />
      </section>
    </>
  );
};

export default TitleWYSIWYG;
