import { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import { setCurrentLinkBlockTempLinkUrl } from '../../../../redux-toolkit/slices/temp-post-slice';
import { useAppDispatch } from '../../../../redux-toolkit/store';

type Props = {
  linkUrl: string;
  onKeyPress?: (e: KeyboardEvent<HTMLInputElement>) => void;
  currentIndex: number;
};

const UrlInput: FC<Props> = ({ linkUrl, onKeyPress, currentIndex }) => {
  const [text, setText] = useState<string>(linkUrl);
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    dispatch(
      setCurrentLinkBlockTempLinkUrl({ data: e.target.value, currentIndex })
    );
  };

  return (
    <input
      type='text'
      value={text}
      onChange={handleChange}
      onKeyPress={onKeyPress}
      placeholder='URL을 입력해주세요'
    />
  );
};

export default UrlInput;
