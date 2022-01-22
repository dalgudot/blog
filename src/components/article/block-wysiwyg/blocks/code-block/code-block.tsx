import { FC } from 'react';
import styles from './code-block.module.scss';

type Props = {
  language: 'tsx' | 'typescript' | 'css';
  codeString: string;
};

const CodeBlock: FC<Props> = ({ language, codeString }) => {
  return <></>;
};

export default CodeBlock;
