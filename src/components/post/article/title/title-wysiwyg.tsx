import { FC, useEffect, useRef } from 'react';
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
import SelectCategory from '../../../menu/select-category';

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
  }, [seoDate]);

  const setTempPostHtmlData = (inputHtml: string) => {
    dispatch(setTempArticleTitleData({ inputHtml }));
  };

  const setPostHtmlData = (inputHtml: string) => {
    dispatch(setArticleTitleData({ inputHtml }));
  };

  const ref = useRef<HTMLHeadingElement>(null);

  return (
    <header className={styles.article__title__header}>
      {contentEditable && <SelectCategory />}
      <time dateTime={seoDate}>{displayDate}</time>
      <EditableTextBlock
        eachBlockRef={ref}
        blockType='Heading1'
        contentEditable={contentEditable}
        html={title}
        setCurrentBlockTempPostHtmlData={setTempPostHtmlData}
        setCurrentBlockPostHtmlData={setPostHtmlData}
        placeholder='글의 제목을 입력해주세요'
      />
      <Profile />
    </header>
  );
};

export default TitleWYSIWYG;
