import { FC } from 'react';

type Props = {
  blockType: 'Link';
};

const ContentEditableLink: FC<Props> = ({ blockType }) => {
  return <div>{blockType}</div>;
};

export default ContentEditableLink;
