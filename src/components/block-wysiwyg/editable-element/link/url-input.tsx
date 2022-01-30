import { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import { setTempLinkUrlData } from '../../../../redux-toolkit/slices/temp-post-slice';
import { useAppDispatch } from '../../../../redux-toolkit/store';

type Props = {
  linkUrl: string;
  // onKeyPress: (e: KeyboardEvent<HTMLInputElement>) => void;
  currentIndex: number;
};

const UrlInput: FC<Props> = ({ linkUrl, currentIndex }) => {
  const [text, setText] = useState<string>(linkUrl);
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    dispatch(setTempLinkUrlData({ data: e.target.value, currentIndex }));
  };

  return (
    <input
      type='text'
      value={text}
      onChange={handleChange}
      // onKeyPress={onKeyPress}
      placeholder='URL을 입력해주세요'
    />
  );
};

export default UrlInput;
