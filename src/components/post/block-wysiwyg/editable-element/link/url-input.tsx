import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from 'react';
import styles from './url-input.module.scss';

type Props = {
  linkUrl: string;
  setLinkUrl: Dispatch<SetStateAction<string>>;
};

const UrlInput: FC<Props> = ({ linkUrl, setLinkUrl }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLinkUrl(e.target.value);
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
