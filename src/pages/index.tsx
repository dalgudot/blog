import type { NextPage } from 'next';
import TextEditorBlock from '../components/text-editor/text-editor-block';

const Home: NextPage = () => {
  return (
    <>
      <TextEditorBlock test='test' />
    </>
  );
};

export default Home;
