import { useMounted } from '@dalgu/react-utility-hooks';
import { FC } from 'react';
import { IRefData } from '../../../service/firebase/firestore';
import EditableLink from '../block-wysiwyg/editable-element/link/editable-link';
import styles from './reference-block-wysiwyg.module.scss';

type Props = {
  contentEditable: boolean;
  refDataArray: IRefData[];
  setRefTitle: (data: string, currentIndex: number) => void;
  setRefUrl: (data: string, currentIndex: number) => void;
};

// <EditableLink />을 활용한 Block WYSIWYG을 만드는 컴포넌트!
const ReferenceBlockWYSIWYG: FC<Props> = ({
  contentEditable,
  refDataArray,
  setRefTitle,
  setRefUrl,
}) => {
  // 데이터는 2가지: 제목(클라이언트에서 한줄 다 차면 ...으로 표시), 링크

  const mounted = useMounted(); // for SSR

  return (
    <>
      <section className={styles.reference__section}>
        <h2>참고 자료</h2>
        <ul>
          {mounted &&
            refDataArray.map((data, idx) => (
              <EditableLink
                key={`${data.title}${idx}`}
                contentEditable={contentEditable}
                datas={refDataArray}
                data={data}
                setRefTitle={setRefTitle}
                setRefUrl={setRefUrl}
              />
            ))}
        </ul>
      </section>
    </>
  );
};

export default ReferenceBlockWYSIWYG;
