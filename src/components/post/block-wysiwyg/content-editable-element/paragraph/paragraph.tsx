import { FC } from 'react';

type Props = {
  blockType: 'Paragraph';
};

const ContentEditableParagraph: FC<Props> = ({ blockType }) => {
  return <p>{blockType}</p>;
};

export default ContentEditableParagraph;
