import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { ChangeEvent, FC } from 'react';
import { onInputChange } from '../../../../lib/utils/content-editable-utils';
import { TBlockTextType } from '../../../../redux-toolkit/model/paragraph-data-model';
import { useAppDispatch } from '../../../../redux-toolkit/store';
import EditableElement from '../../editable-element';
import styles from './editable-text-block.module.scss';

type Props = {
  blockType: TBlockTextType;
  contentEditable: boolean;
  html: string;
  setTempPostData: ActionCreatorWithPayload<
    {
      inputPureHtml: string;
    },
    string
  >;
  setPostData: ActionCreatorWithPayload<
    {
      inputPureHtml: string;
    },
    string
  >;
  placeholder?: string;
};

const EditableTextBlock: FC<Props> = ({
  blockType,
  contentEditable,
  html,
  setTempPostData,
  setPostData,
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

  const onInput = (
    e: ChangeEvent<HTMLHeadingElement | HTMLParagraphElement>
  ) => {
    onInputChange(
      e,
      setTempEditableTextBlockData,
      updateEditableTextBlockInlineData
    );
  };

  const setTempEditableTextBlockData = (inputPureHtml: string) => {
    dispatch(setTempPostData({ inputPureHtml }));
  };

  const updateEditableTextBlockInlineData = (inputPureHtml: string) => {
    dispatch(
      setPostData({
        inputPureHtml,
      })
    );
    setTempEditableTextBlockData(inputPureHtml);
  };

  const syncTempPostWithPasteText = (newInnerPurePasteText: string) => {
    setTempEditableTextBlockData(newInnerPurePasteText);
  };

  return (
    <>
      <EditableElement
        TagName={TagName}
        contentEditable={contentEditable}
        html={html}
        onInput={onInput} // 필수
        syncTempPostWithPasteText={syncTempPostWithPasteText} // 필수
        placeholder={placeholder}
        customClassName={styles.editable__text__block}
      />
    </>
  );
};

export default EditableTextBlock;
