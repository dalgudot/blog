import React, {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { Tuser } from '../../type/firebase';
import { IArticleContent, ArticleContent } from './Model';

interface IBlock {
  setBlockContents: Dispatch<React.SetStateAction<IArticleContent[]>>;
  user: Tuser;
  content: IArticleContent;
  blockContents: IArticleContent[];
}

const Block: React.FC<IBlock> = ({
  user,
  content,
  blockContents,
  setBlockContents,
}) => {
  const [text, setText] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const currentIndex = blockContents.indexOf(content);
  const nextIndexBlock = blockContents[currentIndex + 1];

  useEffect(() => {
    focusBlock();
    // 다음 블럭 돔 요소가 삭제(변경)되면 focus
  }, [nextIndexBlock]);

  const focusBlock = () => {
    textAreaRef.current?.focus();
  };

  const blurBlock = () => {
    textAreaRef.current?.blur();
  };

  const addBlock = () => {
    const newBlockContent = new ArticleContent(user);
    const isEnd = currentIndex === blockContents.length - 1;

    if (isEnd) {
      setBlockContents([...blockContents, newBlockContent]);
      // setBlockContents((prev) => [...prev, newBlockContent]);
      // 불변성 지키기 위해 ...spread 연산자 or cancat() 사용
      // concat 함수는 기존의 배열을 수정하지 않고, 새로운 원소가 추가된 새로운 배열을 만듦.
    } else {
      // 아래 링크 꼭 참고!
      // https://velopert.com/3486
      // 불변성 유지하기 위해 배열을 복사한 뒤 업데이트해서 setBlockContents(copyBlockContents)!
      const copyBlockContents = [...blockContents];
      copyBlockContents.splice(currentIndex + 1, 0, newBlockContent);
      setBlockContents(copyBlockContents);
      // 배열의 불변성을 유지하면서 배열을 업데이트 할 때 map 함수 사용
    }
  };

  const removeBlock = () => {
    const isMoreThanTwoBlock = blockContents.length > 1;

    if (isMoreThanTwoBlock) {
      const blockId = content.blockId;
      setBlockContents(
        blockContents.filter((content) => content.blockId !== blockId)
      ); // 불변성 지키기 위해 state에 바로 push, splice, sort 등의 함수를 사용하면 안 됨. 전개 연산자 등으로 복사 후 써야 함.
    }
  };

  const onKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      // [IME] '자음'과 '모음'을 함께 쓰는 한글의 특성으로 인해 버그 발생함.
      // https://answers.microsoft.com/ko-kr/ie/forum/all/%ED%95%9C%EA%B8%80-%EC%9E%85%EB%A0%A5-%ED%9B%84/2071781c-f2e2-4320-8755-d306439c2f19
      // KeyDown -> KeyPress로 해결! (https://ckbcorp.tistory.com/819)
      e.preventDefault();
      blurBlock();
      addBlock();
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
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
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setText(e.target.value)
        }
        onKeyPress={onKeyPress}
        onKeyDown={onKeyDown}
        spellCheck={false}
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
  resize: none; // 늘이고 줄이는 기능 없애기

  /* https://uxgjs.tistory.com/45 */
  display: block; // p tag 하단에 생기는 3px 제거
  display: -webkit-box; // fix a chrome specific bug

  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: transparent;

  // 안드로이드 삼성 인터넷에서 작동 안 해서 !important
  /* border: 1px solid #dbdbdb !important;  */

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
