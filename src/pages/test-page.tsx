import { useToast } from '@dalgu/react-toast';
import { NextPage } from 'next';
import SwitchEditableBlocks from '../components/post/block-wysiwyg/switch-editable-blocks';
import Response from '../components/post/response/response';

const TestPage: NextPage = () => {
  const { showToast } = useToast();
  return (
    <>
      {/* <h1>Test!</h1> */}
      {/* <Response /> */}

      {/* <button onClick={() => showToast('hi')}>토스트</button> */}
    </>
  );
};

export default TestPage;
