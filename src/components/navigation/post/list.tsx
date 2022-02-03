import Link from 'next/link';
import { getDate } from '../../../lib/utils/get-date';
import styles from './list.module.scss';

type Props = {
  category: string;
  order: string;
  title: string;
};

const List: React.FC<Props> = ({ category, order, title }) => {
  const { dateForSEO, dateForDisplay } = getDate();

  return (
    <>
      <li className={styles.post__list}>
        <Link href={`/${category}/${order}`}>
          <a>
            <time dateTime={dateForSEO} className='body4__300'>
              {dateForDisplay}
            </time>
            <h1 className='title2__500'>{title}</h1>
          </a>
        </Link>
      </li>
    </>
  );
};

export default List;
