import { FC } from 'react';

type Props = {
  HeadingHtmlTag: 'h1' | 'h2' | 'h3';
};

const ContentEditableHeading: FC<Props> = ({ HeadingHtmlTag }) => {
  return <HeadingHtmlTag>{HeadingHtmlTag}</HeadingHtmlTag>;
};

export default ContentEditableHeading;
