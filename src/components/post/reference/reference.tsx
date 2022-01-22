import { FC } from 'react';
import ReferenceBlockWYSIWYG from './reference-block-wysiwyg';
import styles from './reference.module.scss';

type Props = {
  contentEditable: boolean;
};

const Reference: FC<Props> = ({ contentEditable }) => {
  return (
    <>
      <section className={styles.reference__section}>
        {/* '참고 자료' 텍스트는 고정값 */}
        <h2>참고 자료</h2>
        <ReferenceBlockWYSIWYG contentEditable={contentEditable} />
      </section>
    </>
  );
};

export default Reference;
