import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILinkData, LinkDataModel } from '../model/link-data-model';
import { IPostData, postInitialData } from '../model/post-data-model';
import { ITextData, TextDataModel } from '../model/text-data-model';

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

    setCurrentBlockImageDownloadURL: (
      state,
      action: PayloadAction<{ imageDownloadURL: string; currentIndex: number }>
    ) => {
      console.log('redux', action.payload.currentIndex);
      state.post.wysiwygDataArray[action.payload.currentIndex].url =
        action.payload.imageDownloadURL;
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
        currentIndex: number;
        isEnd: boolean;
      }>
    ) => {
      const newTextBlock: ITextData = new TextDataModel().createNewTextData();
      if (action.payload.isEnd) {
        state.post.wysiwygDataArray.push(newTextBlock);
      } else {
        state.post.wysiwygDataArray.splice(
          action.payload.currentIndex + 1,
          0,
          newTextBlock
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
        currentIndex: number;
        isEnd: boolean;
      }>
    ) => {
      const newLinkBlock: ILinkData = new LinkDataModel().createNewLinkData();
      if (action.payload.isEnd) {
        state.post.linkWysiwygDataArray.push(newLinkBlock);
      } else {
        state.post.linkWysiwygDataArray.splice(
          action.payload.currentIndex + 1,
          0,
          newLinkBlock
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
  setCurrentBlockImageDownloadURL,
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
