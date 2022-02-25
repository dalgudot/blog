import classNames from 'classnames';
import { FC, memo } from 'react';
import styles from './table-of-contents.module.scss';

export type TTableOfContentsData = {
  blockType: 'Heading2' | 'Heading3';
  blockId: string;
  html: string;
};

type Props = {
  tableOfContentsData: TTableOfContentsData[];
};

const TableOfContents: FC<Props> = ({ tableOfContentsData }) => {
  return (
    <aside className={styles.aside}>
      <nav>
        <ul>
          {tableOfContentsData.map((data) => (
            <li key={data.blockId}>
              <a
                href={`#${data.blockId}`}
                className={classNames(
                  data.blockType === 'Heading2'
                    ? styles.heading2
                    : styles.heading3
                )}
              >
                {data.html}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default memo(TableOfContents);
// https://www.emgoto.com/react-table-of-contents/
