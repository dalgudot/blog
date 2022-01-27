import { FC } from 'react';
import { getDate } from '../../../../lib/utils/get-date';
import EditableText from '../../../block-wysiwyg/editable-element/text/editable-text';
import styles from './article-title-block-wysiwyg.module.scss';
import Profile from './profile';

type Props = {
  contentEditable: boolean;
  title: string;
  dateTime: string;
  publish?: boolean;
};

const ArticleTitleBlockWYSIWYG: FC<Props> = ({
  contentEditable,
  title,
  dateTime,
  publish,
}) => {
  const { year, month, date } = getDate();
  const displayDateTime = dateTime.replaceAll('-', '.');
  const seoDate: string = publish ? dateTime : `${year}-${month}-${date}`;
  const displayDate: string = publish
    ? displayDateTime
    : `${year}.${month}.${date}`;

  const syncPasteText = (newInnerPurePasteText: string) => {};

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
          syncPasteText={syncPasteText}
          placeholder='글의 제목을 입력해주세요'
        />
        <Profile />
      </section>
    </>
  );
};

export default ArticleTitleBlockWYSIWYG;
