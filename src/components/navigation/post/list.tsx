import Link from 'next/link';
import { checkPublishedDate } from '../../../lib/utils/get-date';
import { TStatus } from '../../../redux-toolkit/model/post-data-model';
import styles from './list.module.scss';

type Props = {
  category: string;
  order: string;
  title: string;
  dateTime: string;
  status: TStatus;
};

const List: React.FC<Props> = ({
  category,
  order,
  title,
  dateTime,
  status,
}) => {
  const { seoDate, displayDate } = checkPublishedDate(status, dateTime);

  return (
    <>
      <li className={styles.post__list}>
        <Link href={`/${category}/${order}`}>
          <a>
            <time dateTime={seoDate}>{displayDate}</time>
            <h1>{title}</h1>
          </a>
        </Link>
      </li>
    </>
  );
};

export default List;
