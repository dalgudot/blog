import { FC } from 'react';
import { IParagraphData } from '../../../../redux-toolkit/model/post-data-model';
import EditableElementSwitch from '../../../block-wysiwyg/editable-element-switch';
import styles from './wysiwyg.module.scss';

type Props = {
  contentEditable: boolean;
  wysiwygDataArray: IParagraphData[];
};

const WYSIWYG: FC<Props> = ({ contentEditable, wysiwygDataArray }) => {
  return (
    <>
      <section className={styles.article__paragraph__section}>
        {wysiwygDataArray.map((data, idx) => (
          <EditableElementSwitch
            key={data.blockId}
            blockType={data.blockType}
            contentEditable={contentEditable}
            data={data}
            datas={wysiwygDataArray}
            datasLength={wysiwygDataArray.length}
            currentIndex={idx}
          />
        ))}
      </section>
    </>
  );
};

export default WYSIWYG;
