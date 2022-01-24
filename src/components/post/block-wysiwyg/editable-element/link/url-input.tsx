import { ChangeEvent, FC, useState } from 'react';
import styles from './url-input.module.scss';

type Props = {
  linkUrl: string;
  setRefUrl: (data: string, currentIndex: number) => void;
  currentIndex: number;
};

const UrlInput: FC<Props> = ({ linkUrl, setRefUrl, currentIndex }) => {
  const [text, setText] = useState<string>(linkUrl);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    setRefUrl(e.target.value, currentIndex);
  };

  return (
    <form className={styles.url__input__form}>
      <input
        type='text'
        value={text}
        onChange={handleChange}
        placeholder='Enter the URL'
      />
    </form>
  );
};

export default UrlInput;
