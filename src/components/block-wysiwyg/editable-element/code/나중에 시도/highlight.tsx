import { FC } from 'react';
// import { ChangeEvent, FC, KeyboardEvent, useEffect, useState } from 'react';
// import styles from './editable-code-block.module.scss';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
// import EditableElement from '../../../editable-element';
// import { IParagraphData } from '../../../../../redux-toolkit/model/post-data-model';
// import { useEditable } from '../../../../../lib/hooks/useEditable';
// import hljs from 'highlight.js';
// import classNames from 'classnames';
// import javascript from 'highlight.js/lib/languages/javascript';
// import 'highlight.js/styles/a11y-dark.css';

// // https://github.com/highlightjs/highlight.js/issues/925#:~:text=commented%20on%203%20Oct%202018

// hljs.registerLanguage('javascript', javascript);

// type Props = {
//   contentEditable: boolean;
//   html: string;
//   setTempPostHtmlData: (inputHtml: string) => void;
//   // setPostHtmlData: (inputHtml: string) => void;
//   onKeyPress?: (e: KeyboardEvent<HTMLElement>) => void;
//   onKeyDown?: (e: KeyboardEvent<HTMLElement>) => void;
//   addBlockFocusUseEffectDependency?: IParagraphData;
//   removeCurrentBlockFocusUseEffectDependency?: IParagraphData;
//   placeholder: string;
// };

// const EditableCodeBlockTest: FC<Props> = ({
//   contentEditable,
//   html,
//   setTempPostHtmlData,
//   // setPostHtmlData,
//   onKeyPress,
//   onKeyDown,
//   addBlockFocusUseEffectDependency,
//   removeCurrentBlockFocusUseEffectDependency,
//   placeholder,
// }) => {
//   const [codeString, setCodeString] = useState<string>(html);
//   useEffect(() => {
//     hljs.highlightAll();
//     // hljs.highlightBlock(ref.current);
//   }, [codeString]);

//   const syncTempPostWithPasteText = (newInnerPasteText: string) => {
//     setTempPostHtmlData(newInnerPasteText);
//     setCodeString(newInnerPasteText);
//   };

//   const ref = useEditable(
//     html,
//     syncTempPostWithPasteText,
//     addBlockFocusUseEffectDependency,
//     removeCurrentBlockFocusUseEffectDependency
//   );

//   const onInput = (e: ChangeEvent<HTMLParagraphElement>) => {
//     // const inputHtml = DOMPurify.sanitize(e.target.innerHTML);
//     const inputHtml = e.target.innerHTML;
//     // setCodeString(inputHtml);
//     setTempPostHtmlData(inputHtml);
//   };

//   const language = 'language-html';

//   return (
//     <>
//       {/* <Gist id='8327e7cc80b5aefe95792e0e69b5a396' /> */}
//       <pre className={classNames(styles.code__block)}>
//         <code
//           // TagName='code'
//           ref={ref}
//           contentEditable={contentEditable}
//           suppressContentEditableWarning={contentEditable}
//           // html={html}
//           onInput={onInput} // 필수
//           onKeyPress={onKeyPress} // optional, 블록 추가
//           onKeyDown={onKeyDown} // optional, 블록 삭제
//           // syncTempPostWithPasteText={syncTempPostWithPasteText}
//           // addBlockFocusUseEffectDependency={addBlockFocusUseEffectDependency}
//           // removeCurrentBlockFocusUseEffectDependency={
//           //   removeCurrentBlockFocusUseEffectDependency
//           // }
//           // placeholder={placeholder}
//           // customClassName='javascript'
//           className='javascript'
//         >
//           {String(html)}
//         </code>
//       </pre>
//     </>
//   );
// };

// export default EditableCodeBlockTest;
