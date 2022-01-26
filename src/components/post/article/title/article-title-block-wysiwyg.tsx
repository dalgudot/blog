import { ChangeEvent, FC } from 'react';
import EditableElement from '../../../block-wysiwyg/editable-element';
import EditableText from '../../../block-wysiwyg/editable-element/text/editable-text';
import styles from './article-title-block-wysiwyg.module.scss';
import Profile from './profile';

type Props = {
  contentEditable: boolean;
  title: string;
  dateTime: string;
};

const ArticleTitleBlockWYSIWYG: FC<Props> = ({
  contentEditable,
  title,
  dateTime,
}) => {
  const koreanDate: string = dateTime.replaceAll('-', '.');

  // 한국 날짜 표현
  // 미국 날짜 표현: Nov 7, 2020

  const syncPasteText = (newInnerPurePasteText: string) => {};

  return (
    <>
      <section className={styles.article__title__section}>
        <time dateTime={dateTime}>
          <p>{koreanDate}</p>
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
