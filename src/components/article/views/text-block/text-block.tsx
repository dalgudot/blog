import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { Tag, TextArea } from './text-block.style';

type TTextBlockProps = {
  type: 'Title' | 'Heading1' | 'Heading2' | 'Paragraph';
};

// 어드민과 글에서 동시에 쓸 수 있도록
const TextBlock: React.FC<TTextBlockProps> = ({ type }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState('');
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
    } else {
      const copyBlockContents = [...blockContents];
      copyBlockContents.splice(currentIndex + 1, 0, newBlockContent);
      setBlockContents(copyBlockContents);
    }
  };

  const removeBlock = () => {
    const isMoreThanTwoBlock = blockContents.length > 1;

    if (isMoreThanTwoBlock) {
      const blockId = content.id;
      setBlockContents(
        blockContents.filter((content) => content.id !== blockId)
      );
    }
  };

  const onKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
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

  const tag =
    type === 'Title'
      ? 'h1'
      : type === 'Heading1'
      ? 'h2'
      : type === 'Heading2'
      ? 'h3'
      : 'Paragraph';

  return (
    <Tag as={tag}>
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
    </Tag>
  );
};

export default TextBlock;
