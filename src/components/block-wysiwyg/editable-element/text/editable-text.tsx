import { ChangeEvent, FC } from 'react';
import { onInputChange } from '../../../../lib/utils/content-editable-utils';
import { setArticleTitleData } from '../../../../redux-toolkit/slices/post-slice';
import { setTempArticleTitleData } from '../../../../redux-toolkit/slices/temp-post-slice';
import { useAppDispatch } from '../../../../redux-toolkit/store';
import EditableElement from '../../editable-element';

type Props = {
  blockType: 'Heading1' | 'Heading2' | 'Heading3' | 'Paragraph';
  contentEditable: boolean;
  html: string;
  syncPasteText: (newInnerPurePasteText: string) => void;
  placeholder?: string;
};

const EditableText: FC<Props> = ({
  blockType,
  contentEditable,
  html,
  syncPasteText,
  placeholder,
}) => {
  const dispatch = useAppDispatch();

  const TagName =
    blockType === 'Heading1'
      ? 'h1'
      : blockType === 'Heading2'
      ? 'h2'
      : blockType === 'Heading3'
      ? 'h3'
      : 'p';

  const style = blockType === 'Heading1' ? '1' : '2'; // 추후 클래스 이름으로 지정(global css에서)

  const onInput = (
    e: ChangeEvent<HTMLHeadingElement | HTMLParagraphElement>
  ) => {
    onInputChange(e, setTempData, updateBlock);
  };

  const setTempData = (inputPureHtml: string) => {
    dispatch(setTempArticleTitleData({ inputPureHtml }));
  };

  const updateBlock = (inputPureHtml: string) => {
    dispatch(
      setArticleTitleData({
        inputPureHtml,
      })
    );
    setTempData(inputPureHtml);
  };

  return (
    <EditableElement
      TagName={TagName}
      contentEditable={contentEditable}
      html={html}
      onInput={onInput} // 필수
      syncPasteText={syncPasteText}
      placeholder={placeholder}
      customClassName={style}
    />
  );
};

export default EditableText;
