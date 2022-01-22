import { FC } from 'react';
import ContentEditableLink from '../block-wysiwyg/content-editable-element/link/content-editable-link';
import styles from './reference.module.scss';

type Props = {
  contentEditable: boolean;
};

const ReferenceBlockWYSIWYG: FC<Props> = ({ contentEditable }) => {
  // 여기서 상태 관리 - 서버에 저장 // 서버에서 정보 받아옴.
  // 데이터는 2가지: 제목(클라이언트에서 한줄 다 차면 ...으로 표시), 링크

  return (
    <ul>
      <ContentEditableLink blockType='Link' />
    </ul>
  );
};

export default ReferenceBlockWYSIWYG;
