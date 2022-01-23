import { FC, useState } from 'react';
import EditableElement from '../../editable-element';
import styles from './editable-link.module.scss';
import UrlInput from './url-input';

type Props = {
  contentEditable: boolean;
  data: {
    title: string;
    url: string;
  };
};

const EditableLink: FC<Props> = ({ contentEditable, data }) => {
  const [linkUrl, setLinkUrl] = useState<string>('');
  // 오픈 소스 제작 시 url 체크 추가, 다음 라이브러리 참고
  // https://www.npmjs.com/package/valid-url

  return (
    <li className={styles.editable__link__li}>
      {contentEditable ? (
        <>
          <EditableElement
            TagName='p'
            contentEditable={contentEditable}
            html={data.title}
            placeholder='Describe the link'
          />
          <UrlInput linkUrl={data.url} setLinkUrl={setLinkUrl} />
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
