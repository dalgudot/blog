import { ChangeEvent, FC } from 'react';
import { IRefData } from '../../../../../service/firebase/firestore';
import EditableElement from '../../editable-element';
import styles from './editable-link.module.scss';
import UrlInput from './url-input';

type Props = {
  contentEditable: boolean;
  datas: IRefData[];
  data: IRefData;
  setRefTitle: (data: string, currentIndex: number) => void;
  setRefUrl: (data: string, currentIndex: number) => void;
};

const EditableLink: FC<Props> = ({
  contentEditable,
  datas,
  data,
  setRefTitle,
  setRefUrl,
}) => {
  const currentIndex = datas.indexOf(data);

  const onInput = (e: ChangeEvent<HTMLParagraphElement>) => {
    const inputHtml = e.target.innerHTML;
    setRefTitle(inputHtml, currentIndex);
  };

  return (
    <li className={styles.editable__link__li}>
      {contentEditable ? (
        <>
          <EditableElement
            TagName='p'
            contentEditable={contentEditable}
            html={data.title}
            onInput={onInput}
            placeholder='Describe the link'
          />
          <UrlInput
            linkUrl={data.url}
            setRefUrl={setRefUrl}
            currentIndex={currentIndex}
          />
        </>
      ) : (
        <a href={data.url} target='_blank' rel='noreferrer'>
          <EditableElement
            TagName='p'
            contentEditable={contentEditable}
            html={data.title}
          />
        </a>
      )}
    </li>
  );
};

export default EditableLink;
