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

  const addBlock = () => {
    const newBlockContent = new NewBlockContent();
    const currentIndex = blockContents.indexOf(content);
    const isEnd = currentIndex === blockContents.length - 1;

    if (isEnd) {
      setBlockContents([...blockContents, newBlockContent]);
      // setBlockContents((prev) => [...prev, newBlockContent]);
      // 불변성 지키기 위해 ...spread 연산자 or cancat() 사용
      // concat 함수는 기존의 배열을 수정하지 않고, 새로운 원소가 추가된 새로운 배열을 만듦.
    } else {
      // 아래 링크 꼭 참고!
      // https://velopert.com/3486
      // 불변성 유지하기 위해 배열을 복사해서 특정 부분에 넣어준 뒤 업데이트
      const copyBlockContents = [...blockContents];
      copyBlockContents.splice(currentIndex + 1, 0, newBlockContent);
      setBlockContents(copyBlockContents);
      // 배열의 불변성을 유지하면서 배열을 업데이트 할 때 map 함수 사용
    }
  };

  const removeBlock = () => {
    const isMoreThanTwoBlock = blockContents.length > 1;

    if (isMoreThanTwoBlock) {
      const uuid = content.uuid;
      setBlockContents(
        blockContents.filter((content) => content.uuid !== uuid)
      ); // 불변성 지키기 위해 push, splice, sort 등의 함수를 사용하면 안 됨.
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      blurBlock();
      addBlock();
    }

    if (text === '' && e.key === 'Backspace') {
      e.preventDefault();
      removeBlock();
      // 이전 블럭으로 이동
    }
  };

  return (
    <TextBlock as={content.tagName}>
      <TextArea
        ref={textAreaRef}
        value={text}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setText(e.target.value)
        }
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
  font-weight: 400;
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
