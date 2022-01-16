import React from 'react';

interface IDynamicTypeElement {
  children: React.ReactNode[] | React.ReactNode;
}

interface IDynamicTypeTextElement extends IDynamicTypeElement {
  tagName: TtextTagName;
  onKeyDown: any;
}

export const DynamicTypeElement = {
  Text: ({ tagName, onKeyDown, children }: IDynamicTypeTextElement) =>
    React.createElement(tagName, onKeyDown, children),
};

// https://stackoverflow.com/questions/33471880/dynamic-tag-name-in-react-jsx
// https://stackoverflow.com/questions/30373343/reactjs-component-names-must-begin-with-capital-letters/30373505#30373505

// https://ko.reactjs.org/docs/jsx-in-depth.html
// JSX는 함수 React.createElement(component, props, ...children)의 Syntactic Sugar일 뿐!
// 즉, JSX는 함수다!
// JSX를 컴파일하면 React.createElement(component, props, ...children)가 된다.
