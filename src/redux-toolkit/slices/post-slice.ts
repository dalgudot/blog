import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILinkData } from '../model/link-data-model';
import { IPostData, postInitialData } from '../model/post-data-model';
import { ITextData } from '../model/text-data-model';

const initialState: { post: IPostData } = {
  post: postInitialData,
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPostData: (state, action: PayloadAction<IPostData>) => {
      state.post = action.payload;
    },

    setCurrentBlockHtml: (
      state,
      action: PayloadAction<{ inputHtml: string; currentIndex: number }>
    ) => {
      state.post.wysiwygDataArray[action.payload.currentIndex].html =
        action.payload.inputHtml;
    },

    setPostCategory: (state, action: PayloadAction<string>) => {
      state.post.category = action.payload;
    },

    setArticleTitleData: (
      state,
      action: PayloadAction<{ inputHtml: string }>
    ) => {
      state.post.title = action.payload.inputHtml;
    },

    setBlockTypeData: (
      state,
      action: PayloadAction<{ newBlockType: any; currentIndex: number }>
    ) => {
      state.post.wysiwygDataArray[action.payload.currentIndex].blockType =
        action.payload.newBlockType;
    },

    // 기본 wysiwyg의 초기값은 p 블럭
    addNewBlock: (
      state,
      action: PayloadAction<{
        newBlock: ITextData;
        currentIndex: number;
        isEnd: boolean;
      }>
    ) => {
      if (action.payload.isEnd) {
        state.post.wysiwygDataArray.push(action.payload.newBlock);
      } else {
        state.post.wysiwygDataArray.splice(
          action.payload.currentIndex + 1,
          0,
          action.payload.newBlock
        );
      }
    },

    removeCurrentBlock: (
      state,
      action: PayloadAction<{ currentIndex: number }>
    ) => {
      state.post.wysiwygDataArray.splice(action.payload.currentIndex, 1);
    },

    addNewLinkBlock: (
      state,
      action: PayloadAction<{
        newBlock: ILinkData;
        currentIndex: number;
        isEnd: boolean;
      }>
    ) => {
      if (action.payload.isEnd) {
        state.post.linkWysiwygDataArray.push(action.payload.newBlock);
      } else {
        state.post.linkWysiwygDataArray.splice(
          action.payload.currentIndex + 1,
          0,
          action.payload.newBlock
        );
      }
    },

    removeLinkBlock: (
      state,
      action: PayloadAction<{ currentIndex: number }>
    ) => {
      state.post.linkWysiwygDataArray.splice(action.payload.currentIndex, 1);
    },

    setCurrentLinkBlockHtml: (
      state,
      action: PayloadAction<{ inputHtml: string; currentIndex: number }>
    ) => {
      state.post.linkWysiwygDataArray[action.payload.currentIndex].html =
        action.payload.inputHtml;
    },
  },
});

export const {
  setPostData,
  setCurrentBlockHtml,
  setPostCategory,
  setArticleTitleData,
  setBlockTypeData,
  addNewBlock,
  removeCurrentBlock,
  addNewLinkBlock,
  removeLinkBlock,
  setCurrentLinkBlockHtml,
} = postSlice.actions;
export const postReducer = postSlice.reducer;
