import { ChangeEvent, FC } from 'react';
import styles from './url-input.module.scss';

type Props = {
  linkUrl: string;
  setUrlData: (data: string, currentIndex: number) => void;
  currentIndex: number;
};

const UrlInput: FC<Props> = ({ linkUrl, setUrlData, currentIndex }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUrlData(e.target.value, currentIndex);
  };

  return (
    <form className={styles.url__input__form}>
      <input
        type='text'
        value={linkUrl}
        onChange={handleChange}
        placeholder='Enter the URL'
      />
    </form>
  );
};

export default UrlInput;
