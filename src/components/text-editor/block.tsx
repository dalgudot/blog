import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { TnewBlockContent } from './text-editor';

interface IBlockProps {
  content: TnewBlockContent;
  handleBlock: (e: React.KeyboardEvent<HTMLParagraphElement>) => void;
}

const Block: React.FC<IBlockProps> = ({ content, handleBlock }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isActiveBlock, setIsActiveBlock] = useState<boolean>(true);
  const [text, setText] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const focusTextBlock = () => {
    textAreaRef.current?.focus();
  };

  useEffect(() => {
    focusTextBlock();
  }, []);

  const activeBlock = () => {
    setIsActiveBlock(true);
    focusTextBlock();
  };

  const blurBlock = () => {
    setIsActiveBlock(false);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e.target.value);
    setText(e.target.value);
  };

  return (
    <>
      <TextBlock
        as={content.tagName}
        onClick={activeBlock}
        onBlur={blurBlock}
        onKeyDown={handleBlock}
      >
        <AutoSizeTextArea
          ref={textAreaRef}
          value={text}
          onChange={handleTextChange}
          placeholder='placeholder'

          // onFocus={focusBlock}
        />
        {/* {isActiveBlock ? (
          <AutoSizeTextArea
            ref={textAreaRef}
            value={text}
            onChange={(e) => handleTextChange(e)}
            // onFocus={focusBlock}
          />
        ) : (
          text
        )} */}
      </TextBlock>
    </>
  );
};

export default Block;

const TextBlock = styled.p`
  background-color: aliceblue;
`;

// Enter 치면 textarea focus 해제되면서 다음 block 생성
const AutoSizeTextArea = styled.textarea`
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  -webkit-appearance: none; // remove iOS upper inner shadow

  padding: 24px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: transparent;
  // 안드로이드 삼성 인터넷에서 작동 안 해서 !important
  /* border: 1px solid #dbdbdb !important;  */
  resize: none; // 늘이고 줄이는 기능 없애기

  /* text */
  caret-color: black;
  color: #434343;
  /* font-weight: 400;
  line-height: 1.4; */
  font-size: 18px;

  ::placeholder {
    color: #dadada;
  }

  @media (hover: hover) {
    :hover {
      background-color: #929bce;
      transition: background-color 0.2s ease-in-out;
    }
  }
`;
