import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRefData } from '../model/ref-data-model';
import { IPostData, postInitialData } from '../model/post-data-model';

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

    setPostCategory: (state, action: PayloadAction<string>) => {
      state.post.category = action.payload;
    },

    setArticleTitleData: (
      state,
      action: PayloadAction<{ inputPureHtml: string }>
    ) => {
      state.post.title = action.payload.inputPureHtml;
    },

    setLinkTitleData: (
      state,
      action: PayloadAction<{ inputPureHtml: string; currentIndex: number }>
    ) => {
      state.post.refDataArray[action.payload.currentIndex].title =
        action.payload.inputPureHtml;
    },

    addLinkBlock: (
      state,
      action: PayloadAction<{
        newLinkEditableBlock: IRefData;
        currentIndex: number;
        isEnd: boolean;
      }>
    ) => {
      if (action.payload.isEnd) {
        state.post.refDataArray.push(action.payload.newLinkEditableBlock);
      } else {
        state.post.refDataArray.splice(
          action.payload.currentIndex + 1,
          0,
          action.payload.newLinkEditableBlock
        );
      }
    },

    removeLinkBlock: (
      state,
      action: PayloadAction<{ currentIndex: number }>
    ) => {
      state.post.refDataArray.splice(action.payload.currentIndex, 1);
    },
  },
});

export const {
  setPostData,
  setPostCategory,
  setArticleTitleData,
  setLinkTitleData,
  addLinkBlock,
  removeLinkBlock,
} = postSlice.actions;
export const postReducer = postSlice.reducer;
