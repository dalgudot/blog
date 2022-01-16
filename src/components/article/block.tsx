import React, {
  Dispatch,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Tuser } from '../../types/firebase';
import { IArticleContent, ArticleContent } from './models/article-content';
import TextBlock from './views/text-block/text-block';

type TBlockProps = {
  setBlockContents: Dispatch<React.SetStateAction<IArticleContent[]>>;
  user: Tuser;
  content: IArticleContent;
  blockContents: IArticleContent[];
};

const Block: React.FC<TBlockProps> = ({
  user,
  content,
  blockContents,
  setBlockContents,
}) => {
  return <TextBlock type={'Title'} />;
};

export default Block;
