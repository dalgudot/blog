import { FC } from 'react';
import { ILinkData } from '../../../redux-toolkit/model/link-data-model';
import EditableElementSwitch from '../../block-wysiwyg/editable-element-switch';
import styles from './link-wysiwyg.module.scss';

type Props = {
  contentEditable: boolean;
  linkWysiwygDataArray: ILinkData[];
};

const LinkWYSIWYG: FC<Props> = ({ contentEditable, linkWysiwygDataArray }) => {
  // 데이터는 2가지: 제목(클라이언트에서 한줄 다 차면 ...으로 표시), 링크

  return (
    <>
      <section className={styles.reference__section}>
        <h2>참고 자료</h2>
        <ul>
          {linkWysiwygDataArray.map((data, idx) => (
            <EditableElementSwitch
              wysiwygType='Link'
              linkBlockType='Reference'
              key={data.blockId}
              contentEditable={contentEditable}
              data={data}
              datas={linkWysiwygDataArray}
              currentIndex={idx}
            />
          ))}
        </ul>
      </section>
    </>
  );
};

// props는 첫 렌더링 이후 변하지 않으므로 memo 이용하면 렌더링 성능 극대화
export default LinkWYSIWYG;
