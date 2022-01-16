import { useToast } from '@dalgu/react-toast';
import React, { useState } from 'react';
import { FireStoreDB } from '../../service/firebase/firestore-db';
import { Tuser } from '../../types/firebase';
import Block from './block';
import { ArticleContent, IArticleContent } from './models/article-content';

export interface ItextEditor {
  user: Tuser;
}

const TextEditor: React.FC<ItextEditor> = ({ user }) => {
  const { showToast } = useToast();

  const articleContent: IArticleContent = new ArticleContent(user);
  const [articleContents, setArticleContent] = useState<IArticleContent[]>([
    articleContent,
  ]);

  const [blockContents, setBlockContents] = useState<IArticleContent[]>([
    articleContent,
  ]);

  console.log(articleContent);

  const firestore = new FireStoreDB();
  const saveFirestoreDB = () => {
    firestore
      .setDocument(
        { test: '1' },
        'articles',
        `${articleContent.title.category}/${articleContent.title.h1}`
      )
      .then(() => {
        showToast('서버 저장');
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  // 리액트에서 state를 업데이트할 때에는 항상 불변성을 지켜야 한다. 그러지 않으면 제대로 동작하지 않음.
  // console.log(blockContents);

  return (
    <>
      {blockContents.map((content) => (
        <Block
          key={content.id}
          user={user}
          content={content}
          blockContents={blockContents}
          setBlockContents={setBlockContents}
        />
      ))}
      <button onClick={saveFirestoreDB}>서버에 저장</button>
    </>
  );
};

export default TextEditor;
