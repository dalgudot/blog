import DOMPurify from 'dompurify';
import { ChangeEvent, FC, useRef } from 'react';
import EditableElement from '../../../block-wysiwyg/editable-element';
import styles from './article-title-block-wysiwyg.module.scss';
import Profile from './profile';

type Props = {
  contentEditable: boolean;
};

const ArticleTitleBlockWYSIWYG: FC<Props> = ({ contentEditable }) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const dateTime: string = '2022-01-26';
  const koreanDate: string = dateTime.replaceAll('-', '.');

  // 한국 날짜 표현
  // 미국 날짜 표현: Nov 7, 2020

  const TagName = 'h1';
  const html = '제목입니다';
  const placeholder = '글의 제목을 입력해주세요';

  const onInput = (
    e: ChangeEvent<HTMLHeadingElement | HTMLParagraphElement>
  ) => {};

  const syncPasteText = (newInnerPurePasteText: string) => {};

  return (
    <>
      <section className={styles.article__title__section}>
        <time dateTime={dateTime}>
          <p>{koreanDate}</p>
        </time>
        <EditableElement
          TagName={TagName}
          contentEditable={contentEditable}
          html={html}
          onInput={onInput} // 필수
          syncPasteText={syncPasteText}
          placeholder={placeholder}
        />
        <Profile />
      </section>
    </>
  );
};

export default ArticleTitleBlockWYSIWYG;
