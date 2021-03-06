import { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import {
  setCurrentLinkBlockTempLinkUrl,
  setNormalWysiwygCurrentLinkBlockTempLinkUrl,
} from '../../../../redux-toolkit/slices/temp-post-slice';
import { useAppDispatch } from '../../../../redux-toolkit/store';
import styles from './editable-link-block.module.scss';

type Props = {
  wysiwygType: 'Normal' | 'Link';
  linkUrl: string;
  onKeyPress?: (e: KeyboardEvent<HTMLInputElement>) => void;
  currentIndex: number;
};

const UrlInput: FC<Props> = ({
  wysiwygType,
  linkUrl,
  onKeyPress,
  currentIndex,
}) => {
  const [text, setText] = useState<string>(linkUrl);
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);

    if (wysiwygType === 'Link') {
      dispatch(
        setCurrentLinkBlockTempLinkUrl({ data: e.target.value, currentIndex })
      );
    } else {
      dispatch(
        setNormalWysiwygCurrentLinkBlockTempLinkUrl({
          data: e.target.value,
          currentIndex,
        })
      );
    }
  };

  return (
    <input
      type='text'
      value={text}
      onChange={handleChange}
      onKeyPress={onKeyPress}
      placeholder='URL'
      className={styles.input}
    />
  );
};

export default UrlInput;
