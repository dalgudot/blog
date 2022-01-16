import styled from 'styled-components';

export const Tag = styled.p`
  padding: 0 36px;
`;

export const TextArea = styled.textarea`
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
