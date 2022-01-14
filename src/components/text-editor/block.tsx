import React, {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { INewBlockContent, NewBlockContent } from './Model';

interface IBlock {
  content: INewBlockContent;
  blockContents: INewBlockContent[];
  setBlockContents: Dispatch<React.SetStateAction<INewBlockContent[]>>;
}

const Block: React.FC<IBlock> = ({
  content,
  blockContents,
  setBlockContents,
}) => {
  const [text, setText] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    focusBlock();
  }, []);

  const focusBlock = () => {
    textAreaRef.current?.focus();
  };

  const blurBlock = () => {
    textAreaRef.current?.blur();
  };

  const removeBlock = () => {
    const uuid = content.uuid;
    setBlockContents(blockContents.filter((content) => content.uuid !== uuid));
  };

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      blurBlock();
      const newBlockContent = new NewBlockContent();
      setBlockContents((prev) => [...prev, newBlockContent]);
    }

    if (text === '' && e.key === 'Backspace') {
      e.preventDefault();
      removeBlock();
    }
  };

  return (
    <TextBlock as={content.tagName}>
      <TextArea
        ref={textAreaRef}
        value={text}
        onChange={handleTextChange}
        onKeyDown={onKeyDown}
        placeholder='placeholder'
      />
    </TextBlock>
  );
};

export default Block;

const TextBlock = styled.p`
  padding: 0 36px;
`;

const TextArea = styled.textarea`
  -webkit-appearance: none; // remove iOS upper inner shadow
  /* https://uxgjs.tistory.com/45 */
  /* vertical-align: bottom;  */
  display: block; // p tag 하단에 생기는 3px 제거

  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: transparent;

  // 안드로이드 삼성 인터넷에서 작동 안 해서 !important
  /* border: 1px solid #dbdbdb !important;  */

  resize: none; // 늘이고 줄이는 기능 없애기

  /* Text */
  caret-color: whitesmoke;
  color: whitesmoke;
  font-weight: 900;
  line-height: 1.4;
  font-size: 36px;
  /* Text */

  ::placeholder {
    color: #5f5f5f;
  }

  @media (hover: hover) {
    :hover {
      background-color: #929bce;
      transition: background-color 0.2s ease-in-out;
    }
  }
`;
