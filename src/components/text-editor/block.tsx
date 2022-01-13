import React, { RefObject, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { DynamicTypeElement } from '../../lib/utils/jsx-element';
import { tid } from '../../lib/utils/tid';

interface IBlockProps {
  tagName: textTagName;
  handleBlock: (e: React.KeyboardEvent<HTMLParagraphElement>) => void;
}

const Block: React.FC<IBlockProps> = ({ tagName, handleBlock }) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const [isActiveBlock, setIsActiveBlock] = useState<boolean>(true);
  const [text, setText] = useState('');

  console.log(isActiveBlock);

  useEffect(() => {
    textAreaRef.current?.focus();
  }, []);

  const activeBlock = () => {
    setIsActiveBlock(true);
    textAreaRef.current?.focus();
  };

  const blurBlock = () => {
    setIsActiveBlock(false);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <>
      <TextBlock
        as={tagName}
        onClick={activeBlock}
        onBlur={blurBlock}
        onKeyDown={handleBlock}
      >
        {isActiveBlock ? (
          <AutoSizeTextArea
            ref={textAreaRef}
            value={text}
            onChange={(e) => handleTextChange(e)}
          />
        ) : (
          text
        )}
      </TextBlock>
    </>
  );
};

export default Block;

const TextBlock = styled.p`
  width: 100%;
  height: 100%;
  padding: 24px;

  background-color: #8496a5;

  @media (hover: hover) {
    :hover {
      background-color: #929bce;
      transition: background-color 0.2s ease-in-out;
    }
  }
`;

// Enter 치면 textarea focus 해제되면서 다음 block 생성
const AutoSizeTextArea = styled.textarea`
  width: 100%;
  height: 100%;
  background-color: aliceblue;
`;
