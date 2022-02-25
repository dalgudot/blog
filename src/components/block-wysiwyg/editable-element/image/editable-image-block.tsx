import {
  FC,
  KeyboardEvent,
  MutableRefObject,
  useEffect,
  useState,
} from 'react';
import styles from './editable-image-block.module.scss';
import UploadImage from './upload-image';
import EditableElement from '../../editable-element';
import { useAppDispatch } from '../../../../redux-toolkit/store';
import {
  getImageDownloadURL,
  uploadImageToStorage,
} from '../../../../service/firebase/storage';
import { setCurrentBlockTempImageRef } from '../../../../redux-toolkit/slices/temp-post-slice';
import { useToast } from '@dalgu/react-toast';
import Image from 'next/image';

type Props = {
  eachBlockRef: MutableRefObject<any>;
  contentEditable: boolean;
  html: string;
  imageDownloadURL: string;
  blockId: string;
  currentIndex: number;
  setCurrentBlockTempPostHtmlData: (inputHtml: string) => void;
  setCurrentBlockPostHtmlData: (inputHtml: string) => void;
  onKeyPress: (e: KeyboardEvent<HTMLElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLElement>) => void;
  placeholder: string;
};

const EditableImageBlock: FC<Props> = ({
  eachBlockRef,
  contentEditable,
  html,
  imageDownloadURL,
  blockId,
  currentIndex,
  setCurrentBlockTempPostHtmlData, // 캡션 데이터로 활용
  setCurrentBlockPostHtmlData,
  onKeyPress,
  onKeyDown,
  placeholder,
}) => {
  const [image, setImage] = useState<string>(imageDownloadURL);
  const { showToast } = useToast();
  const dispatch = useAppDispatch();

  const fileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    const file = fileList && fileList[0];

    if (file) {
      const blobUrl = URL.createObjectURL(file); // useEffect()의 return에서 revoke
      setImage(blobUrl); // [UX Logic] 서버 저장 전 로컬에서 빠르게 보여주기 위해

      // images 폴더 안에 저장해두고 draft나 발행된 글 모두에서 고유한 URL로 접근!
      // 이미지 파일명 규칙 -> `${category}${order}-숫자'
      // thumbnail은 thumbnail이라 이름지음
      const storageRef = `images/${file.name}`;

      if (process.env.NODE_ENV === 'production') {
        await uploadImageToStorage(file, storageRef);
        const imageRef = await getImageDownloadURL(storageRef);
        dispatch(
          setCurrentBlockTempImageRef({
            imageRef,
            currentIndex,
          })
        );
        showToast('서버 업로드 완료');
      } else {
        const imageRef = `/${storageRef}`;
        dispatch(
          setCurrentBlockTempImageRef({
            imageRef,
            currentIndex,
          })
        );
        showToast('임시 저장 완료');
      }
    }
  };

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(image);
    };
  }, []);

  return (
    <>
      <figure className={styles.figure}>
        {image && (
          // https://nextjs.org/docs/basic-features/image-optimization
          <Image src={image} alt={html} layout='fill' priority />
        )}
        {contentEditable && (
          <UploadImage fileHandler={fileHandler} blockId={blockId} />
        )}
        <EditableElement
          TagName='figcaption'
          eachBlockRef={eachBlockRef}
          contentEditable={contentEditable}
          html={html}
          setCurrentBlockTempPostHtmlData={setCurrentBlockTempPostHtmlData}
          setCurrentBlockPostHtmlData={setCurrentBlockPostHtmlData}
          onKeyPress={onKeyPress} // optional, 블록 추가
          onKeyDown={onKeyDown} // optional, 블록 삭제
          placeholder={placeholder}
        />
      </figure>
    </>
  );
};

export default EditableImageBlock;
