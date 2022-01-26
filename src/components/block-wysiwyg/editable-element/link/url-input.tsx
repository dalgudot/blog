import { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import { setTempRefUrlData } from '../../../../redux-toolkit/slices/temp-post-slice';
import { useAppDispatch } from '../../../../redux-toolkit/store';
import styles from './url-input.module.scss';

type Props = {
  linkUrl: string;
  onKeyPress: (e: KeyboardEvent<HTMLInputElement>) => void;
  currentIndex: number;
};

const UrlInput: FC<Props> = ({ linkUrl, onKeyPress, currentIndex }) => {
  const [text, setText] = useState<string>(linkUrl);
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    dispatch(setTempRefUrlData({ data: e.target.value, currentIndex }));
  };

  return (
    <form className={styles.url__input__form}>
      <input
        type='text'
        value={text}
        onChange={handleChange}
        onKeyPress={onKeyPress}
        placeholder='Enter the URL'
      />
    </form>
  );
};

export default UrlInput;
