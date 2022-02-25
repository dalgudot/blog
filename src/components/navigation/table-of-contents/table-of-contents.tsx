import { FC, memo } from 'react';
import styles from './table-of-contents.module.scss';

export type TTableOfContentsData = {
  blockType: string;
  blockId: string;
  html: string;
};

type Props = {
  tableOfContentsData: TTableOfContentsData[];
};

const TableOfContents: FC<Props> = ({ tableOfContentsData }) => {
  console.log('tableOfContentsData', tableOfContentsData);
  return (
    <aside className={styles.aside}>
      <nav>
        {tableOfContentsData.map((data) => (
          <a key={data.blockId} href={`#${data.blockId}`}>
            {data.html}
          </a>
        ))}
      </nav>
    </aside>
  );
};

export default memo(TableOfContents);
