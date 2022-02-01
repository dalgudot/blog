import { FC } from 'react';

import styles from './editable-image-block.module.scss';

type Props = {
  fileHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const UploadImage: FC<Props> = ({ fileHandler }) => {
  return (
    <>
      {/* https://helloinyong.tistory.com/275 */}
      <label htmlFor='upload-image' className={styles.label}>
        {/* display: 'none'은 접근성 문제 발생? -> none 아니면 iOS에서 버튼 크기가 커지는 문제 발생 */}
        <input
          style={{ display: 'none' }}
          id='upload-image'
          type='file'
          accept='image/*'
          onChange={fileHandler}
        />
        <p>이미지 업로드</p>
      </label>
    </>
  );
};

export default UploadImage;
