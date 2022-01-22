import { FC } from 'react';

type Props = {
  blockType: 'Link';
};

const ContentEditableLink: FC<Props> = ({ blockType }) => {
  return (
    <li>
      <a>{blockType}</a>
    </li>
  );
};

export default ContentEditableLink;
