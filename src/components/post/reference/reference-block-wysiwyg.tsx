import { FC } from 'react';
import EditableLink from '../block-wysiwyg/editable-element/link/editable-link';
import styles from './reference-block-wysiwyg.module.scss';

type Props = {
  contentEditable: boolean;
  datas: {
    title: string;
    url: string;
  }[];
};

const ReferenceBlockWYSIWYG: FC<Props> = ({ contentEditable, datas }) => {
  // 여기서 상태 관리 - 서버에 저장 // 서버에서 정보 받아옴.
  // 데이터는 2가지: 제목(클라이언트에서 한줄 다 차면 ...으로 표시), 링크

  return (
    <>
      <section className={styles.reference__section}>
        <h2>참고 자료</h2>
        <ul>
          {datas.map((data) => (
            <EditableLink
              key={data.title}
              contentEditable={contentEditable}
              data={data}
            />
          ))}
        </ul>
      </section>
    </>
  );
};

export default ReferenceBlockWYSIWYG;
