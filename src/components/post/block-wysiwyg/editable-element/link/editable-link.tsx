import {
  ChangeEvent,
  Dispatch,
  FC,
  KeyboardEvent,
  SetStateAction,
} from 'react';
import { addLinkBlock } from '../../../../../redux-toolkit/slices/post-slice';
import { useAppDispatch } from '../../../../../redux-toolkit/store';
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

  const onInput = (
    e: ChangeEvent<HTMLHeadingElement | HTMLParagraphElement>,
    setHtmlContent: Dispatch<SetStateAction<string>>
  ) => {
    const inputHtml = e.target.innerHTML;
    setHtmlContent(inputHtml);
    setRefTitle(inputHtml, currentIndex);
  };

  const dispatch = useAppDispatch();

  const onKeyPress = (
    e: KeyboardEvent<HTMLHeadingElement | HTMLParagraphElement>,
    blurBlock: () => void
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      blurBlock();

      const newLinkEditableBlock = {
        title: '',
        url: '',
      };
      dispatch(addLinkBlock(newLinkEditableBlock));

      console.log('Enter');
    }
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
            onKeyPress={onKeyPress}
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
