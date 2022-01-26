import { useMounted } from '@dalgu/react-utility-hooks';
import { FC, memo } from 'react';
import styles from './article-paragraph-block-wysiwyg.module.scss';

type Props = {
  contentEditable: boolean;
};

const ArticleParagraphBlockWYSIWYG: FC<Props> = ({ contentEditable }) => {
  const mounted = useMounted(); // for SSR

  return (
    <>
      <section className={styles.article__paragraph__section}>
        <h2>본문 영역</h2>
        <ul>{mounted && <></>}</ul>
      </section>
    </>
  );
};

export default ArticleParagraphBlockWYSIWYG;
