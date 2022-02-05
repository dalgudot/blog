import { FC } from 'react';
import styles from './editable-image-block.module.scss';

type Props = {
  fileHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  blockId: string;
};

const UploadImage: FC<Props> = ({ fileHandler, blockId }) => {
  return (
    <>
      {/* https://helloinyong.tistory.com/275 */}
      <label className={styles.label} htmlFor={blockId}>
        {/* display: 'none'은 접근성 문제 발생? -> none 아니면 iOS에서 버튼 크기가 커지는 문제 발생 */}
        <input
          style={{ display: 'none' }}
          id={blockId}
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
