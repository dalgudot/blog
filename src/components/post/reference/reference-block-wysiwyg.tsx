import { FC, memo } from 'react';
import { IRefData } from '../../../redux-toolkit/model/ref-data-model';
import EditableLinkBlock from '../../block-wysiwyg/editable-element/link/editable-link-block';
import styles from './reference-block-wysiwyg.module.scss';

type Props = {
  contentEditable: boolean;
  refDataArray: IRefData[];
};

// <EditableLinkBlock />을 활용한 Block WYSIWYG을 만드는 컴포넌트!
const ReferenceBlockWYSIWYG: FC<Props> = ({
  contentEditable,
  refDataArray,
}) => {
  // 데이터는 2가지: 제목(클라이언트에서 한줄 다 차면 ...으로 표시), 링크
  const refDatasLength = refDataArray.length;

  return (
    <>
      <section className={styles.reference__section}>
        <h2>참고 자료</h2>
        <ul>
          {refDataArray.map((data, idx) => (
            <EditableLinkBlock
              key={data.blockId}
              contentEditable={contentEditable}
              datas={refDataArray}
              data={data}
              idx={idx}
              refDatasLength={refDatasLength}
            />
          ))}
        </ul>
      </section>
    </>
  );
};

// props는 첫 렌덜이 이후 변하지 않으므로 memo 이용하면 렌더링 성능 극대화
export default memo(ReferenceBlockWYSIWYG);
