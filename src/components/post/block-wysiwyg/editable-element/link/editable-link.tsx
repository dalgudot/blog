import { ChangeEvent, FC, useState } from 'react';
import { IRefData } from '../../../../../redux-toolkit/slices/post/all-datas-slice';
import { useAppDispatch } from '../../../../../redux-toolkit/store';
import EditableElement from '../../editable-element';
import styles from './editable-link.module.scss';
import UrlInput from './url-input';

type Props = {
  contentEditable: boolean;
  datas: IRefData[];
  data: IRefData;
  setTitleData: (data: string, currentIndex: number) => void;
  setUrlData: (data: string, currentIndex: number) => void;
};

const EditableLink: FC<Props> = ({
  contentEditable,
  datas,
  data,
  setTitleData,
  setUrlData,
}) => {
  const currentIndex = datas.indexOf(data);

  // 임시로 텍스트를 가지고 있다가, focusout이 되면 data를 set <-- 글씨 쓸 때마다 blur되는 것 방지.
  // const [title, setTitle] = useState<string>(data.title);

  const onInput = (e: ChangeEvent<HTMLParagraphElement>) => {
    const inputHtml = e.target.innerHTML;

    setTitleData(inputHtml, currentIndex);
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
            setUrlData={setUrlData}
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
