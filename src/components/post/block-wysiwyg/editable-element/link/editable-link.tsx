import { ChangeEvent, FC, KeyboardEvent } from 'react';
import { addLinkBlock } from '../../../../../redux-toolkit/slices/post-slice';
import {
  addTempLinkBlock,
  setTempRefTitleData,
} from '../../../../../redux-toolkit/slices/temp-post-slice';
import { useAppDispatch } from '../../../../../redux-toolkit/store';
import { IRefData } from '../../../../../service/firebase/firestore';
import EditableElement from '../../editable-element';
import styles from './editable-link.module.scss';
import UrlInput from './url-input';

type Props = {
  contentEditable: boolean;
  datas: IRefData[];
  data: IRefData;
};

const EditableLink: FC<Props> = ({ contentEditable, datas, data }) => {
  const currentIndex = datas.indexOf(data);
  const dispatch = useAppDispatch();

  const onInput = (
    e: ChangeEvent<HTMLHeadingElement | HTMLParagraphElement>
  ) => {
    const inputHtml = e.target.innerHTML;
    dispatch(setTempRefTitleData({ inputHtml, currentIndex }));
  };

  const onKeyPress = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newLinkEditableBlock = {
        title: '',
        url: '',
      };
      dispatch(addLinkBlock(newLinkEditableBlock)); // 새로운 블럭 그리기 위해
      dispatch(addTempLinkBlock(newLinkEditableBlock)); // 데이터 저장하기 위해

      console.log('onKeyPress, Enter');
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
            onKeyPress={onKeyPress}
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
