import styles from './list.module.scss';

type Props = {
  url: string;
  dateTime: string;
  title: string;
};

const BrunchList: React.FC<Props> = ({ url, dateTime, title }) => {
  // replaceAll('-', '.') 대신 정규식을 써서 replace(/-/g, '.')로 해야 빌드 에러 안 남
  const displayDateTime = dateTime.replace(/-/g, '.');

  return (
    <>
      <li className={styles.post__list}>
        <a href={url} target='_blank' rel='noreferrer'>
          <time dateTime={dateTime} className='body4__300'>
            {displayDateTime}
          </time>
          <h1 className='title2__500'>{title}</h1>
        </a>
      </li>
    </>
  );
};

export default BrunchList;
